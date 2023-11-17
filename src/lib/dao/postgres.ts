import postgres from 'postgres'

import { 
    PRV_PG_HOST,
    PRV_PG_PORT,
    PRV_PG_DB_NAME,
    PRV_PG_USER_NAME,
    PRV_PG_PASS,
    PRV_PG_IDLE_TIMEOUT_SEC
} from '$env/static/private';

export const pg = postgres({
    host: PRV_PG_HOST,
    port: Number(PRV_PG_PORT),
    db: PRV_PG_DB_NAME,
    username: PRV_PG_USER_NAME,
    pass: PRV_PG_PASS,
    idle_timeout: Number(PRV_PG_IDLE_TIMEOUT_SEC),
});
