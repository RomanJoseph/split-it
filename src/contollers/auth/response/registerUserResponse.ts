import { UserWithoutPassword } from "src/domain/auth/entity/user.entity";

export type registerUserResponse = {
    success: boolean;
    user?: UserWithoutPassword;
    error?: string;
}