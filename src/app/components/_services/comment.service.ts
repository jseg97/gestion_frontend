import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '@app/components/_models';
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

  getFromBlogId(id:number):Promise<Comment[]> {
    var url = `${environment.apiUrl}/comment/getFromBlog`;
    let params = new HttpParams()
      .set('id', id.toString());
      
    return this.http.get<Comment[]>(url, {params}).toPromise().then(res => res as Comment[]);
  }

  getAllFromBlogId(id:number):Promise<Comment[]> {
    var url = `${environment.apiUrl}/comment/getAllFromBlog`;
    let params = new HttpParams()
      .set('id', id.toString());
      
    return this.http.get<Comment[]>(url, {params}).toPromise().then(res => res as Comment[]);
  }

  getById(id: number): Promise<Comment> {
    console.log("YYY");
    
    return this.http.get<Comment>(`${environment.apiUrl}/comment/getByid/${id}`).toPromise().then(res => res as Comment);
  }

  updateComment(comment: Comment):Promise<Comment> {
    var url = `${environment.apiUrl}/comment`;
    const user = JSON.parse(localStorage.getItem('user'));
    
    let body = {
      id : comment.id,
      userId : user.id,
      content : comment.content,
      is_active: comment.is_active
    };
    
    console.log(body);
    

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

    if(user == null) return null;

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

  async activateComment(comment:any) {
    comment.is_active = 'Y';
    await this.updateComment(comment);
  }

  async inactivateComment(comment:any) {
    comment.is_active = 'N';
    await this.updateComment(comment);
  }
}
