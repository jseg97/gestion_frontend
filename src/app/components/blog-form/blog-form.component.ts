import { Component, OnInit } from '@angular/core';
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
export class BlogFormComponent implements OnInit {
  blogForm: FormGroup;
  blog : Blog;

  constructor(private formBuilder: FormBuilder, private router: ActivatedRoute, private blogService : BlogService) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.blog = JSON.parse(params['blog']);
      console.log("ID LLEGO A FORM->"+this.blog.content);
      // Perform any additional actions with the received data
    });

    // console.log(this.id);

    this.blogForm = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required]
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
    this.blog = await this.blogService.updateBlog();
    console.log(this.blog)
  }

  async createBlog() {
    this.blog = await this.blogService.createBlog();
    console.log(this.blog)
  }

  patchForm(object:Blog){
    this.blogForm.patchValue(object);
  }
}
