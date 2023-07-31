import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService, UserService } from '@app/components/_services';
import { User } from '../_models/user';

@Component({ templateUrl: 'login.component.html', styleUrls: ['./login.component.css'] })
export class LoginComponent implements OnInit {
    u : User;
    loginForm: FormGroup;
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    data: Date = new Date();
    focus;
    focus1;
    focus2;
    focus3;
    focus4;
    focus5;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.userValue) {
            this.authenticationService.user.subscribe(x => this.u = x);
            localStorage.setItem('userUpdate', JSON.stringify(this.u));
            this.router.navigate(['users/form']); 
            // this.router.navigate(['/admin']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            passwordConfirmation: ['', [Validators.required, Validators.minLength(8)]]
        });


        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.error = '';
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            this.error = "Datos inválidos";
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });

    }

    async createUser() {
        this.submitted = true;
        this.error = '';
        if (this.samePassword()) {

            if (this.registerForm.invalid) {
                this.error = "Datos inválidos";
                return;
            }
            
            this.userService.createPublicUser(this.registerForm.value).then(res => {
                if (res['success']) {
                    alert(res['message']);
                    location.reload();
                } else {
                    alert(res['message']);
                }
            });
        } else {
            console.log("error")
            alert("Contraseñas no coinciden")
        }
    }

    samePassword() {
        let p1 = this.registerForm.get("password");
        let p2 = this.registerForm.get("passwordConfirmation")

        // console.log(p1.value);
        //   console.log(p2.value);
        if (p1.value === p2.value) {
            return true
        } else {
            p1.reset();
            p2.reset();
            this.error = "Contraseñas no coinciden";
            return false;
        }
    }

    showRegisterForm() {
        document.getElementById("registerForm").style.display = "block";
        document.getElementById("loginForm").style.display = "none";
    }

    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }
}
