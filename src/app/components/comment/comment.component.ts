import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '@app/components/_models/blog';
import { CommentService } from '@app/components/_services/comment.service';
import { Comment } from '@app/components/_models';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  comments : Comment[] = [];
  blog : Blog;
  constructor(private commentService : CommentService, private router: Router, private actRoute : ActivatedRoute) { }

  ngOnInit(): void {
    

    this.getComments();
  }

  onSubmit(): void {
    var comment = this.comments[1];

     console.log(comment);
    // console.log("ID ->" + id);
    this.router.navigate(['manage/comments/form/', JSON.stringify(comment)]);
  }

  async getComments() {
    this.comments = await this.commentService.getAll();
    this.actRoute.params.subscribe(params => {
      this.blog = JSON.parse(params['blog']);
      console.log("ID LLEGO A FORM->"+JSON.stringify(this.blog));
      // Perform any additional actions with the received data
    });
    this.comments = this.comments.filter((c)=>{
      return c.blogId === this.blog.id;
    });
    console.log(this.comments)
  }

  async edit(comment : Comment) {
    this.router.navigate(['manage/comments/form/', JSON.stringify(comment)]);
  }
  
}
