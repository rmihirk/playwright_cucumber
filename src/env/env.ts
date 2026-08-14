import * as dotenv from 'dotenv';
import * as path from 'path';
 
export const getEnv = () => {
    const envFile = process.env.ENV ? `.env.${process.env.ENV}` : `.env.qa`;
 
    dotenv.config({
        path: path.resolve(__dirname, `../env/${envFile}`),
        override: true
    });
 
    console.log(`✅ Loaded Environment: ${path.resolve(__dirname, `../env/${envFile}`)}`);
};