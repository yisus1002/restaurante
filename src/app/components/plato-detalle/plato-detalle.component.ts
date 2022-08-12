import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuscarrecetaService } from 'src/app/services/buscarreceta.service';

@Component({
  selector: 'app-plato-detalle',
  templateUrl: './plato-detalle.component.html',
  styleUrls: ['./plato-detalle.component.css']
})
export class PlatoDetalleComponent implements OnInit {
  plato:any={}
  constructor(private activateRoute:ActivatedRoute,
              private receta:BuscarrecetaService) { 
                this.activateRoute.params.subscribe((params:any)=>{
                  console.log(parseInt(params['id']))
                  this.getPlato(params['id']);
                  console.log(this.plato)
                })
               }

  ngOnInit(): void {
    
  }
  public getPlato(id:any){
    this.receta.getInformationReceta(id)
    .subscribe({
      next:(data:any)=>{this.plato=data[0]; console.log(this.plato)},
      error:(err:any)=>{  console.log(err.error.message) }
    })
  }

}
