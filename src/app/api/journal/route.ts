import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { action, text, pin } = await request.json();

    if (!action || !text || !pin) {
      return NextResponse.json(
        { error: 'Missing required fields: action, text, and pin are required.' },
        { status: 400 }
      );
    }

    if (pin.length < 4) {
      return NextResponse.json(
        { error: 'PIN must be at least 4 characters.' },
        { status: 400 }
      );
    }

    // NOTE: In production, encryption happens client-side using Web Crypto API
    // with AES-GCM and a key derived from the PIN via PBKDF2. This endpoint
    // is a demo fallback only. No sensitive data should be sent to the server.

    if (action === 'encrypt') {
      // Demo: base64 encode with a simple pin-based XOR layer
      const pinChars = pin.split('');
      const transformed = text
        .split('')
        .map((char: string, i: number) => {
          const pinChar = pinChars[i % pinChars.length];
          return String.fromCharCode(char.charCodeAt(0) ^ pinChar.charCodeAt(0));
        })
        .join('');

      const encrypted = Buffer.from(transformed, 'binary').toString('base64');

      return NextResponse.json({
        encrypted,
        source: 'demo',
        note: 'This is demo encryption. In production, use client-side Web Crypto API for true end-to-end encryption.',
      });
    }

    if (action === 'decrypt') {
      try {
        const decoded = Buffer.from(text, 'base64').toString('binary');
        const pinChars = pin.split('');
        const decrypted = decoded
          .split('')
          .map((char: string, i: number) => {
            const pinChar = pinChars[i % pinChars.length];
            return String.fromCharCode(char.charCodeAt(0) ^ pinChar.charCodeAt(0));
          })
          .join('');

        return NextResponse.json({
          decrypted,
          source: 'demo',
        });
      } catch {
        return NextResponse.json(
          { error: 'Decryption failed. Check your PIN and try again.' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Invalid action. Use "encrypt" or "decrypt".' },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Your journal entries are stored locally and remain safe.' },
      { status: 500 }
    );
  }
}
