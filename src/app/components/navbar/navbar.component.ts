import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentRoute?:string;
  ruta:string='';

  constructor(public auth: AuthService,
    public router: Router) { }

  ngOnInit(): void {
  }
  verificarRuta(){
    this.router.events.subscribe((event: Event) => {
            
      if (event instanceof NavigationEnd) {
          this.currentRoute = event.url.substring(0,15);
          this.ruta=event.url
            console.log(event.url.substring(0,15));

      }
      // console.log(this.currentRoute)
  });
  }
  ngDoCheck(): void {

    this.verificarRuta();
  }
}
