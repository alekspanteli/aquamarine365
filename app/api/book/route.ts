import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; reset: number }>();

interface BookingRequestBody {
  name?: unknown;
  email?: unknown;
  dates?: unknown;
  code?: unknown;
  website?: unknown;
}

interface ValidationResult {
  errors: Partial<Record<'name' | 'email' | 'dates', string>>;
  fields: {
    name: string;
    email: string;
    dates: string;
    code: string;
  };
  honeypot: string;
}

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip) ?? { count: 0, reset: now + WINDOW_MS };

  if (now > entry.reset) {
    entry.count = 0;
    entry.reset = now + WINDOW_MS;
  }

  entry.count += 1;
  hits.set(ip, entry);
  return entry.count <= MAX_PER_WINDOW;
}

function validate(body: BookingRequestBody): ValidationResult {
  const errors: ValidationResult['errors'] = {};
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const dates = typeof body.dates === 'string' ? body.dates.trim() : '';
  const code = typeof body.code === 'string' ? body.code.trim().slice(0, 24) : '';
  const honeypot = typeof body.website === 'string' ? body.website : '';

  if (!name || name.length < 2) errors.name = 'Please enter your name.';
  if (name.length > 120) errors.name = 'Name is too long.';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email.';
  }
  if (!dates || dates.length < 4) {
    errors.dates = 'Tell us your dates (e.g. 12-19 July, 4 adults).';
  }
  if (dates.length > 400) errors.dates = 'Dates & guests is too long.';

  return { errors, fields: { name, email, dates, code }, honeypot };
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'anonymous';

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  let body: BookingRequestBody;
  try {
    body = (await request.json()) as BookingRequestBody;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid payload.' }, { status: 400 });
  }

  const { errors, fields, honeypot } = validate(body);

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  // TODO: integrate with Resend, Postmark, or a CRM.
  // Example (when you add RESEND_API_KEY to env):
  //   await fetch('https://api.resend.com/emails', {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       from: 'bookings@aquamarine365.com',
  //       to: 'info@aquamarine365.com',
  //       subject: `Booking enquiry - ${fields.code || 'web'}`,
  //       reply_to: fields.email,
  //       text: `Name: ${fields.name}\nEmail: ${fields.email}\nDates: ${fields.dates}\nCode: ${fields.code}\nIP: ${ip}`
  //     })
  //   });

  if (process.env.NODE_ENV !== 'production') {
    console.log('[book] new enquiry', { ...fields, ip });
  }

  return NextResponse.json({ ok: true });
}
