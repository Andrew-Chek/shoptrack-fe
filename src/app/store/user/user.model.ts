import { UserApiInterface } from '@app/core/dto/signin.api.interface';

export interface UserModel {
    user: UserApiInterface | undefined;
}

export interface UpdateUserInStoreParams extends UserApiInterface {
    userInfo?: any;
}

export type UpdateUserDTO = Partial<UserApiInterface>;
