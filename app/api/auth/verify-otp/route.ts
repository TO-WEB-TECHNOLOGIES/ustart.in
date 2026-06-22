import { NextResponse } from 'next/server';
import { otpStore } from '../send-otp/route';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { mobileNumber, otp } = body as { mobileNumber?: string; otp?: string };

    if (!mobileNumber || !otp) {
      return NextResponse.json(
        { error: 'Mobile number and OTP are required' },
        { status: 400 }
      );
    }

    const digitsOnly = mobileNumber.replace(/\D/g, '');
    const record = otpStore.get(digitsOnly);

    // No active code, expired, or mismatch → reject
    if (!record || record.expiresAt < Date.now() || record.otp !== String(otp).trim()) {
      if (record && record.expiresAt < Date.now()) {
        otpStore.delete(digitsOnly);
      }
      return NextResponse.json({ error: 'Invalid or expired OTP.' }, { status: 401 });
    }

    // Correct OTP — consume it (one-time use) and issue mock tokens.
    otpStore.delete(digitsOnly);

    return NextResponse.json(
      {
        accessToken: `mock_access_${Date.now()}_${Math.random().toString(36).slice(2)}`,
        refreshToken: `mock_refresh_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
