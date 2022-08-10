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
  apykey:string='8a0b99c7da0c4d1dadfa51797ad3b73e';

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
      if(this.id.length>0){
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
        }else{
          this.loading=false
        }
        
      }
    ))
    .subscribe({
      next: (data:any)=>{
        if(data.results.length>=2){
       (data.results.forEach((element:any) => {this.id.push(element.id)}));
        }else if(data.results.length<=2){
          this.resultado=true;
          this.receta=[]
          this.id=[]
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