/**
 * HAVEN Safety Utilities — No Trace Architecture
 * Every function here protects the user's privacy and safety.
 */

const SAFE_URL = 'https://www.google.com';
const DISGUISED_TITLE = 'Daily Weather Forecast';

/** Execute panic exit — clear traces and redirect to safe page */
export function panicExit() {
  // Clear this page from history by replacing it
  try {
    // Replace current history entry with safe URL
    window.history.replaceState(null, '', SAFE_URL);

    // Clear any in-memory state
    if (typeof window !== 'undefined') {
      // Try to clear session storage (in case anything was stored)
      try { sessionStorage.clear(); } catch {}
    }
  } catch {}

  // Redirect to safe page immediately
  window.location.replace(SAFE_URL);
}

/** Set disguised page title */
export function setDisguisedTitle() {
  if (typeof document !== 'undefined') {
    document.title = DISGUISED_TITLE;
  }
}

/** Check if double-escape was pressed (for keyboard panic exit) */
let lastEscapeTime = 0;
export function handleEscapeKey(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    const now = Date.now();
    if (now - lastEscapeTime < 500) {
      panicExit();
    }
    lastEscapeTime = now;
  }
}

/** Detect device shake for mobile panic exit */
let shakeThreshold = 15;
let lastShakeTime = 0;
let lastX = 0, lastY = 0, lastZ = 0;
let shakeCount = 0;

export function handleDeviceMotion(e: DeviceMotionEvent) {
  const acc = e.accelerationIncludingGravity;
  if (!acc || acc.x === null || acc.y === null || acc.z === null) return;

  const deltaX = Math.abs(acc.x - lastX);
  const deltaY = Math.abs(acc.y - lastY);
  const deltaZ = Math.abs(acc.z - lastZ);

  if ((deltaX > shakeThreshold && deltaY > shakeThreshold) ||
      (deltaX > shakeThreshold && deltaZ > shakeThreshold) ||
      (deltaY > shakeThreshold && deltaZ > shakeThreshold)) {
    const now = Date.now();
    if (now - lastShakeTime > 1000) {
      shakeCount = 1;
    } else {
      shakeCount++;
    }
    lastShakeTime = now;

    if (shakeCount >= 3) {
      panicExit();
      shakeCount = 0;
    }
  }

  lastX = acc.x;
  lastY = acc.y;
  lastZ = acc.z;
}

/** Simple encryption for journal entries using Web Crypto API */
export async function encryptText(text: string, pin: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  // Derive key from PIN
  const keyMaterial = await crypto.subtle.importKey(
    'raw', encoder.encode(pin.padEnd(32, '0').slice(0, 32)),
    { name: 'AES-GCM' }, false, ['encrypt']
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv }, keyMaterial, data
  );

  // Combine IV + encrypted data and base64 encode
  const combined = new Uint8Array(iv.length + new Uint8Array(encrypted).length);
  combined.set(iv);
  combined.set(new Uint8Array(encrypted), iv.length);

  return btoa(String.fromCharCode(...combined));
}

export async function decryptText(encrypted: string, pin: string): Promise<string> {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const combined = new Uint8Array(
    atob(encrypted).split('').map(c => c.charCodeAt(0))
  );

  const iv = combined.slice(0, 12);
  const data = combined.slice(12);

  const keyMaterial = await crypto.subtle.importKey(
    'raw', encoder.encode(pin.padEnd(32, '0').slice(0, 32)),
    { name: 'AES-GCM' }, false, ['decrypt']
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv }, keyMaterial, data
  );

  return decoder.decode(decrypted);
}
