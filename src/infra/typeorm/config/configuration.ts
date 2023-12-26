import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class Configuration implements TypeOrmOptionsFactory {
    constructor(
      private readonly configService: ConfigService
    ){}
  
    getDatabaseHost(): string {
      return this.configService.get<string>('DATABASE_HOST');
    }
  
    getDatabasePort(): number {
      return this.configService.get<number>('DATABASE_PORT');
    }
  
    getDatabaseUsername(): string {
      return this.configService.get<string>('DATABASE_USERNAME');
    }
  
    getDatabasePassword(): string {
      return this.configService.get<string>('DATABASE_PASSWORD');
    }
  
    getDatabaseName(): string {
      return this.configService.get<string>('DATABASE_NAME');
    }

    createTypeOrmOptions(): any {
      return {
        type: 'postgres',
        host: this.getDatabaseHost(),
        port: this.getDatabasePort(),
        username: this.getDatabaseUsername(),
        password: this.getDatabasePassword(),
        database: this.getDatabaseName(),
        entities: ['dist/domain/**/entity/*.entity.{ts,js}'],
        migrations: ['dist/infra/typeorm/migrations/*.{ts,js}'],
        synchronize: true,
      }
    }
  }