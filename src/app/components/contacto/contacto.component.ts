import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Rellax from 'rellax';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit, OnDestroy {
  data : Date = new Date();
  focus;
  focus1;

  constructor() { }

  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('contacto-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }
  
  ngOnDestroy(){
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('contacto-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

}
