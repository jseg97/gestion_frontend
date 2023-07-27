import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '@app/components/_models/blog';
import { BlogService } from '@app/components/_services/blog.service';
import * as Rellax from 'rellax';
import { User, Role } from '../_models';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent implements OnInit, OnDestroy {
  blogForm: FormGroup;
  blog: Blog;
  userLogged: User;
  editing: boolean = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private blogService: BlogService) { }

  ngOnInit() {
    this.userLogged = JSON.parse(localStorage.getItem('user')).id;
    var rellaxHeader = new Rellax('.rellax-header');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('blog-form');

    // this.route.params.subscribe(params => {
    //   this.blog = JSON.parse(params['blog']);
    //   console.log(this.blog);
    //   // Perform any additional actions with the received data

    // });

    this.blogForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
    });

    if (localStorage.getItem("blogUpdate")) {
      this.editing = true;
      this.blog = JSON.parse(localStorage.getItem("blogUpdate"));
      console.log(this.blog);
      localStorage.removeItem("blogUpdate");
      this.patchForm(this.blog);
    }

    // this.patchForm(this.blog);
  }

  onSubmit() {
    if (this.blogForm.valid) {
      // Perform your desired action with the submitted blog post data
      // console.log(this.blogForm.value);
      // this.updateBlog();
      // this.createBlog();

    }
  }

  async updateBlog() {
    this.blog = await this.blogService.updateBlog(this.blogForm.value);
    console.log(this.blog)
  }

  async createBlog() {
    this.blog = await this.blogService.createBlog(this.blogForm.value);

    console.log(this.blog)
  }

  patchForm(object: Blog) {
    this.blogForm.patchValue(object);
  }

  ngOnDestroy() {
    // var navbar = document.getElementsByTagName('nav')[0];
    // navbar.classList.remove('navbar-transparent');
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('blog-form');
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

}
