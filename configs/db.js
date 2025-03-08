 import { drizzle } from 'drizzle-orm/neon-http';
 export const db = drizzle(process.env.NEXT_PUBLIC_DATABASE_CONNECTION_STRING);

 
// import { Pool } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-serverless';

// const pool = new Pool({ connectionString: env.NEXT_PUBLIC_DATABASE_CONNECTION_STRING });
//  export const db = drizzle(pool)
