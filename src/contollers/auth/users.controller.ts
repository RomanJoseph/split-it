import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { RegisterUserService } from 'src/services/auth/registerUser.service';
import { registerUserRequest } from './request/registerUserRequest';
import { registerUserResponse } from './response/registerUserResponse';

@Controller()
export class UsersController {
    constructor(
        private readonly userService: RegisterUserService,
    ) {}

    @Post('/users')
    @HttpCode(201)
    async registerUser(
        @Body() request: registerUserRequest,
    ): Promise<registerUserResponse> {
        try {
            const user = await this.userService.execute({ login: request.login, password: request.password });
            return { success: true, user: user.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}