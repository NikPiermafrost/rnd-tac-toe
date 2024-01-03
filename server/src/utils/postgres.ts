import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as schema from '../schema/schema';

const migrationClient = postgres(process.env.POSTGRES_URL!, { max: 1 });

migrate(drizzle(migrationClient), {
  migrationsFolder: 'src/utils/migrations',
});

const queryClient = postgres(process.env.POSTGRES_URL!);

export const db = drizzle(queryClient, { schema });