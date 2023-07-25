import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '@app/components/_models/blog';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient, private router : Router) { }

  getAll():Promise<Blog[]> {
    var url = `${environment.apiUrl}/blog`;
    return this.http.get<Blog[]>(url).toPromise().then(res => res as Blog[]);
  }

  updateBlog(blog:Blog): any {
    var url = `${environment.apiUrl}/blog`;
    const user = JSON.parse(localStorage.getItem('user'));

    let body = {
      id : blog.id,
      title : blog.title,
      description: blog.description,
      content : blog.content,
      updated: Date.now(),
      user_updated: user.id,
      is_active: blog.is_active
    };
    

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${user.token}`,
    });

    const options = {
      headers: headers,
    }

    this.http.put(url, JSON.stringify(body), options).toPromise().then(res => {
      if(res["success"]){
        this.router.navigate(['manage/blogs/']);
      }


    });
  }

  createBlog(blog:Blog):any {
    var url = `${environment.apiUrl}/blog`;
    const user = JSON.parse(localStorage.getItem('user'));

    let body = {
      title : blog.title,
      description: blog.description,
      content : blog.content,
      created: Date.now(),
      user_created: user.id
    };
    

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${user.token}`,
    });

    const options = {
      headers: headers,
    }
    
    return this.http.post(url, JSON.stringify(body), options).toPromise().then(res => {
      if(res["success"]){
        console.log(res["data"]);
        this.router.navigate(['manage/blogs/']);
      }


    });
  }

  getById(id: number): Promise<Blog> {
    return this.http.get<Blog>(`${environment.apiUrl}/blog/${id}`).toPromise().then(res => res as Blog);
  }

  async disableBlog(blog:any){
    var url = `${environment.apiUrl}/blog`;
    const user = JSON.parse(localStorage.getItem('user'));

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${user.token}`,
    });

    const options = {
      headers: headers,
      body: JSON.stringify(blog)
    }

    this.http.delete(url, options ).toPromise().then(res => {
      if(res["success"]){
        this.router.navigate(['manage/blogs/']);
      }


    });
  }

  async activateBlog(blog:any) {
    blog.is_active = 'Y';
    await this.updateBlog(blog);
  }

}
