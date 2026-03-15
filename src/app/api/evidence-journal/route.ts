import { NextResponse } from 'next/server';
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const SALT = 'haven-safe-journal'; // Static salt — acceptable for client-side PIN encryption

function deriveKey(pin: string): Buffer {
  return scryptSync(pin, SALT, 32);
}

function encrypt(text: string, pin: string): string {
  const key = deriveKey(pin);
  const iv = randomBytes(16);
  const cipher = createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag().toString('hex');

  // Format: iv:authTag:encryptedData
  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

function decrypt(encryptedString: string, pin: string): string {
  const [ivHex, authTagHex, encryptedData] = encryptedString.split(':');

  if (!ivHex || !authTagHex || !encryptedData) {
    throw new Error('Invalid encrypted data format');
  }

  const key = deriveKey(pin);
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');

  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

export async function POST(request: Request) {
  try {
    const { action, entry, pin } = await request.json();

    if (!pin || typeof pin !== 'string' || pin.length < 4) {
      return NextResponse.json(
        { error: 'A PIN of at least 4 characters is required.' },
        { status: 400 }
      );
    }

    if (action === 'encrypt') {
      if (!entry || typeof entry !== 'string') {
        return NextResponse.json(
          { error: 'Entry text is required for encryption.' },
          { status: 400 }
        );
      }

      const encrypted = encrypt(entry, pin);
      return NextResponse.json({
        encrypted,
        note: 'Save this encrypted text somewhere safe. You will need your PIN to read it again. HAVEN does not store this data.',
      });
    }

    if (action === 'decrypt') {
      if (!entry || typeof entry !== 'string') {
        return NextResponse.json(
          { error: 'Encrypted text is required for decryption.' },
          { status: 400 }
        );
      }

      try {
        const decrypted = decrypt(entry, pin);
        return NextResponse.json({ decrypted });
      } catch {
        return NextResponse.json(
          { error: 'Could not decrypt. Please check your PIN and try again.' },
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
      { error: 'Something went wrong. Your data has not been stored anywhere.' },
      { status: 500 }
    );
  }
}
