import { type SchemaTypeDefinition } from 'sanity'
import { nowType } from './now'
import { projectType } from './project'
import { guestbookType } from './guestbook'
import { visitorType } from './visitor'
import { listType } from './list'
import { screenType } from './screen'
import { cardType } from './card'
import { labType } from './lab'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [nowType, projectType, guestbookType, visitorType, listType, screenType, cardType, labType],
}
