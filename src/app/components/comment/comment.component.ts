import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '@app/components/_models/blog';
import { CommentService } from '@app/components/_services/comment.service';
import { Comment } from '@app/components/_models';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {
  comments : Comment[] = [];
  blog : Blog;
  constructor(private commentService : CommentService, private router: Router, private actRoute : ActivatedRoute) { }

  ngOnInit(): void {
    
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');

    this.getComments();
  }

  onSubmit(): void {
    var comment = this.comments[1];
    this.router.navigate(['manage/comments/form/', JSON.stringify(comment)]);
  }

  async getComments() {
    this.comments = await this.commentService.getAll();
    this.actRoute.params.subscribe(params => {
      this.blog = JSON.parse(params['blog']);
      // Perform any additional actions with the received data
    });
    this.comments = this.comments.filter((c)=>{
      return c.blogId === this.blog.id;
    });
  }

  async edit(comment : Comment) {
    this.router.navigate(['manage/comments/form/', JSON.stringify(comment)]);
  }

  ngOnDestroy(){
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
    // var body = document.getElementsByTagName('body')[0];
    // body.classList.remove('index-page');
}
  
}
