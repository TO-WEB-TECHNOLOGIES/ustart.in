import { NextResponse } from 'next/server';

// In-memory stores for demo purposes (would be Redis/DB in production)
// Active OTP codes keyed by mobile number
const otpStore: Map<string, { otp: string; expiresAt: number }> = new Map();
// Rate-limit tracking keyed by mobile number
const rateLimitStore: Map<
  string,
  { count: number; windowStart: number; lastSentAt: number; blockedUntil: number }
> = new Map();

// Tunables
const RESEND_COOLDOWN = 30 * 1000; // min gap between two OTP requests
const WINDOW = 15 * 60 * 1000; // rolling window for the request count
const MAX_PER_WINDOW = 5; // max OTP requests allowed per window
const BLOCK_DURATION = 15 * 60 * 1000; // hard block duration after exceeding the limit
const OTP_TTL = 5 * 60 * 1000; // OTP validity

// Exported so the verify-otp route can read/consume the active code.
export { otpStore };

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { mobileNumber, channel } = body as {
      mobileNumber?: string;
      channel?: 'SMS' | 'TELEGRAM';
    };
    const deliveryChannel = channel === 'TELEGRAM' ? 'TELEGRAM' : 'SMS';

    // Validation: mobileNumber must be exactly 10 digits
    if (!mobileNumber) {
      return NextResponse.json({ error: 'Mobile number is required' }, { status: 400 });
    }
    const digitsOnly = mobileNumber.replace(/\D/g, '');
    if (digitsOnly.length !== 10) {
      return NextResponse.json({ error: 'Mobile number must be 10 digits' }, { status: 400 });
    }

    const now = Date.now();
    const entry = rateLimitStore.get(digitsOnly) ?? {
      count: 0,
      windowStart: now,
      lastSentAt: 0,
      blockedUntil: 0,
    };

    // Hard block still in effect
    if (entry.blockedUntil > now) {
      return NextResponse.json(
        { blocked: true, message: 'Too many attempts. Your number is temporarily blocked.' },
        { status: 429 }
      );
    }

    // Reset the rolling window if it has elapsed
    if (now - entry.windowStart > WINDOW) {
      entry.count = 0;
      entry.windowStart = now;
    }

    // Cooldown between consecutive requests
    if (now - entry.lastSentAt < RESEND_COOLDOWN) {
      rateLimitStore.set(digitsOnly, entry);
      return NextResponse.json(
        { error: 'Please wait before requesting another OTP.' },
        { status: 429 }
      );
    }

    // Exceeded the allowed number of requests in the window → hard block
    if (entry.count >= MAX_PER_WINDOW) {
      entry.blockedUntil = now + BLOCK_DURATION;
      rateLimitStore.set(digitsOnly, entry);
      return NextResponse.json(
        { blocked: true, message: 'Too many attempts. Your number is temporarily blocked.' },
        { status: 429 }
      );
    }

    // Generate and store a fresh 4-digit OTP
    const otp = String(Math.floor(1000 + Math.random() * 9000));
    otpStore.set(digitsOnly, { otp, expiresAt: now + OTP_TTL });

    entry.count += 1;
    entry.lastSentAt = now;
    rateLimitStore.set(digitsOnly, entry);

    // No real SMS/Telegram gateway is wired up in this mock — log the code server-side.
    console.log(`[send-otp] OTP for ${digitsOnly} via ${deliveryChannel}: ${otp}`);

    // DEV ONLY: expose the OTP so the flow is testable locally.
    // This must never be returned in production.
    const isDev = process.env.NODE_ENV !== 'production';
    return NextResponse.json(
      { message: 'OTP sent.', ...(isDev ? { devOtp: otp } : {}) },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
