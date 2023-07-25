import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, Role } from '@app/components/_models';
import { AuthenticationService, UserService } from '@app/components/_services';
import * as Rellax from 'rellax';
import { PassThrough } from 'stream';

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
      is_active: [''],
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirmation: ['', [Validators.required, Validators.minLength(8)]],
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
  

  samePassword(){
    let p1 = this.userForm.get("password");
    let p2 = this.userForm.get("passwordConfirmation")

    // console.log(p1.value);
    //   console.log(p2.value);
    if(p1.value === p2.value){     
      return true
    }else{
      p1.reset();
      p2.reset();
      return false;
    } 
  }

  async updateUser() {
    this.userUpdate = await this.userService.updateUser(this.userForm.value);
    this.router.navigate(['users']);
  }

  async createUser() {
    let created;
    if(this.samePassword()){
      console.log("ok")
      // alert("Contraseñas coinciden")
      // created = await this.userService.createUser(this.userForm.value);
      created = await this.userService.createUser(this.userForm.value);
      this.router.navigate(['users']);      
    }else{
      console.log("error")
      alert("Contraseñas no coinciden")
    }
    // created = await this.userService.createUser(this.userForm.value);
    

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
