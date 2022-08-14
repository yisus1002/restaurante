import { Router } from '@angular/router';
import { BuscarrecetaService } from './../../services/buscarreceta.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  angForm!: FormGroup;
  // items:any= [];
  precio:any=0;
  healtScore:number=0;
  tiempo:number=0;
  
  constructor(public bus:BuscarrecetaService,
              private fb: FormBuilder,
              private router:Router) { 
      this.crearform()
    } 
  ngOnInit(): void {

  }
  ngDoCheck(): void {
    let pre = this.bus.menu.map(ele=>ele.pricePerServing);
    let hs  = this.bus.menu.map(ele=>ele.healthScore);
    let tm  = this.bus.menu.map(ele=>ele.readyInMinutes);
    this.precio=pre.reduce((a,b)=>a+b,0);
    this.healtScore=hs.reduce((a,b)=>a+b,0)/this.bus.menu.length;
    this.tiempo=tm.reduce((a,b)=>a+b,0)/this.bus.menu.length;
  }
  buscar(termino:string){
    if(this.angForm.valid){
      this.bus.obtener(termino) 
      console.log(termino)
    }
  }

  crearform(){
    this.angForm = this.fb.group({
      text: ["",[ Validators.required]], 
    });
  }
  limpiar(){
    this.angForm.reset();
    this.bus.receta=[]
  }

  verPlato(id:any){
    this.router.navigate(['/plato-detalle',id])
    console.log(id)
  }

}
