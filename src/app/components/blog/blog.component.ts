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
  published : Date;
  bl : any[] = [];

  constructor( private blogService: BlogService, private router: Router, private datePipe: DatePipe) { }

  ngOnInit() {
    this.getBlogs();   
    
  }

  onSubmit() {

    
  }

  async getBlogs() {    
    this.blogs = await this.blogService.getAll();
    
    this.blogs = this.blogs.map(blog =>{
      blog.date =this.datePipe.transform(blog.created_at, 'MMMM dd y')
      return blog;
    });       
  }

  edit(bl) : void {
    let blog = this.blogs.find(blog =>{
      return blog.id === bl.id;
    })
    this.router.navigate(['manage/blogs/form/', JSON.stringify(blog)]);
  }

  seeComments(blog : Blog) : void {
    this.router.navigate(['manage/comments/', JSON.stringify(blog)]);
  }
}
