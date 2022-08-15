import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { BuscarrecetaService } from 'src/app/services/buscarreceta.service';

@Component({
  selector: 'app-plato-detalle',
  templateUrl: './plato-detalle.component.html',
  styleUrls: ['./plato-detalle.component.css']
})
export class PlatoDetalleComponent implements OnInit {
  plato:any={}
  mostrar:boolean=false;
  obj:boolean=false;
  loading:boolean=false;
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
    this.loading=true
    this.receta.getInformationReceta(id)
    .pipe(finalize(()=>{
      this.obj= Object.entries(this.plato).length === 0;
      this.loading=false;
    }))
    .subscribe({
      next:(data:any)=>{
        if(data.length>0){   
        this.plato=data[0]; 
        this.mostrar=true;
         console.log(data)
        }else{
          this.obj=true;
        }
      },
      error:(err:any)=>{  console.log(err.error.message) }
    })
  }

}
