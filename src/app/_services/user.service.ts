import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, UserRegister } from '../_models/index';
import { environment } from '@environments/environment';
@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.APIUrl}/Home/GetAllUser`);
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id);
    }

    create(user: User) {
        return this.http.post('/api/users', user);
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id);
    }

    registerUser(registerUser: UserRegister) {

        return this.http.post(`${environment.APIUrl}User/RegisterUser`, registerUser);
    }
}