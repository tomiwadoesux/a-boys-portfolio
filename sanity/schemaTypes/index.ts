import { type SchemaTypeDefinition } from 'sanity'
import { nowType } from './now'
import { projectType } from './project'
import { guestbookType } from './guestbook'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [nowType, projectType, guestbookType],
}
