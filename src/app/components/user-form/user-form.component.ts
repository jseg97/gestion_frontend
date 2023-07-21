import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/components/_models';
import { UserService } from '@app/components/_services';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy {
  user : User;
  userForm : FormGroup;
  constructor(private userService : UserService, private route: ActivatedRoute, private formBuilder : FormBuilder, private router : Router ) { 
    if(localStorage.getItem("userUpdate")){
      this.user = JSON.parse(localStorage.getItem("userUpdate"));
      console.log(this.user);
      localStorage.removeItem("userUpdate");     
    }

    this.userForm = this.formBuilder.group({
      id: 'This is a hidden',
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      role: ['', Validators.required]
    });

    

    
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {         
      // Perform any additional actions with the received data

      var navbar = document.getElementsByTagName('nav')[0];
      navbar.classList.add('navbar-transparent');
    });
    this.patchForm();
  }

  

  onSubmit(){    
  }

  async updateUser(){    
    this.user = await this.userService.updateUser(this.userForm.value);
    this.router.navigate(['users']);
  }

  async createUser(){
    let created;
    created = await this.userService.createUser(this.userForm.value);
    setTimeout(() => {
      this.router.navigate(['users']);
    }, 1000);
    
  }

  patchForm() {
    this.userForm.patchValue(this.user);
  }

  ngOnDestroy(){
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
    // var body = document.getElementsByTagName('body')[0];
    // body.classList.remove('index-page');
}

}
