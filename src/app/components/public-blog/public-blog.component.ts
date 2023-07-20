import { Component, OnDestroy, OnInit } from '@angular/core';
import { Blog } from '../_models/blog';
import { BlogService } from '../_services/blog.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-public-blog',
  templateUrl: './public-blog.component.html',
  styleUrls: ['./public-blog.component.css']
})
export class PublicBlogComponent implements OnInit, OnDestroy {
  blogs: Blog[] = [];

  constructor(private blogService : BlogService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getBlogs();

    
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }

  async getBlogs() {    
    this.blogs = await this.blogService.getAll();
    
    this.blogs = this.blogs.map(blog =>{
      blog.date =this.datePipe.transform(blog.created_at, 'MMMM dd y')
      return blog;
    });
    console.log(this.blogs);       
  }

  ngOnDestroy() {
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('index-page');
  }

}
