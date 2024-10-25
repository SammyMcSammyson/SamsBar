import pg from 'pg';
export const db = new pg.Pool({
  connectionString: process.env.NEXT_POSTGRES,
});



const CLERK_API_KEY = process.env.CLERK_API_KEY;
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;

const result = await fetch('https://api.clerk.com/v1/users/', {
  headers: {
    Authorization: `Bearer ${CLERK_API_KEY}`,
  },
});
const data = await result.json();

