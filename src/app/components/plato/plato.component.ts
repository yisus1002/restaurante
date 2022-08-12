import { BuscarrecetaService } from 'src/app/services/buscarreceta.service';
import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.css']
})
export class PlatoComponent implements OnInit {

  @Input() items: any=[];
  @Input() index: any;
  @Input() ps: any;
  @Input() opcionAgregar: boolean=false;
  @Input() opcionEliminar: boolean=true;

  @Output() platoseleccionado:EventEmitter<number>

  constructor(private router:Router,
              public bus:BuscarrecetaService) {
    this.platoseleccionado= new EventEmitter();
   }

  ngOnInit(): void {
  }

  verPlato(){
    this.router.navigate(['/plato-detalle',this.index])
  }
  eliminarPlato(){
    this.bus.eliminar(this.ps)
  }

}
