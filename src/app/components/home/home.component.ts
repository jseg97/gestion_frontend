import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/components/_models';
import { UserService, AuthenticationService } from '@app/components/_services';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import {  OnInit, Renderer2, OnDestroy } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as Rellax from 'rellax';

@Component({ templateUrl: 'home.component.html', styleUrls: ['./home.component.css'] })
export class HomeComponent implements OnInit, OnDestroy {
    loading = false;
    user: User;
    userFromApi: User;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private renderer : Renderer2, config: NgbAccordionConfig
    ) {
        this.authenticationService.user.subscribe(x => this.user = x);
        // this.user = this.authenticationService.userValue;
        config.closeOthers = true;
        config.type = 'info';
    }

    ngOnInit() {
        this.loading = true;
        // this.userService.getById(this.user.id).pipe(first()).subscribe(user => {
        //     this.loading = false;
        //     this.userFromApi = user;
        // });


        var rellaxHeader = new Rellax('.rellax-header');
        
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('index-page');
    }

    data : Date = new Date();

    page = 4;
    page1 = 5;
    page2 = 3;
    focus;
    focus1;
    focus2;

    date: {year: number, month: number};
    model: NgbDateStruct;

    public isCollapsed = true;
    public isCollapsed1 = true;
    public isCollapsed2 = true;

    state_icon_primary = true;

    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    }

    isDisabled(date: NgbDateStruct, current: {month: number}) {
        return date.month !== current.month;
    }
    
    ngOnDestroy(){
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('index-page');
    }


}

