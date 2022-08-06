import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api:any='http://challenge-react.alkemy.org/'
  credential:any={
    email:'',
    password:'',
  }

  constructor(private http: HttpClient,
              ) { 
    console.log('Servicio listo')
  }

  public postauth():Observable<any>{
    const formData = new FormData();
    // formData.append()

    formData.append('email', this.credential['email'].toString());
    formData.append('password', this.credential['password'].toString())

    return this.http.post<any>(`${this.api}`,formData).pipe(map((resp: any) => resp));
  }

  public postuser(){
    if(this.credential['password']===""|| this.credential['email']===""){
      alert('campos vacios')
    }else{
      console.log(this.credential)
      this.postauth().subscribe({
        
        next: (response)=>{
          console.log(response)
          
        },
        error: (error)=>{
          Swal.fire({
            title: 'Error!',
            text: 'No se logro acceder',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        }
      }
        )
    }
  }
}

