import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '@app/components/_models';
import { CommentService } from '@app/components/_services/comment.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  commentForm: FormGroup;
  comment : Comment;

  constructor(private formBuilder: FormBuilder, private router: ActivatedRoute, private commentService : CommentService) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.comment = JSON.parse(params['comment']);
      console.log("ID LLEGO A FORM->");
      console.log(this.comment);
      // Perform any additional actions with the received data
    });

    // console.log(this.id);

    this.commentForm = this.formBuilder.group({
      id: ['', Validators.required],
      userId: ['', Validators.required],
      blogId: ['', Validators.required],
      content: ['', Validators.required]
    });

    this.patchForm(this.comment);
  }

  onSubmit() {
    if (this.commentForm.valid) {
      // Perform your desired action with the submitted blog post data
      // console.log(this.commentForm.value);
      this.createComment();
      // this.createComment();
      
    }
  }

  async updateComment() {
    this.comment = await this.commentService.updateComment();
    console.log(this.comment);
  }

  async createComment() {
    this.comment = await this.commentService.createComment();
    console.log(this.comment)
  }

  patchForm(comment : Comment) {
    this.commentForm.patchValue(comment);
  }

  // patchForm(object:Comment){
  //   this.commentForm.patchValue(object);
  // }

}
