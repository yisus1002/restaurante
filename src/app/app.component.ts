import { NavigationEnd, Router, Event } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'Restaurante';
  currentRoute?:string;
  constructor(public router: Router){
    this.verificarRuta();

  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  verificarRuta(){
    this.router.events.subscribe((event: Event) => {
            
      if (event instanceof NavigationEnd) {
          this.currentRoute = event.url;
            // console.log(event);

      }
      // console.log(this.currentRoute)
  });
  }

}
