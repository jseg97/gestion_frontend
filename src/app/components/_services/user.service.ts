import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/components/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    updateUser():Promise<User> {
    var url = `${environment.apiUrl}/users`;
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    
    let body = { id: 3, username: 'bloggerUpdate', password: 'blogger20xx', firstName: 'UpBlog', lastName: 'Bloggy', email: 'cavilesxx@gthca.com', role: "Admin" };
    

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${user.token}`,
    });

    const options = {
      headers: headers,
    }

    return this.http.put<User>(url, JSON.stringify(body), options).toPromise().then(res => res as User);
  }

  createUser():Promise<User> {
    var url = `${environment.apiUrl}/users`;
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);

    let body = {
      id : 5,
      username : "nuevouser",
      firstName : "NUEVO USER",
      lastName : "NUEVO USER",
      email: "Correo",
      role: "Admin",
      password: "123"
    };
    

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${user.token}`,
    });

    const options = {
      headers: headers,
    }
    
    return this.http.post<User>(url, JSON.stringify(body), options).toPromise().then(res => res as User);
  }
}