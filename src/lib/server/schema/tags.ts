import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const tags = sqliteTable('tags', {
	id: integer('id').primaryKey().primaryKey(),
	tag_name: text('tag_name').notNull()
});
export const insert_tag_schema = createInsertSchema(tags);
export const select_tag_schema = createSelectSchema(tags);
