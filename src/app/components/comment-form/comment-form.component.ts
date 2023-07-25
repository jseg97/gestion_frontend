import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Rellax from 'rellax';
import { Comment, Role, User } from '../_models';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../_services/comment.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit, OnDestroy {
  commentForm: FormGroup;
  comment: Comment;
  userLogged: User;
  comId:any;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private commentService: CommentService, private router : Router) { }

  ngOnInit(): void {
    this.userLogged = JSON.parse(localStorage.getItem('user'));
    this.comId = this.route.snapshot.paramMap.get('id');
    console.log("ID");
    console.log(this.comId);
    
    
    var rellaxHeader = new Rellax('.rellax-header');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('comment-form');

    // this.route.params.subscribe(params => {
    //   this.comment = JSON.parse(params['comment']);
    //   console.log(this.comment);
    //   // Perform any additional actions with the received data

    // });

    this.commentForm = this.formBuilder.group({
      id: [''],
      is_active: [''],
      first_name: [''],
      content: [''],
    });

    this.getCommentById(parseInt(this.comId));

  }

  ngOnDestroy() {
    // var navbar = document.getElementsByTagName('nav')[0];
    // navbar.classList.remove('navbar-transparent');
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('comment-form');
  }

  patchForm(object: Comment) {
    this.commentForm.patchValue(object);
  }

  async getCommentById(id: number) {    
    this.comment = await this.commentService.getById(id);
    this.patchForm(this.comment);
  }

  async inactivate(comment: Comment){
    // comment.user_update = JSON.parse(localStorage.getItem('user')).id;
    await this.commentService.inactivateComment(comment);
    this.router.navigate(['manage/comments/form/', JSON.stringify(comment)]);
  }

  async activate(comment: Comment) {
    // blog.user_updated = JSON.parse(localStorage.getItem('user')).id;
    await this.commentService.activateComment(comment);
    this.router.navigate(['manage/comments/form/', JSON.stringify(comment)]);
  }

  async update(comment: Comment) {
    console.log("UDATEANDO");
    comment.content = this.commentForm.get("content").value;
    await this.commentService.updateComment(comment);
    this.router.navigate(['blog/entry/', JSON.stringify(comment.blogId)]);
  }

  get isActive(){
    return this.comment.is_active == 'Y' ? true: false;
  }

  get isInactive(){
    return this.comment.is_active == 'N' ? true: false;
  }

  get isAdmin() {
    if (!this.userLogged) {
      return null;
    }
    return this.userLogged && this.userLogged.role === Role.Admin;
  }

  get isBlogAdmin() {
    if (!this.userLogged) {
      return null;
    }
    // console.log('isBlogAdmin'+( this.userLogged && this.userLogged.role === Role.BlogAdmin))
    return this.userLogged && this.userLogged.role === Role.BlogAdmin;
  }

  get isUser() {

    if (!this.userLogged) {
      return null;
    }
    // console.log('isUser'+( this.userLogged && this.userLogged.role === Role.User))
    return this.userLogged && this.userLogged.role === Role.User;
  }

  get isLogged() {
    // console.log('isLogged'+( this.userLogged))    
    return this.userLogged ? true : false;
  }

  get isCommentOwner() {

    if (!this.userLogged) {
      return null;
    }
    console.log("ES OWNER??");    
    console.log(this.userLogged.id)
    console.log(this.comment.user_create)
    console.log(this.userLogged && this.userLogged.id == this.comment.user_create);
    
    const e = document.getElementById("content");
    if(this.userLogged && this.userLogged.id == this.comment.user_create){
      e["disabled"] = false;

    }else{
      e["disabled"] = true;
    }
    
    return this.userLogged && this.userLogged.id == this.comment.user_create;
  }


}
