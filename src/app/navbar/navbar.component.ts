import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    window.onload = function() {
      const navbarimg = <HTMLCanvasElement>document.getElementById('navbarimg');
      const mainsection = document.getElementById('main');
      mainsection.style.marginTop = (navbarimg.height * 1.25) + 'px' ;
      mainsection.style.paddingTop = '10px' ;

      window.onscroll = function() {
        if (window.pageYOffset > 0 && window.innerWidth > 1024) {
          navbarimg.style.width = '25%';
        } else {
          navbarimg.style.width = '100%';
        }
      };
  };

  }

}
