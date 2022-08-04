import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loguin',
  templateUrl: './loguin.component.html',
  styleUrls: ['./loguin.component.css']
})
export class LoguinComponent implements OnInit {
  mostrar:boolean=false;
  tipo:any='password'
  constructor() { }

  ngOnInit(): void {
  }

  ver(){
    if(this.mostrar==false){
      this.tipo='text'
      this.mostrar=true;
    }else if(this.mostrar==true){
      this.tipo='password'
      this.mostrar=false;
    }
  }

}
