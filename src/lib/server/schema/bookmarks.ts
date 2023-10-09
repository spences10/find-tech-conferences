import { sql } from 'drizzle-orm';
import { integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { conferences } from './conferences';
import { user } from './user';

export const bookmarks = sqliteTable('bookmarks', {
	user_id: integer('user_id').references(() => user.id),
	conference_id: integer('conference_id').references(
		() => conferences.id
	),
	bookmarked_at: integer('bookmarked_at', {
		mode: 'timestamp'
	}).default(sql`(strftime('%s', 'now'))`)
});
export const insert_bookmark_schema = createInsertSchema(bookmarks);
export const select_bookmark_schema = createSelectSchema(bookmarks);
