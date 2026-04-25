import type { StructureResolver } from 'sanity/structure';

const SINGLETONS = [
  { id: 'siteSettings', schemaType: 'siteSettings', title: 'Site Settings' },
  { id: 'privacyPage', schemaType: 'privacyPage', title: 'Privacy policy' },
  { id: 'cookiePage', schemaType: 'cookiePage', title: 'Cookie policy' },
  { id: 'termsPage', schemaType: 'termsPage', title: 'Booking terms' }
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...SINGLETONS.map((item) =>
        S.listItem()
          .id(item.id)
          .title(item.title)
          .child(S.editor().id(item.id).schemaType(item.schemaType).documentId(item.id))
      ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.some((singleton) => singleton.schemaType === item.getId())
      )
    ]);
