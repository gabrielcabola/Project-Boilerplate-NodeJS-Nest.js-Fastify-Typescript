module.exports = {
  "name": "default",
  "type": process.env.DB_TYPE || 'postgres',
  "host": process.env.DB_HOST || '127.0.0.1',
  "port": process.env.DB_PORT || '5434',
  "username": process.env.DB_USERNAME || 'user',
  "password": process.env.DB_PASSWORD || 'supersecretpassword',
  "database": process.env.DB_DATABASE || 'app',
  "entities": [
    "src/**/**/*.entity.ts",
    "dist/src/**/**/*.entity.ts"
  ],
  "synchronize": true,
  "migrations": ["src/migrations/*{.ts,.js}"],
  "migrationsTableName": "migrations_typeorm",
  "migrationsRun": true
};