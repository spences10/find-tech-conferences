import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const conferences = sqliteTable('conferences', {
	id: integer('id').primaryKey().primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	start_date: text('start_date').notNull(),
	end_date: text('end_date').notNull(),
	location: text('location').notNull(),
	website_url: text('website_url'),
	cfp_start_date: text('cfp_start_date'),
	cfp_end_date: text('cfp_end_date'),
	created_at: integer('created_at', { mode: 'timestamp' }).default(
		sql`(strftime('%s', 'now'))`
	),
	updated_at: integer('updated_at', { mode: 'timestamp' }).default(
		sql`(strftime('%s', 'now'))`
	)
});
export const insert_conference_schema =
	createInsertSchema(conferences);
export const select_conference_schema =
	createSelectSchema(conferences);
