import { type SchemaTypeDefinition } from 'sanity'
import watches from './watches'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [watches],
}
