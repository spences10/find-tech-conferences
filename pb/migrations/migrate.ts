import { execSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const MIGRATIONS_DIR = join(__dirname, 'migrations');

async function runMigrations() {
	try {
		// Get all migration files
		const migrationFiles = readdirSync(MIGRATIONS_DIR)
			.filter((file) => file.endsWith('.ts'))
			.sort();

		// Run each migration
		for (const file of migrationFiles) {
			console.log(`Running migration: ${file}`);
			execSync(`tsx ${join(MIGRATIONS_DIR, file)}`, {
				stdio: 'inherit',
			});
		}

		console.log('All migrations completed successfully');
	} catch (err) {
		console.error('Migration failed:', err);
		process.exit(1);
	}
}

runMigrations();
