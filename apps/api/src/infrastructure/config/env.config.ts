export interface EnvConfig {
  PORT: number;
  NODE_ENV: string;
  DOCDB_URI: string;
  DOCDB_DATABASE: string;
  DOCDB_USER: string;
  DOCDB_PASSWORD: string;
}

export const envConfig = (): EnvConfig => ({
  PORT: Number.parseInt(process.env.PORT || '3000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  DOCDB_URI: process.env.DOCDB_URI || 'mongodb://localhost:27021',
  DOCDB_DATABASE: process.env.DOCDB_DATABASE || 'onb',
  DOCDB_USER: process.env.DOCDB_USER || 'mongo',
  DOCDB_PASSWORD: process.env.DOCDB_PASSWORD || 'mongo',
});
