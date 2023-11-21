export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  db_password: process.env.DB_PASSWORD || 'postgres',
  db_name: process.env.DB_NAME || 'ChatGroupDB',
  db_host: process.env.DB_HOST || 'localhost',
  db_port: process.env.DB_PORT || 5432,
  db_username: process.env.DB_USERNAME || 'postgres',
  jwt_secret: process.env.JWT_SECRET,
  port: process.env.PORT || '5000',
  cloudinary_name: process.env.CLOUDINARY_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret_key: process.env.CLOUDINARY_API_SECRET_KEY,
});
