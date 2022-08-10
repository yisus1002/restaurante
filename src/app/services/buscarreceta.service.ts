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
  resultado:boolean=false;
  id:any[]=[];
  api:string='https://api.spoonacular.com/recipes/';
  apykey:string='2ffb93eb9d1f4806ab91ae151b9a644d';

  constructor(public http: HttpClient) {
    // this.obtener()
   }

  getRecetas(termino:string, ){
    const url =`${this.api}complexSearch?query=${termino}&apiKey=${this.apykey}`;
    
    return this.http.get(url).pipe(map((data:any)=> data))
  };
  getInformationReceta(ids:any){
    const url = `${this.api}informationBulk?ids=${ids}&apiKey=${this.apykey}`
    return this.http.get(url).pipe(map((data:any)=> data))
  }
  obtener(termino:string){
    this.loading=true;
    this.getRecetas(termino)
    .pipe(finalize(()=>{
      this.getInformationReceta(this.id.toString())
      .pipe(finalize(()=>{
        this.loading=false;
      }))
      .subscribe({
        next: (data:any)=> {
          this.receta=data;
          console.log(data);
          this.loading=false;
          this.resultado=false;
        },
        error: (err)=>{
          console.warn(err.error.message)
        }
      })
    }))
    .subscribe({
      next: (data:any)=>{
        if(data.results.length>=2){
       (data.results.forEach((element:any) => {this.id.push(element.id)}));
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