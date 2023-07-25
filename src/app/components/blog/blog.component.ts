import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '@app/components/_models';
import { BlogService } from '@app/components/_services/blog.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  botonCrear = new FormControl("");
  blogs: Blog[] = [];
  published: Date;
  bl: any[] = [];

  constructor(private blogService: BlogService, private router: Router, private datePipe: DatePipe) { }

  ngOnInit() {
    this.getBlogs();
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');

  }

  onSubmit() {


  }

  async getBlogs() {
    this.blogs = await this.blogService.getAll();

    this.blogs = this.blogs.map(blog => {
      blog.date = this.datePipe.transform(blog.created, 'MMMM dd y');
      if(blog.is_active == 'Y'){
        blog.activo = "Activo";
      }else { blog.activo = "Inactivo"; }
      return blog;
    });
  }

  edit(bl): void {
    let blog = this.blogs.find(blog => {
      return blog.id === bl.id;
    })
    this.router.navigate(['manage/blogs/form/', JSON.stringify(blog)]);
  }

  seeComments(blog: Blog): void {
    this.router.navigate(['manage/comments/', JSON.stringify(blog)]);
  }

  async inactive(blog: Blog){
    blog.user_updated = JSON.parse(localStorage.getItem('user')).id;
    await this.blogService.disableBlog(blog);
    location.reload();
  }

  async activate(blog: Blog) {
    blog.user_updated = JSON.parse(localStorage.getItem('user')).id;
    await this.blogService.activateBlog(blog);
    location.reload();
  }


  ngOnDestroy() {
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
    // var body = document.getElementsByTagName('body')[0];
    // body.classList.remove('index-page');
  }

  newBlog() {
    this.router.navigate(['manage/blogs/form/']);
  }
}
