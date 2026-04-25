import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { presentationTool } from 'sanity/presentation';
import { apiVersion, dataset, projectId } from './sanity/env';
import { schemaTypes } from './sanity/schemas';
import { structure } from './sanity/deskStructure';

const previewUrl =
  process.env.NEXT_PUBLIC_SANITY_PREVIEW_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? '/';

export default defineConfig({
  name: 'aquamarine',
  title: 'Aquamarine',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: { origin: previewUrl, previewMode: { enable: '/api/draft-mode/enable' } }
    }),
    visionTool({ defaultApiVersion: apiVersion })
  ],
  schema: { types: schemaTypes }
});
