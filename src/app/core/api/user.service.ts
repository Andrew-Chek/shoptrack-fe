import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserApiInterface } from '@core/dto/signin.api.interface';
import { UpdateUserDTO } from '@store/user/user.model';
import { Observable } from 'rxjs';
import { USER } from '../constants/api-urls';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) {}

    public patch(user: UpdateUserDTO): Observable<UserApiInterface> {
        return this.http.patch<UserApiInterface>(USER.users, user);
    }
}
