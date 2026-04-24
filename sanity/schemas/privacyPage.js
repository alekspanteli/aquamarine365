import { legalFields } from './legalFields';
import { defaultPrivacyPage } from '../defaults/legalPages';

const privacyPage = {
  name: 'privacyPage',
  title: 'Privacy Page',
  type: 'document',
  initialValue: defaultPrivacyPage,
  fields: legalFields,
  preview: {
    prepare() {
      return { title: 'Privacy policy' };
    }
  }
};

export default privacyPage;
