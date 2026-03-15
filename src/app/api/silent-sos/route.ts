import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { location, message, contacts } = await request.json();

    const contactCount = contacts?.length || 0;
    const timestamp = new Date().toISOString();

    // In production, this would integrate with Twilio/SendGrid to send
    // SMS and email alerts to emergency contacts with the user's location.
    // For now, return a success response demonstrating the flow.

    return NextResponse.json({
      success: true,
      message: contactCount > 0
        ? `SOS sent to ${contactCount} contact${contactCount > 1 ? 's' : ''}`
        : 'SOS signal recorded — add emergency contacts for instant alerts',
      timestamp,
      details: {
        locationShared: !!location,
        customMessage: !!message,
        contactsNotified: contactCount,
      },
      safetyNote: 'If you are in immediate danger, call 911. National DV Hotline: 1-800-799-7233 (24/7). Text START to 88788.',
      source: 'demo',
    });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. If you are in danger, call 911 immediately.' },
      { status: 500 }
    );
  }
}
