import type { Config } from 'drizzle-kit';
export default {
  schema: './src/schema/schema.ts',
  out: './src/utils/migrations',
  driver: 'pg'
} satisfies Config;