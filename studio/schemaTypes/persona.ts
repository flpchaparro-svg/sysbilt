import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'persona',
  title: 'Target Persona',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Persona Name',
      type: 'string',
      description: 'e.g., "The Builder", "The Controller"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hubspotListId',
      title: 'HubSpot Active List ID',
      type: 'string',
      description: 'The exact ID of the HubSpot list this persona maps to for n8n routing.',
    }),
  ],
});