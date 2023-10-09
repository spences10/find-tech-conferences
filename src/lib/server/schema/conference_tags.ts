import { integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { conferences } from './conferences';
import { tags } from './tags';

export const conference_tags = sqliteTable('conference_tags', {
	conference_id: integer('conference_id').references(
		() => conferences.id,
	),
	tag_id: integer('tag_id').references(() => tags.id),
});
export const insert_conference_tag_schema =
	createInsertSchema(conference_tags);
export const select_conference_tag_schema =
	createSelectSchema(conference_tags);
