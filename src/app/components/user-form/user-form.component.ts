import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '@app/components/_models';
import { UserService } from '@app/components/_services';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user : User;
  userForm : FormGroup;
  constructor(private userService : UserService, private router: ActivatedRoute, private formBuilder : FormBuilder ) { }

  ngOnInit(): void {
    console.log("Todo OK");
    this.router.params.subscribe(params => {
      this.user = JSON.parse(params['user']);
      console.log("Usuario LLEGO A FORM->");
      console.log(this.user);
      // Perform any additional actions with the received data
    });

    this.userForm = this.formBuilder.group({
      id: ['', Validators.required],
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.patchForm();

  }

  

  onSubmit(){
    console.log("Todo OK");
    this.updateUser();
    
  }

  async updateUser(){
    this.user = await this.userService.updateUser();
    console.log(this.user);
  }

  async createUser(){
    this.user = await this.userService.createUser();
    console.log(this.user);
  }

  patchForm() {
    this.userForm.patchValue(this.user);
  }

  
}
