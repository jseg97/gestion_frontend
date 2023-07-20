import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role, User } from '@app/components/_models';
import { UserService } from '@app/components/_services';
import { first } from 'rxjs/internal/operators/first';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  

  constructor(private userService : UserService, private router : Router)  { }
  users : User[] = [];

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
      console.log(this.users);
  });
  }

  onSubmit() {
    console.log("Estoy por aqui")
    console.log(this.users[1]);
    
    this.router.navigate(['users/form', JSON.stringify(this.users[1])]);
    
  }

  edit(user : User) : void {
    this.router.navigate(['users/form', JSON.stringify(user)]);
  }

  
}
