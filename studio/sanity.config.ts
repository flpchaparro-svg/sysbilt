import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {schemaTypes} from './schemaTypes'
import {table} from '@sanity/table'
import {codeInput} from '@sanity/code-input'

export default defineConfig({
  name: 'default',
  title: 'Sysbilt',

  projectId: 'wdlc9pg8', // <-- Fixed here
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    table(),
    codeInput(),
    media(),
  ],

  schema: {
    types: schemaTypes,
  },
})