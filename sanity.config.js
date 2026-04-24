import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { apiVersion, dataset, projectId } from './sanity/env';
import { schemaTypes } from './sanity/schemas';
import { structure } from './sanity/deskStructure';

export default defineConfig({
  name: 'aquamarine',
  title: 'Aquamarine',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes }
});
