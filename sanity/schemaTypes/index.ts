import { type SchemaTypeDefinition } from 'sanity'
import { nowType } from './now'
import { projectType } from './project'
import { guestbookType } from './guestbook'
import { visitorType } from './visitor'
import { listType } from './list'
import { screenType } from './screen'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [nowType, projectType, guestbookType, visitorType, listType, screenType],
}
