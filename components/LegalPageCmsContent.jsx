import { PortableText } from 'next-sanity';

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export default function LegalPageCmsContent({ page }) {
  return (
    <>
      <p className="label label-accent mb-3">{page.eyebrow}</p>
      <h1>{page.headline}</h1>
      <p className="text-lg mt-4">{page.intro}</p>
      <PortableText value={page.body} />
      <p className="text-sm text-[var(--fg-muted)] mt-12">
        Last updated: {formatDate(page._updatedAt)}.
      </p>
    </>
  );
}
