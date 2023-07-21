import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '@app/components/_models/blog';
import { BlogService } from '@app/components/_services/blog.service';
import { title } from 'process';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent implements OnInit, OnDestroy {
  blogForm: FormGroup;
  blog : Blog;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private blogService : BlogService, private router : ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.blog = JSON.parse(params['blog']);
      console.log(this.blog);
      // Perform any additional actions with the received data

      var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    });

    this.blogForm = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
    });

    this.patchForm(this.blog);
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

  patchForm(object:Blog){
    this.blogForm.patchValue(object);
  }
  ngOnDestroy(){
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
    // var body = document.getElementsByTagName('body')[0];
    // body.classList.remove('index-page');
}
}
