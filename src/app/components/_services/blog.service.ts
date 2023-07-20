import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from '@app/components/_models/blog';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getAll():Promise<Blog[]> {
    var url = `${environment.apiUrl}/blog`;
    return this.http.get<Blog[]>(url).toPromise().then(res => res as Blog[]);
  }

  updateBlog():Promise<Blog> {
    var url = `${environment.apiUrl}/blog`;
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    let body = {
      id : 3,
      title : "TITULO MODIFICADO",
      content : "Contenido Modifi"
    };
    

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${user.token}`,
    });

    const options = {
      headers: headers,
    }

    return this.http.put<Blog>(url, JSON.stringify(body), options).toPromise().then(res => res as Blog);
  }

  createBlog():Promise<Blog> {
    var url = `${environment.apiUrl}/blog`;
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);

    let body = {
      id: 6,
      title : "Nuevo BLOG --> TRAIDO DESDE LA WEB",
      content : "Blog de Chat GPT"
    };
    

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${user.token}`,
    });

    const options = {
      headers: headers,
    }
    
    return this.http.post<Blog>(url, JSON.stringify(body), options).toPromise().then(res => res as Blog);
  }

  getById(id: number): Promise<Blog> {
    return this.http.get<Blog>(`${environment.apiUrl}/blog/${id}`).toPromise().then(res => res as Blog);
  }
}
