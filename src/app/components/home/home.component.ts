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
  
  constructor(public bus:BuscarrecetaService,
    private fb: FormBuilder) { 
      this.crearform()
    } 
  ngOnInit(): void {

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

}
