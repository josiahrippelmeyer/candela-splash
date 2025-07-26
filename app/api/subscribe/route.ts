import { NextResponse } from 'next/server';

const EMAIL_WEBHOOK_URL = 'https://primary-production-6ce2.up.railway.app/webhook/ec3f45dc-4d20-4741-b9ce-ec6d4fe1b42d';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    console.log('Sending request to webhook with email:', email);
    
    const response = await fetch(EMAIL_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const responseData = await response.text();
    console.log('Webhook response status:', response.status);
    console.log('Webhook response:', responseData);

    if (!response.ok) {
      throw new Error(`Failed to submit email: ${response.status} ${responseData}`);
    }

    return NextResponse.json(
      { message: 'Email submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting email:', error);
    // Return more detailed error information
    return NextResponse.json(
      { 
        error: 'Failed to submit email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 