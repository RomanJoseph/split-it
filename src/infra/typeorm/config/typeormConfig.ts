import { TypeOrmModuleOptions } from "@nestjs/typeorm";


const DATABASE_HOST = process.env.DB_HOST_LOCAL;
const DATABASE_PORT = process.env.DB_PORT_LOCAL;
const DATABASE_USERNAME = process.env.DB_USER_LOCAL;
const DATABASE_PASSWORD = String(process.env.DB_PASSWORD_LOCAL);
const DATABASE_NAME = process.env.DB_NAME_LOCAL;

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DATABASE_HOST,
  port: Number(DATABASE_PORT),
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  entities: ['dist/domain/**/entity/*.entity.{ts,js}'],
  migrations: ['dist/infra/typeorm/migrations/*.{ts,js}'],
  synchronize: true,
};

console.log(DATABASE_HOST);
