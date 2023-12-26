import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { RegisterUserService } from 'src/services/auth/registerUser.service';
import { registerUserRequest } from './request/registerUserRequest';
import { registerUserResponse } from './response/registerUserResponse';
import { loginUserRequest } from './request/loginUserRequest';
import { loginUserResponse } from './response/loginUserResponse';
import { LoginUserService } from 'src/services/auth/loginUser.service';

@Controller('auth')
export class UsersController {
    constructor(
        private readonly registerUserService: RegisterUserService,
        private readonly loginUserService: LoginUserService,
    ) { }

    @HttpCode(201)
    @Post('/register')
    async registerUser(
        @Body() request: registerUserRequest,
    ): Promise<registerUserResponse> {
        try {
            const user = await this.registerUserService.execute({ login: request.login, password: request.password });
            return { success: true, user: user.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    @HttpCode(200)
    @Post('/login')
    async loginUser(
        @Body() request: loginUserRequest,
    ): Promise<loginUserResponse> {
        try {
            const user = await this.loginUserService.execute({ login: request.login, password: request.password });
            return { success: true, token: user.token };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}