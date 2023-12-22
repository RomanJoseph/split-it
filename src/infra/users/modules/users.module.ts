import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/domain/auth/entity/user.entity";
import { UsersPostgresAdapter } from "../adapters/users.repository";
import { UsersController } from "src/contollers/auth/users.controller";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersPostgresAdapter],
    controllers: [UsersController],
  })
  export class UsersModule {}