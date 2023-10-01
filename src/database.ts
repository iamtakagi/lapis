import { Pool, QueryConfig, QueryResult, QueryResultRow } from 'pg';

export class Database {
  pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.POSTGRES_HOST ?? 'localhost',
      user: process.env.POSTGRES_USER ?? 'postgres',
      database: process.env.POSTGRES_DB ?? 'postgres',
      password: process.env.POSTGRES_PASSWORD ?? 'postgres',
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
    });
  }

  async connect(): Promise<void> {
    try {
      await this.pool.connect();
    } catch (err) {
      throw new Error(`Error while connecting to database: ${err}`);
    }
  }

  async query(
    queryTextOrConfig: string | QueryConfig<string[]>,
    values?: string[] | undefined,
  ): Promise<QueryResult> {
    return await this.pool.query(queryTextOrConfig, values);
  }
}

const database = new Database();
(async () => {
  await database.connect();
})();
export { database };
