import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/contollers/auth/users.controller';
import { User } from 'src/domain/auth/entity/user.entity';
import { EncryptService } from 'src/infra/encrypt/encrypt.service';
import { UsersPostgresAdapter } from 'src/infra/modules/auth/users/adapters/users.repository';
import { RegisterUserService } from 'src/services/auth/registerUser.service';
import { LoginUserService } from 'src/services/auth/loginUser.service';
import { TokenService } from 'src/infra/jwt/token.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/infra/jwt/constants';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: jwtConstants.expiresIn },
  })],
  controllers: [UsersController],
  providers: [RegisterUserService, UsersPostgresAdapter, LoginUserService, EncryptService, TokenService],
})

export class AuthModule { }
