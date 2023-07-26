import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '@app/components/_models/blog';
import { CommentService } from '@app/components/_services/comment.service';
import { Comment, User } from '@app/components/_models';
import { DatePipe } from '@angular/common';
import { BlogService } from '../_services/blog.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {
  comments: Comment[] = [];
  blog: Blog;
  userLogged:User;
  blogId:any;

  constructor(private commentService: CommentService, private blogService : BlogService, private router: Router, private route: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.userLogged = JSON.parse(localStorage.getItem('user')).id;
    this.blogId = this.route.snapshot.paramMap.get('blogId');
    
    // Subscribe to object received by param
    // this.route.params.subscribe(params => {    
    //   this.blog = JSON.parse(params['blog']);       
    // });    
    
    this.getBlogById(parseInt(this.blogId))
    this.getComments();
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('comments');
  }

  onSubmit(): void {
    var comment = this.comments[1];
    this.router.navigate(['manage/comments/form/', JSON.stringify(comment)]);
  }  

  async getComments() {    
    this.comments = await this.commentService.getAllFromBlogId(this.blogId);
    this.comments = this.comments.map(comment => {
      comment.date = this.datePipe.transform(comment.created, 'MMMM dd y');
      comment.is_active == 'Y'? comment.activo = "Activo" : comment.activo = "Inactivo";
      return comment;
    });
  }

  async edit(comment: Comment) {
    this.router.navigate(['manage/comments/form/', JSON.stringify(comment)]);
  }

  ngOnDestroy() {
    // var navbar = document.getElementsByTagName('nav')[0];
    // navbar.classList.remove('navbar-transparent');
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('comments');
  }

  async getBlogById(id: number) {
    this.blog = await this.blogService.getById(id);
    console.log(this.blog);    
  }

  async inactive(comment: Comment){
    // comment.user_update = JSON.parse(localStorage.getItem('user')).id;
    await this.commentService.inactivateComment(comment);
    location.reload();
  }

  async activate(comment: Comment) {
    // blog.user_updated = JSON.parse(localStorage.getItem('user')).id;
    await this.commentService.activateComment(comment);
    location.reload();
  }

}
