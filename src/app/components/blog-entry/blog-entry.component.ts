import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Rellax from 'rellax';
import { BlogService } from '../_services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { Blog, Comment, Role, User } from '../_models';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../_services/comment.service';
import { DatePipe } from '@angular/common';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ModalErrorComponent } from '../modal-error/modal-error.component';


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
  userLogged:User;
  userId: number;



  constructor(private modalService: NgbModal,private formBuilder: FormBuilder,private blogService : BlogService, private route : ActivatedRoute, private commentService : CommentService, private datePipe: DatePipe) { 
    this.x = this.route.snapshot.paramMap.get('id');
    this.getBlogById(parseInt(this.x))
    this.commentForm = this.formBuilder.group({
      content: '',
    });
    
  }

  ngOnInit() {
    this.userLogged = JSON.parse(localStorage.getItem('user'));
    this.userId = this.userLogged.id;
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
    console.log(this.blog);
    
  }

  async comment(){
    console.log(this.commentForm.get('content').value)
    const response = await this.commentService.createComment(this.commentForm.get('content').value,this.x);
    if (response===null ){
      this.open(ModalErrorComponent, 'modal_mini', 'sm')
      
    }
  }

  async getComments() {
    this.comments = await this.commentService.getFromBlogId(parseInt(this.x));
    console.log(this.comments);
    

    this.comments = this.comments.map(comment => {
      comment.created = this.datePipe.transform(comment.created, 'MMMM dd y')
      return comment;
    });
    console.log(this.comments);
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

  closeResult: string;

  open(content, type, modalDimension) {
      if (modalDimension === 'sm' && type === 'modal_mini') {
          this.modalService.open(content, { windowClass: 'modal-mini modal-primary', size: 'sm' }).result.then((result) => {
              this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
      } else if (modalDimension == undefined && type === 'Login') {
        this.modalService.open(content, { windowClass: 'modal-login modal-primary' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      } else {
          this.modalService.open(content).result.then((result) => {
              this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
      }

  }

  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return  `with: ${reason}`;
      }
  }

}
