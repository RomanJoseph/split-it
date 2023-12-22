import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/contollers/auth/users.controller';
import { User } from 'src/domain/auth/entity/user.entity';
import { EncryptService } from 'src/infra/encrypt/encrypt.service';
import { UsersPostgresAdapter } from 'src/infra/users/adapters/users.repository';
import { RegisterUserService } from 'src/services/auth/registerUser.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [RegisterUserService, UsersPostgresAdapter, EncryptService],
})
export class AuthModule { }
