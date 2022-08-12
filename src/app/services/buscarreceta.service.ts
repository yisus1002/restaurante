import { finalize, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class BuscarrecetaService {
  receta:any[]=[];
  menu:any[]=[];
  loading:boolean=false;
  resultado:boolean=false;
  id:any[]=[];
  api:string='https://api.spoonacular.com/recipes/';
  apykey:string='2ffb93eb9d1f4806ab91ae151b9a644d';

  constructor(public http: HttpClient) {
    this.obtenermenu();
   }

  public getRecetas(termino:string, ){
    const url =`${this.api}complexSearch?query=${termino}&apiKey=${this.apykey}`;
    
    return this.http.get(url).pipe(map((data:any)=> data));
  };
  public getInformationReceta(ids:any){
    const url = `${this.api}informationBulk?ids=${ids}&apiKey=${this.apykey}`
    return this.http.get(url).pipe(map((data:any)=> data));
  };
  public getPlatoInformacion(id:any){
    const url = `${this.api}${id}/information?apiKey=${this.apykey}`;
    return this.http.get(url).pipe(map((data:any)=> data));
  };

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

  agregar(id:any){
   const eleme= this.receta.filter(receta=>receta['id']===id) 
    const men= this.menu?.filter(menu=>menu['id'] ===id) 
    if(this.menu.length<4){
    if(men[0]?.id===eleme[0].id){
      console.log('El plato ya se encuentra en el menu')
    }else{
      this.menu.push(eleme[0])
      localStorage.setItem('data', JSON.stringify(this.menu))
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: `El plato ${eleme[0].title} se agregó correctamenta`,
        showConfirmButton: false,
        timer: 1500
      })
    }
    }else{
      console.log('El menu ya se encuentra lleno')
    }
  }
  obtenermenu(){
  const data=(localStorage.getItem('data'))
    if(data){
  this.menu=JSON.parse(data!)
    console.log(this.menu)
  }
  }
  eliminar(id:any){
    console.log(id)
    this.menu.splice(id,1)
    localStorage.setItem('data', JSON.stringify(this.menu))
    this.obtenermenu()
    // localStorage.removeItem('data')
  }

}