import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { LandingComponent } from './examples/landing/landing.component';
import { LoginComponent } from '@app/components/login/login.component';
import { Login2Component } from './examples/login/login2.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { AuthGuard } from './components/_helpers';
import { Role } from './components/_models';
import { AdminComponent } from './components/admin';
import { BlogComponent } from './components/blog';
import { BlogFormComponent } from './components/blog-form/blog-form.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { CommentComponent } from './components/comment/comment.component';
import { HomeComponent } from './components/home';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersComponent } from './components/users/users.component';
import { PublicBlogComponent } from './components/public-blog/public-blog.component';
import { OurServicesComponent } from './components/our-services/our-services.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { BlogEntryComponent } from './components/blog-entry/blog-entry.component';

const routes: Routes =[
    // { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index',                component: ComponentsComponent },
    { path: 'nucleoicons',          component: NucleoiconsComponent },
    { path: 'examples/landing',     component: LandingComponent },
    { path: 'examples/login',       component: Login2Component },
    { path: 'examples/profile',     component: ProfileComponent },
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'blog/entry/:id',
        component: BlogEntryComponent,
    },
    {
        path: 'blogs',
        component: PublicBlogComponent,
    },
    {
        path: 'nosotros',
        component: AboutUsComponent,
    },
    {
        path: 'servicios',
        component: OurServicesComponent,
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    
    {
        path: 'manage/blogs',
        component: BlogComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.BlogAdmin] }
    },
    {
        path: 'manage/blogs/form/:blog',
        component: BlogFormComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.BlogAdmin] }
    },
    {
        path: 'manage/comments/:blog',
        component: CommentComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.BlogAdmin] }
    },
    {
        path: 'manage/comments/form/:comment',
        component: CommentFormComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.BlogAdmin] }
    },
    {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'users/form/:user',
        component: UserFormComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
})
export class AppRoutingModule { }
