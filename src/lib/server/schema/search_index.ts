import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const search_index = sqliteTable('search_index', {
	conference_name: text('conference_name'),
	description: text('description'),
	location: text('location'),
	tag: text('tag'),
	content_rowid: integer('content_rowid'),
});
export const insert_search_index_schema =
	createInsertSchema(search_index);
export const select_search_index_schema =
	createSelectSchema(search_index);
