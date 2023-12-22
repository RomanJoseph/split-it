import { Injectable } from "@nestjs/common";
import { User } from "src/domain/auth/entity/user.entity";
import { UsersPostgresAdapter } from "src/infra/users/adapters/users.repository";
import { registerUserServiceCommand } from "./command/registerUserServiceCommand";
import { registerUserServiceResponse } from "./response/registerUserServiceResponse";
import { EncryptService } from "src/infra/encrypt/encrypt.service";

@Injectable()
export class RegisterUserService {
    constructor(
        private readonly usersPostgresAdapter: UsersPostgresAdapter,
        private readonly encryptService: EncryptService,
    ) { }

    async execute(command: registerUserServiceCommand): Promise<registerUserServiceResponse> {
        const user = await this.usersPostgresAdapter.findByLogin(command.login);

        if (user) {
            throw new Error('User already exists');
        }

        const savedUser = await this.usersPostgresAdapter.save(Object.assign(new User(),
            {
                login: command.login,
                password: await this.encryptService.encryptPassword(command.password)
            }));

        const UserWithoutPassword = {
            id: savedUser.id,
            login: savedUser.login,
            createdAt: savedUser.createdAt,
            updatedAt: savedUser.updatedAt,
        }

        return { user: UserWithoutPassword };
    }
}