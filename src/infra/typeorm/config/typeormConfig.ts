import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from "dotenv";

config();

export const typeormConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: ['dist/domain/**/entity/*.entity.{ts,js}'],
    migrations: ['dist/infra/typeorm/migrations/*.{ts,js}'],
    synchronize: true,
};