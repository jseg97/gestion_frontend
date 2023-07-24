import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, Role } from '@app/components/_models';
import { AuthenticationService, UserService } from '@app/components/_services';
import * as Rellax from 'rellax';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy {
  userUpdate: User;
  userLogged: User;
  userForm: FormGroup;
  constructor(private userService: UserService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.user.subscribe(user => this.userLogged = user);

    if (localStorage.getItem("userUpdate")) {
      this.userUpdate = JSON.parse(localStorage.getItem("userUpdate"));
      console.log(this.userUpdate);
      localStorage.removeItem("userUpdate");
    }

    this.userForm = this.formBuilder.group({
      id: [''],
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
    console.log(this.userForm.get('email').errors)
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Perform any additional actions with the received data


    });

    var rellaxHeader = new Rellax('.rellax-header');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('user-form');
    this.patchForm();
  }



  onSubmit() {
  }

  async updateUser() {
    this.userUpdate = await this.userService.updateUser(this.userForm.value);
    this.router.navigate(['users']);
  }

  async createUser() {
    let created;
    created = await this.userService.createUser(this.userForm.value);
    setTimeout(() => {
      this.router.navigate(['users']);
    }, 1000);

  }

  patchForm() {
    this.userForm.patchValue(this.userUpdate);
    console.log(this.userForm.get('email').errors)
  }

  ngOnDestroy() {
    // var navbar = document.getElementsByTagName('nav')[0];
    // navbar.classList.remove('navbar-transparent');
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('user-form');
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
