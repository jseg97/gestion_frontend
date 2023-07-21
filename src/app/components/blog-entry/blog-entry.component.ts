import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Rellax from 'rellax';
import { BlogService } from '../_services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { Blog, Comment } from '../_models';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../_services/comment.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-blog-entry',
  templateUrl: './blog-entry.component.html',
  styleUrls: ['./blog-entry.component.css']
})
export class BlogEntryComponent implements OnInit, OnDestroy {
  commentForm: FormGroup;
  id : any;
  blog:Blog;
  data : Date = new Date();
  text : string='';
  focus;
  focus1;
  x: any
  comments : Comment[];



  constructor(private formBuilder: FormBuilder,private blogService : BlogService, private route : ActivatedRoute, private commentService : CommentService, private datePipe: DatePipe) { 
    this.x = this.route.snapshot.paramMap.get('id');
    this.getBlogById(parseInt(this.x))
    this.commentForm = this.formBuilder.group({
      content: '',
    });
    
  }

  ngOnInit() {
    
    
    var rellaxHeader = new Rellax('.rellax-header');

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    this.getComments();
  }
  
  ngOnDestroy(){
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  async getBlogById(id: number) {
    this.blog = await this.blogService.getById(id);
  }

  comment(){
    console.log(this.commentForm.get('content').value)
    this.commentService.createComment(this.commentForm.get('content').value,this.x);
  }

  async getComments() {
    this.comments = await this.commentService.getAll();

    this.comments = this.comments.map(comment => {
      comment.created = this.datePipe.transform(comment.created, 'MMMM dd y')
      return comment;
    });
    console.log(this.comments);
  }

}
