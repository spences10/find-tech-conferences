/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Bookmarks = "bookmarks",
	ConferenceTags = "conference_tags",
	Conferences = "conferences",
	Tags = "tags",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type BookmarksRecord = {
	bookmarked_at: IsoDateString
	conference?: RecordIdString
	user?: RecordIdString
}

export type ConferenceTagsRecord = {
	conference?: RecordIdString
	tag?: RecordIdString
}

export enum ConferencesApprovalStatusOptions {
	"pending" = "pending",
	"approved" = "approved",
	"rejected" = "rejected",
}
export type ConferencesRecord = {
	approval_status: ConferencesApprovalStatusOptions
	cfp_end_date: IsoDateString
	cfp_start_date: IsoDateString
	description: string
	end_date: IsoDateString
	image: string
	location: string
	name: string
	owner: RecordIdString
	start_date: IsoDateString
	website_url: string
}

export type TagsRecord = {
	tag_name: string
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type BookmarksResponse<Texpand = unknown> = Required<BookmarksRecord> & BaseSystemFields<Texpand>
export type ConferenceTagsResponse<Texpand = unknown> = Required<ConferenceTagsRecord> & BaseSystemFields<Texpand>
export type ConferencesResponse<Texpand = unknown> = Required<ConferencesRecord> & BaseSystemFields<Texpand>
export type TagsResponse<Texpand = unknown> = Required<TagsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	bookmarks: BookmarksRecord
	conference_tags: ConferenceTagsRecord
	conferences: ConferencesRecord
	tags: TagsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	bookmarks: BookmarksResponse
	conference_tags: ConferenceTagsResponse
	conferences: ConferencesResponse
	tags: TagsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'bookmarks'): RecordService<BookmarksResponse>
	collection(idOrName: 'conference_tags'): RecordService<ConferenceTagsResponse>
	collection(idOrName: 'conferences'): RecordService<ConferencesResponse>
	collection(idOrName: 'tags'): RecordService<TagsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
