import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { conferences } from './conferences';

export const search_index = sqliteTable('search_index', {
	id: integer('id').primaryKey(),
	conference_name: text('conference_name').notNull(),
	description: text('description'),
	location: text('location'),
	tag: text('tag'),
	conference_id: integer('conference_id').references(
		() => conferences.id,
	),
});
export const insert_search_index_schema =
	createInsertSchema(search_index);
export const select_search_index_schema =
	createSelectSchema(search_index);
