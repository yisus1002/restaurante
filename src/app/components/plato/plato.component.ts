import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.css']
})
export class PlatoComponent implements OnInit {

  @Input() items: any[]=[];
  
  constructor() { }

  ngOnInit(): void {
  }

}
