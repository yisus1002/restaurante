import { finalize, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuscarrecetaService {
  receta:any[]=[];
  menu:any[]=[1,2,3,4];
  loading:boolean=false;
  resultado:boolean=false

  constructor(public http: HttpClient) {
    // this.obtener()
   }

  getRecetas(termino:string, ){
    const url =`https://api.spoonacular.com/recipes/complexSearch?query=${termino}&apiKey=2ffb93eb9d1f4806ab91ae151b9a644d`;
    
    return this.http.get(url).pipe(map((data:any)=> data))
  }
  obtener(termino:string){
    this.loading=true;
    this.getRecetas(termino)
    .pipe(finalize(()=>{
      this.loading=false;
    }))
    .subscribe({
      next: (data:any)=>{
        // this.resultado=true;
        if(data.results.length>=2){
        this.receta=data.results;
        this.loading=false;
        this.resultado=false;
        console.log(data.results)
        console.log(this.receta)
        }else if(data.results.length<=2){
          this.resultado=true;
        }
      },
      error:(err)=> {
        this.loading=false;
        this.resultado=false;
        console.warn(err.error.message)
      },
    })
  }
}
