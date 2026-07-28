export default () => ({
  port: parseInt(process.env.API_PORT || '3001', 10),
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback-secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  cloudflare: {
    accountId: process.env.CF_ACCOUNT_ID,
    accessKeyId: process.env.CF_ACCESS_KEY_ID,
    secretAccessKey: process.env.CF_SECRET_ACCESS_KEY,
    bucketName: process.env.CF_BUCKET_NAME || 'rvios-media',
    publicUrl: process.env.CF_PUBLIC_URL,
  },
  cors: {
    origins: (process.env.CORS_ORIGINS || 'http://localhost:3000').split(','),
  },
});
