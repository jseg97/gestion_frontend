import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { BasicelementsComponent } from './basicelements/basicelements.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TypographyComponent } from './typography/typography.component';
import { NucleoiconsComponent } from './nucleoicons/nucleoicons.component';
import { ComponentsComponent } from './components.component';
import { NotificationComponent } from './notification/notification.component';
import { NgbdModalBasic } from './modal/modal.component';
import { HomeComponent } from './home';
import { AdminComponent, } from './admin';
import { LoginComponent, } from './login';
import { BlogComponent, } from './blog/blog.component';
import { UsersComponent, } from './users/users.component';
import { BlogFormComponent, } from './blog-form/blog-form.component';
import { CommentComponent, } from './comment/comment.component';
import { UserFormComponent, } from './user-form/user-form.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PublicBlogComponent } from './public-blog/public-blog.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { BlogEntryComponent } from './blog-entry/blog-entry.component';
import { ContactoComponent } from './contacto/contacto.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        RouterModule,
        JwBootstrapSwitchNg2Module
      ],
    declarations: [
        ComponentsComponent,
        BasicelementsComponent,
        NavigationComponent,
        TypographyComponent,
        NucleoiconsComponent,
        NotificationComponent,
        NgbdModalBasic,        
        AdminComponent,
        LoginComponent,
        BlogComponent,
        UsersComponent,
        BlogFormComponent,
        CommentComponent,
        UserFormComponent,
        HomeComponent,
        PublicBlogComponent,
        OurServicesComponent,
        AboutUsComponent,
        BlogEntryComponent,
        ContactoComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        DatePipe,

        // provider used to create fake backend
        // fakeBackendProvider
    ]
})
export class ComponentsModule { }
