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
  vegano:any;
  novegano:any
  api:string='https://api.spoonacular.com/recipes/';
  apykey:string='2ffb93eb9d1f4806ab91ae151b9a644d';


  constructor(public http: HttpClient) {
    this.obtenermenu();
    this.verifivarplatos(true,false)
   }

  public getRecetas(termino:string, ){
    const url =`${this.api}complexSearch?query=${termino}&apiKey=${this.apykey}&number=100`;
    
    return this.http.get(url).pipe(map((data:any)=> data));
  };
  public getInformationReceta(ids:any){
    const url = `${this.api}informationBulk?ids=${ids}&apiKey=${this.apykey}&number=100`
    return this.http.get(url).pipe(map((data:any)=> data));
  };
  public getPlatoInformacion(id:any){
    const url = `${this.api}${id}/information?apiKey=${this.apykey}`;
    return this.http.get(url).pipe(map((data:any)=> data));
  };

  obtener(termino:string){
    this.loading=true;
    this.receta=[]
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
              //le.log(data);
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
          this.id=[];
          //.log(data);
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
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'El plato ya se encuentra en el menú',
          showConfirmButton: false,
          timer: 1500
        })
       }else{ 
         let Vegano = this.filtrarTipoPlato(true);
         let NoVegano= this.filtrarTipoPlato(false);
         if(eleme[0].vegan===true && Vegano===0){
           Swal.fire({
             position: 'top-end',
             icon: 'error',
             title: 'No puede agregar mas platos veganos',
             showConfirmButton: false,
             timer: 1500
           })
         }else if(eleme[0].vegan===true && (Vegano===1 || Vegano=== 2)){
           this.guardarLocalStorage(eleme)
           this.verifivarplatos(true,false)
         }else if(eleme[0].vegan===false && NoVegano===0){
           Swal.fire({
             position: 'top-end',
             icon: 'error',
             title: 'No puede agregar mas platos no veganos',
             showConfirmButton: false,
             timer: 1500
           }) 
         }else if(eleme[0].vegan===false && (NoVegano===1 || NoVegano=== 2)){
          this.guardarLocalStorage(eleme)
          this.verifivarplatos(true,false)
         }else{

         }
       }
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'El menu ya  se encuentra lleno',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
  guardarLocalStorage(eleme:any){ 
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
  filtrarTipoPlato(estato:boolean){
    const data= this.menu.map(menu=> menu.vegan).filter(menu=> menu===estato)
    if(data.length===0){
      return 2
    }else if(data.length===1){
      return 1
    }else {
      return 0
    }
  }
  verifivarplatos(tru:boolean, fal:boolean){
    this.vegano= this.filtrarTipoPlato(tru)
    this.novegano= this.filtrarTipoPlato(fal)
  }
  obtenermenu(){ 
    this.verifivarplatos(true,false)
  const data=(localStorage.getItem('data'))
    if(data){
  this.menu=JSON.parse(data!)
    //.log(this.menu)
  }
  

  }
  eliminar(id:any){
    //.log(id)
    this.menu.splice(id,1)
    localStorage.setItem('data', JSON.stringify(this.menu))
    this.obtenermenu()
    // this.verifivarplatos(true,false)
    // localStorage.removeItem('data')
  }

}