import { PortableText } from 'next-sanity';
import type { LegalPage } from '@/types/domain';

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

interface LegalPageCmsContentProps {
  page: LegalPage;
}

export default function LegalPageCmsContent({ page }: LegalPageCmsContentProps) {
  return (
    <>
      <p className="label label-accent mb-3">{page.eyebrow}</p>
      <h1>{page.headline}</h1>
      <p className="text-lg mt-4">{page.intro}</p>
      <PortableText value={page.body as Parameters<typeof PortableText>[0]['value']} />
      <p className="text-sm text-[var(--fg-muted)] mt-12">
        Last updated: {formatDate(page._updatedAt)}.
      </p>
    </>
  );
}
