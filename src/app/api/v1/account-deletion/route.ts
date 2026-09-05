import { NextResponse } from 'next/server';

// In-memory store for demo purposes (would be a database in production)
const deletionRequests: Array<{
  id: string;
  mobileNumber: string;
  reason?: string;
  status: 'PENDING';
  createdAt: Date;
}> = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { mobileNumber, reason } = body;

    // Validation: mobileNumber is required
    if (!mobileNumber) {
      return NextResponse.json(
        { error: 'Mobile number is required' },
        { status: 400 }
      );
    }

    // Validation: mobileNumber must be exactly 10 digits
    const digitsOnly = mobileNumber.replace(/\D/g, '');
    if (digitsOnly.length !== 10) {
      return NextResponse.json(
        { error: 'Mobile number must be 10 digits' },
        { status: 400 }
      );
    }

    // Duplicate check: if a PENDING request already exists for this mobile number
    const existingRequest = deletionRequests.find(
      req => req.mobileNumber === mobileNumber && req.status === 'PENDING'
    );
    if (existingRequest) {
      return NextResponse.json(
        { error: 'A pending deletion request already exists for this mobile number' },
        { status: 400 }
      );
    }

    // Create new deletion request
    const newRequest = {
      id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      mobileNumber: digitsOnly,
      reason: reason || undefined,
      status: 'PENDING' as const,
      createdAt: new Date(),
    };

    deletionRequests.push(newRequest);

    return NextResponse.json(
      { message: 'Deletion request submitted successfully. You will be contacted by our team for further process.' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Admin endpoint - list all deletion requests
  return NextResponse.json({ requests: deletionRequests }, { status: 200 });
}