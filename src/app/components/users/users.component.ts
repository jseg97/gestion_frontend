import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Role, User } from '@app/components/_models';
import { UserService } from '@app/components/_services';
import { first } from 'rxjs/internal/operators/first';
import * as Rellax from 'rellax';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {


  constructor(private userService: UserService, private router: Router) { 
    this.getUsers();
  }
  users: User[] = [];

  ngOnInit(): void {
    this.getUsers();
    var rellaxHeader = new Rellax('.rellax-header');


    var body = document.getElementsByTagName('body')[0];
    body.classList.add('users');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  getUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users.map(user=>{
        if(user.is_active == 'Y'){
          user.activo = 'Activo';
        }else{ user.activo = 'Inactivo';}
        return user;
      });
    });    
  }

  onSubmit() {
  }

  edit(user: User): void {
    localStorage.setItem('userUpdate', JSON.stringify(user));
    this.router.navigate(['users/form', user]);    
  }

  async activate(user: User) {
    user.is_active='Y';
    await this.userService.updateStatus(user);
    location.reload();
  }

  async inactivate(user: User) {
    user.is_active='N';
    await this.userService.updateStatus(user);
    location.reload();
  }

  ngOnDestroy() {
    // var navbar = document.getElementsByTagName('nav')[0];
    // navbar.classList.remove('navbar-transparent');
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('users');
  }

  newUser() {   
    this.router.navigate(['users/form', JSON.stringify({})]);
  }
}
