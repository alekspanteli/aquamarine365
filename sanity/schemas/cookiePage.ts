import { defineType } from 'sanity';
import { legalFields } from './legalFields';
import { defaultCookiePage } from '../defaults/legalPages';

export const cookiePage = defineType({
  name: 'cookiePage',
  title: 'Cookie Page',
  type: 'document',
  initialValue: defaultCookiePage,
  fields: legalFields,
  preview: {
    prepare() {
      return { title: 'Cookie policy' };
    }
  }
});

export default cookiePage;
