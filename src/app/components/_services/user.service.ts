import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User, Role } from '@app/components/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    async getById(id: number):Promise<any> {
      const user = JSON.parse(localStorage.getItem('user'));

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      });
  
      const options = {
        headers: headers,
      }
      return this.http.get(`${environment.apiUrl}/users/${id}`, options).toPromise().then(res => {
        return res;
      });
    }

    updateUser(u:User):Promise<User> {
    var url = `${environment.apiUrl}/users`;
    const user = JSON.parse(localStorage.getItem('user'));
    
    let body = {
      id: u.id,
      username : u.username,
      firstName : u.firstName,
      lastName : u.lastName,
      email: u.email,
      role: u.role,
      password: u.password,
      is_active: u.is_active
    };

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

  updateStatus(u:User):Promise<User> {
    var url = `${environment.apiUrl}/users/status`;
    const user = JSON.parse(localStorage.getItem('user'));
    
    let body = {
      id: u.id,
      username : u.username,
      firstName : u.firstName,
      lastName : u.lastName,
      email: u.email,
      role: u.role,
      password: u.password,
      is_active: u.is_active
    };

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

  async createUser(us:User):Promise<any> {
    var url = `${environment.apiUrl}/users`;
    const user = JSON.parse(localStorage.getItem('user'));

    let body = {
      id: null,
      username : us.username,
      firstName : us.firstName,
      lastName : us.lastName,
      email: us.email,
      role: us.role,
      password: us.password,
      is_active: 'Y'
    };
    

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${user.token}`,
    });

    const options = {
      headers: headers,
    }
    
    return this.http.post(url, body, options).toPromise().then(res => {
      return res;
    });
  }

  async createPublicUser(us:User):Promise<any> {
    var url = `${environment.apiUrl}/users`;

    let body = {
      id: null,
      username : us.username,
      firstName : us.firstName,
      lastName : us.lastName,
      email: us.email,
      role: Role.User,
      password: us.password,
      is_active: 'Y'
    };
    

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const options = {
      headers: headers,
    }
    
    return this.http.post(url, body, options).toPromise().then(res => {
      return res;
    });
  }
}