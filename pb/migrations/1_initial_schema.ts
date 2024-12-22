import { config } from 'dotenv';
import PocketBase from 'pocketbase';

// Load environment variables
config();

const { PB_ADMIN_EMAIL, PB_ADMIN_PASSWORD } = process.env;

if (!PB_ADMIN_EMAIL || !PB_ADMIN_PASSWORD) {
	throw new Error(
		'Missing admin credentials in environment variables',
	);
}

async function migrate() {
	const pb = new PocketBase('http://127.0.0.1:8090');

	try {
		// Authenticate as admin
		await pb.admins.authWithPassword(
			PB_ADMIN_EMAIL || '',
			PB_ADMIN_PASSWORD || '',
		);

		// Create collections
		await pb.collections.create({
			name: 'conferences',
			type: 'base',
			schema: [
				{
					name: 'name',
					type: 'text',
					required: true,
				},
				{
					name: 'description',
					type: 'text',
				},
				{
					name: 'start_date',
					type: 'date',
					required: true,
				},
				{
					name: 'end_date',
					type: 'date',
					required: true,
				},
				{
					name: 'city',
					type: 'text',
					required: true,
				},
				{
					name: 'country',
					type: 'text',
					required: true,
				},
				{
					name: 'venue',
					type: 'text',
				},
				{
					name: 'website_url',
					type: 'url',
					required: true,
				},
				{
					name: 'cfp_start_date',
					type: 'date',
				},
				{
					name: 'cfp_end_date',
					type: 'date',
				},
				{
					name: 'approval_status',
					type: 'select',
					options: {
						values: ['pending', 'approved', 'rejected'],
					},
					required: true,
				},
				{
					name: 'owner',
					type: 'relation',
					options: {
						collectionId: '_pb_users_auth_',
						cascadeDelete: false,
						maxSelect: 1,
						minSelect: 1,
					},
					required: true,
				},
				{
					name: 'image',
					type: 'file',
				},
				{
					name: 'tags',
					type: 'relation',
					options: {
						collectionId: 'tags',
						cascadeDelete: false,
						maxSelect: 8,
					},
				},
			],
			listRule: '',
			viewRule: '',
			createRule: "@request.auth.id != ''",
			updateRule: '@request.auth.id = owner.id',
			deleteRule: '@request.auth.id = owner.id',
		});

		await pb.collections.create({
			name: 'tags',
			type: 'base',
			schema: [
				{
					name: 'tag_name',
					type: 'text',
					required: true,
					options: {
						min: 2,
						max: 50,
					},
				},
			],
			listRule: '',
			viewRule: '',
			createRule: "@request.auth.id != ''",
			updateRule: '',
			deleteRule: '',
		});

		await pb.collections.create({
			name: 'bookmarks',
			type: 'base',
			schema: [
				{
					name: 'user',
					type: 'relation',
					required: true,
					options: {
						collectionId: '_pb_users_auth_',
						cascadeDelete: true,
						maxSelect: 1,
						minSelect: 1,
					},
				},
				{
					name: 'conference',
					type: 'relation',
					required: true,
					options: {
						collectionId: 'conferences',
						cascadeDelete: true,
						maxSelect: 1,
						minSelect: 1,
					},
				},
				{
					name: 'bookmarked_at',
					type: 'date',
					required: true,
				},
			],
			listRule: '@request.auth.id = user.id',
			viewRule: '@request.auth.id = user.id',
			createRule:
				"@request.auth.id != '' && @request.auth.id != conference.owner.id",
			updateRule: '@request.auth.id = user.id',
			deleteRule: '@request.auth.id = user.id',
		});

		console.log('Collections created successfully');
	} catch (err) {
		console.error('Migration failed:', err);
		throw err;
	}
}

migrate();
