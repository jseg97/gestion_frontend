import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthenticationService } from '@app/components/_services/authentication.service';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '@app/components/_models/user';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Router } from '@angular/router';
import { log } from 'console';
import { Role } from '@app/components/_models/role';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    u : User;


    constructor(public location: Location, private element: ElementRef, private authenticationService: AuthenticationService, private router: Router ) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.authenticationService.user.subscribe(x => this.u = x);
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee === '/documentation') {
            return true;
        }
        else {
            return false;
        }
    }

    logout() {
        // remove user from local storage to log user out
        console.log("Cerrando Sesión");
        this.authenticationService.logout();
        this.router.navigate(['login']);
    }

    get isAdmin() {
        
        // console.log(this.u.role);
        if (!this.u) {
            return null;
        }
        console.log(this.u);
        return this.u && this.u.role === Role.Admin;
    }

    get isBlogAdmin() {
        // console.log(this.u.role);
        if (!this.u) {
            return null;
        }
        console.log(this.u);
        
        return this.u && this.u.role === Role.BlogAdmin;
    }

    get isUser() {
        // console.log(this.u.role);
        
        if (!this.u) {
            return null;
        }
        console.log(this.u);
        return this.u && this.u.role === Role.User;
    }

    get isLogged() {
        return this.u ? true : false;
    }

}
