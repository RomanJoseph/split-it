import { Injectable, UnauthorizedException, NotFoundException } from "@nestjs/common";
import { UsersPostgresAdapter } from "src/infra/modules/auth/users/adapters/users.repository";
import { loginUserServiceCommand } from "./command/loginUserServiceCommand";
import { EncryptService } from "src/infra/encrypt/encrypt.service";
import { loginUserServiceResponse } from "./response/loginUserServiceResponse";
import { TokenService } from "src/infra/jwt/token.service";

@Injectable()
export class LoginUserService {
    constructor(
        private readonly usersRepository: UsersPostgresAdapter,
        private readonly encryptService: EncryptService,
        private readonly tokenService: TokenService,
    ) {}

    async execute(command: loginUserServiceCommand): Promise<loginUserServiceResponse> {
        const user = await this.usersRepository.findByLogin(command.login);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const { match } = await this.encryptService.comparePassword(command.password, user.password);

        if (!match) {
            throw new UnauthorizedException('Invalid password');
        }

        return { token: await this.tokenService.generateToken({ id: user.id })};
    }
}