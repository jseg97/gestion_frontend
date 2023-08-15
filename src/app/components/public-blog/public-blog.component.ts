import { Component, OnDestroy, OnInit } from '@angular/core';
import { Blog } from '../_models/blog';
import { BlogService } from '../_services/blog.service';
import { DatePipe } from '@angular/common';
import * as Rellax from 'rellax';

@Component({
  selector: 'app-public-blog',
  templateUrl: './public-blog.component.html',
  styleUrls: ['./public-blog.component.css']
})
export class PublicBlogComponent implements OnInit, OnDestroy {
  blogs: Blog[] = [];

  constructor(private blogService : BlogService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    var rellaxHeader = new Rellax('.rellax-header');
    this.getBlogs();


    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('blog');
  }

  async getBlogs() {
    this.blogs = await this.blogService.getAll();

    this.blogs = this.blogs.filter(x=> x.is_active === 'Y').map(blog =>{
      blog.date =this.datePipe.transform(blog.created, 'MMMM dd y')
      return blog;
    });
  }

  ngOnDestroy() {
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('blog');
  }

}
