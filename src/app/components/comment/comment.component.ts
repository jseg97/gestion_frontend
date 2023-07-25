import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '@app/components/_models/blog';
import { CommentService } from '@app/components/_services/comment.service';
import { Comment, User } from '@app/components/_models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {
  comments: Comment[] = [];
  blog: Blog;
  userLogged:User;
  constructor(private commentService: CommentService, private router: Router, private actRoute: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.userLogged = JSON.parse(localStorage.getItem('user')).id;

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');

    this.getComments();
  }

  onSubmit(): void {
    var comment = this.comments[1];
    this.router.navigate(['manage/comments/form/', JSON.stringify(comment)]);
  }

  // async getComments() {
  //   this.comments = await this.commentService.getAll();
  //   this.actRoute.params.subscribe(params => {
  //     this.blog = JSON.parse(params['blog']);
  //     // Perform any additional actions with the received data
  //   });
  //   this.comments = this.comments.filter((c)=>{
  //     return c.blogId === this.blog.id;
  //   });
  // }

  async getComments() {
    this.actRoute.params.subscribe(params => {
      this.blog = JSON.parse(params['blog']);
      // Perform any additional actions with the received data
    });
    this.comments = await this.commentService.getAllFromBlogId(this.blog.id);
    this.comments = this.comments.map(comment => {
      comment.date = this.datePipe.transform(comment.created, 'MMMM dd y');
      comment.is_active == 'Y'? comment.activo = "Activo" : comment.activo = "Inactivo";
      return comment;
    });

    // this.comments = this.comments.map(comment => {
    //   comment.created = this.datePipe.transform(comment.created, 'MMMM dd y')
    //   return comment;
    // });
    console.log(this.comments);
  }

  async edit(comment: Comment) {
    this.router.navigate(['manage/comments/form/', JSON.stringify(comment)]);
  }

  ngOnDestroy() {
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
    // var body = document.getElementsByTagName('body')[0];
    // body.classList.remove('index-page');
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
