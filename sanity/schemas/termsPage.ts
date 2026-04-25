import { defineType } from 'sanity';
import { legalFields } from './legalFields';
import { defaultTermsPage } from '../defaults/legalPages';

export const termsPage = defineType({
  name: 'termsPage',
  title: 'Terms Page',
  type: 'document',
  initialValue: defaultTermsPage,
  fields: legalFields,
  preview: {
    prepare() {
      return { title: 'Booking terms' };
    }
  }
});

export default termsPage;
