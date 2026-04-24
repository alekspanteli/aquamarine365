function createKeyFactory(prefix) {
  let index = 0;
  return () => `${prefix}${++index}`;
}

function createBlockFactory(prefix) {
  const nextKey = createKeyFactory(prefix);

  function span(text) {
    return {
      _key: nextKey(),
      _type: 'span',
      marks: [],
      text
    };
  }

  return function block(text, options = {}) {
    const { style = 'normal', listItem, level } = options;

    return {
      _key: nextKey(),
      _type: 'block',
      style,
      markDefs: [],
      children: [span(text)],
      ...(listItem ? { listItem } : {}),
      ...(level ? { level } : {})
    };
  };
}

const privacyBlock = createBlockFactory('privacy');
const cookieBlock = createBlockFactory('cookie');
const termsBlock = createBlockFactory('terms');

const privacyPageBody = [
  privacyBlock('Who we are', { style: 'h2' }),
  privacyBlock(
    'Aquamarine Holiday Rentals manages private villas in Ayia Napa, Cyprus. We act as the data controller for booking, guest communication, and website enquiries.'
  ),
  privacyBlock('What we collect', { style: 'h2' }),
  privacyBlock('Name, email address, phone number, dates, guest count, and the message you send us.', {
    listItem: 'bullet'
  }),
  privacyBlock('Payment details required to complete a reservation, processed securely by Stripe.', {
    listItem: 'bullet'
  }),
  privacyBlock('Basic hosting logs kept by our infrastructure providers for security and debugging.', {
    listItem: 'bullet'
  }),
  privacyBlock('How we use it', { style: 'h2' }),
  privacyBlock('To answer enquiries, confirm bookings, take payment, and support your stay before, during, and after arrival.', {
    listItem: 'bullet'
  }),
  privacyBlock('To comply with legal, accounting, tax, and tourism-registration requirements in Cyprus.', {
    listItem: 'bullet'
  }),
  privacyBlock('To improve operations and resolve problems when guests contact us for support.', {
    listItem: 'bullet'
  }),
  privacyBlock('Who we share it with', { style: 'h2' }),
  privacyBlock('Stripe for payment processing, Vercel for hosting, and limited local service providers when operationally required.', {
    listItem: 'bullet'
  }),
  privacyBlock('Authorities or advisors only when the law requires disclosure.', {
    listItem: 'bullet'
  }),
  privacyBlock('We do not sell personal data and we do not run advertising trackers.', {
    style: 'normal'
  }),
  privacyBlock('Retention and your rights', { style: 'h2' }),
  privacyBlock('Booking records are retained only as long as needed for operational and legal obligations.', {
    listItem: 'bullet'
  }),
  privacyBlock('You may request access, correction, deletion, restriction, objection, or portability where applicable under GDPR.', {
    listItem: 'bullet'
  }),
  privacyBlock(
    'To make a privacy request, contact info@aquamarine365.com and we will respond within a reasonable timeframe.'
  )
];

const cookiePageBody = [
  cookieBlock('What we store', { style: 'h2' }),
  cookieBlock('This site does not use analytics, ad-tech, or marketing cookies.', {
    listItem: 'bullet'
  }),
  cookieBlock('We store a local consent preference so the cookie banner does not reappear every time you visit.', {
    listItem: 'bullet'
  }),
  cookieBlock('We store a theme preference if you switch between light, dark, or system mode.', {
    listItem: 'bullet'
  }),
  cookieBlock('Chat history may be stored in session storage so a page refresh does not wipe the current conversation.', {
    listItem: 'bullet'
  }),
  cookieBlock('What we do not store', { style: 'h2' }),
  cookieBlock('No third-party analytics cookies.', { listItem: 'bullet' }),
  cookieBlock('No remarketing or advertising pixels.', { listItem: 'bullet' }),
  cookieBlock('No cross-site tracking cookies.', { listItem: 'bullet' }),
  cookieBlock('Third-party embeds', { style: 'h2' }),
  cookieBlock(
    'Some third-party services such as maps or image delivery may set their own cookies on their domains when you interact with them. Those cookies are controlled by the third party, not by Aquamarine.'
  ),
  cookieBlock('Managing preferences', { style: 'h2' }),
  cookieBlock(
    'You can clear local storage, session storage, or site data from your browser settings at any time. If you do, the cookie banner and any saved preferences will reset.'
  )
];

const termsPageBody = [
  termsBlock('Booking and payment', { style: 'h2' }),
  termsBlock('A booking is confirmed once the required deposit or full payment is received.', {
    listItem: 'bullet'
  }),
  termsBlock('Balances must be paid by the due date shown during checkout or in the booking confirmation.', {
    listItem: 'bullet'
  }),
  termsBlock('All prices are quoted in EUR unless stated otherwise.', {
    listItem: 'bullet'
  }),
  termsBlock('Cancellation', { style: 'h2' }),
  termsBlock('Cancellation terms depend on the timing of the request and the booking conditions agreed at checkout.', {
    listItem: 'bullet'
  }),
  termsBlock('If a stay is cancelled close to arrival, some or all payments may be non-refundable.', {
    listItem: 'bullet'
  }),
  termsBlock('Arrival and stay rules', { style: 'h2' }),
  termsBlock('Guests must respect the maximum occupancy for the villa they book.', {
    listItem: 'bullet'
  }),
  termsBlock('Parties, events, and excessive noise are not permitted unless explicitly agreed in writing.', {
    listItem: 'bullet'
  }),
  termsBlock('Guests are responsible for any avoidable damage caused during the stay.', {
    listItem: 'bullet'
  }),
  termsBlock('Liability and support', { style: 'h2' }),
  termsBlock(
    'Aquamarine will take reasonable care to present each property accurately and keep it ready for guest arrival, but is not liable for events outside reasonable control.'
  ),
  termsBlock(
    'Guests should report issues promptly so the local team has a fair chance to resolve them during the stay.'
  ),
  termsBlock('Governing law', { style: 'h2' }),
  termsBlock('These booking terms are governed by the laws of the Republic of Cyprus.')
];

export const defaultPrivacyPage = {
  title: 'Privacy policy',
  description:
    "How Aquamarine Holiday Rentals handles your personal data: what we collect, why, who it's shared with, and your rights under GDPR.",
  eyebrow: 'Privacy policy',
  headline: 'Your data, plainly.',
  intro:
    'We collect the minimum personal information needed to answer enquiries, confirm bookings, process payments, and support your stay.',
  body: privacyPageBody
};

export const defaultCookiePage = {
  title: 'Cookie policy',
  description:
    'Exactly what Aquamarine stores on your device and why. No third-party tracking, no analytics, no marketing cookies.',
  eyebrow: 'Cookie policy',
  headline: 'What we store on your device.',
  intro:
    'We only use essential local browser storage for preferences and basic functionality. We do not use analytics or advertising trackers.',
  body: cookiePageBody
};

export const defaultTermsPage = {
  title: 'Booking terms',
  description:
    'Booking terms, payment, cancellation, and house rules for Aquamarine Holiday Rentals villas in Ayia Napa.',
  eyebrow: 'Booking terms',
  headline: 'The short, human version.',
  intro:
    'These terms explain how direct bookings, payments, cancellations, and guest responsibilities work for Aquamarine stays.',
  body: termsPageBody
};
