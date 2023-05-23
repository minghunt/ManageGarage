import dotenv from 'dotenv';

dotenv.config();

export const CONNECTION_STRING = process.env.CONNECTION_STRING;

export const DB_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

export const PORT = process.env.PORT;


