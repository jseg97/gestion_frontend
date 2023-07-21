import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Role, User } from '@app/components/_models';
import { UserService } from '@app/components/_services';
import { first } from 'rxjs/internal/operators/first';

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
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }

  getUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });
  }

  onSubmit() {
  }

  edit(user: User): void {
    localStorage.setItem('userUpdate', JSON.stringify(user));
    this.router.navigate(['users/form', user]);    
  }

  ngOnDestroy() {
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
    // var body = document.getElementsByTagName('body')[0];
    // body.classList.remove('index-page');
  }

  newUser() {
    console.log("nu");    
    this.router.navigate(['users/form', JSON.stringify({})]);
  }
}
