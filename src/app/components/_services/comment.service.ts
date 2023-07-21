import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog, Comment } from '@app/components/_models';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getAll():Promise<Comment[]> {
    var url = `${environment.apiUrl}/comment`;
    return this.http.get<Comment[]>(url).toPromise().then(res => res as Comment[]);
  }

  updateComment():Promise<Comment> {
    var url = `${environment.apiUrl}/comment`;
    const user = JSON.parse(localStorage.getItem('user'));
    
    let body = {
      id : 3,
      userId : 1,
      content : "COMENTARIO MODIFICADO",
      blogId : 1
    };
    

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${user.token}`,
    });

    const options = {
      headers: headers,
    }

    return this.http.put<Comment>(url, JSON.stringify(body), options).toPromise().then(res => res as Comment);
  }

  createComment(texto:any, blogId:any):Promise<Comment> {
    var url = `${environment.apiUrl}/comment`;
    const user = JSON.parse(localStorage.getItem('user'));

    let body = {
      userId : user.id,
      content : texto,
      blogId : blogId,
    };
    

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${user.token}`,
    });

    const options = {
      headers: headers,
    }
    
    return this.http.post<Comment>(url, JSON.stringify(body), options).toPromise().then(res => res as Comment);
  }

  getById(id: number) {
    return this.http.get<Comment>(`${environment.apiUrl}/users/${id}`);
  }
}
