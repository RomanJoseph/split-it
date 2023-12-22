import { Module } from '@nestjs/common';
import { AppController } from '../../contollers/app.controller';
import { AppService } from '../../services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '../typeorm/config/typeormConfig';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), AuthModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
