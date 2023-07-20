import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Rellax from 'rellax';
import { BlogService } from '../_services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../_models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog-entry',
  templateUrl: './blog-entry.component.html',
  styleUrls: ['./blog-entry.component.css']
})
export class BlogEntryComponent implements OnInit, OnDestroy {
  id : any;
  blog:Blog;
  data : Date = new Date();
  focus;
  focus1;

  constructor(private blogService : BlogService, private route : ActivatedRoute) { 
    let x = this.route.snapshot.paramMap.get('id');
    console.log(x);
    this.getBlogById(parseInt(x))
    
    
  }

  ngOnInit() {
    
    
    var rellaxHeader = new Rellax('.rellax-header');

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }
  
  ngOnDestroy(){
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  async getBlogById(id: number) {
    this.blog = await this.blogService.getById(id);
    console.log(this.blog);
  }

}
