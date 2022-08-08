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

  constructor(public http: HttpClient) {
    // this.obtener()
   }

  getRecetas(termino:string, ){
    const url =`https://api.spoonacular.com/recipes/complexSearch?query=${termino}&apiKey=8a0b99c7da0c4d1dadfa51797ad3b73e`;
    
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
        if(data.results.length>=2){
        this.receta=data.results;
        this.loading=false;
        console.log(data.results)
        console.log(this.receta)
        }
      },
      error:(err)=> {
        this.loading=false;
        console.warn(err)
      },
    })
  }
}
