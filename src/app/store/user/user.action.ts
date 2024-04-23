import { UpdateUserDTO, UpdateUserInStoreParams } from './user.model';

export class UpdateUserInStore {
    static readonly type = '[USER] Update user in store';
    constructor(public payload: UpdateUserInStoreParams) {}
}

export class UpdateUser {
    static readonly type = '[USER] Update user';
    constructor(public payload: UpdateUserDTO) {}
}

export class VerifyUser {
    static readonly type = '[USER] Verify user';
    constructor() {}
}
