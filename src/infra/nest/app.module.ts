import { Module } from '@nestjs/common';
import { AppController } from '../../contollers/app.controller';
import { AppService } from '../../services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Configuration } from '../typeorm/config/configuration';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useClass: Configuration,
    inject: [ConfigService],
  }), AuthModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
