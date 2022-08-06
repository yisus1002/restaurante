import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable, timeInterval } from 'rxjs';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
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
  estado:boolean=false

  constructor(private http: HttpClient,
    public jwtHelper: JwtHelperService,
    public router: Router,
    
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
    this.estado=true;
    if(this.credential['password']===""|| this.credential['email']===""){
      alert('campos vacios')
    }else{
      console.log(this.credential)
      this.postauth().subscribe({
        
        next: (response)=>{
          console.log(response)
          this.estado=false
          localStorage.setItem('token', JSON.stringify(response.token));
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Successful login!',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen:()=>{
              Swal.showLoading();
            }
          })
          setTimeout(()=>{
            this.router.navigate(['home'])
          },1500)
        },
        error: (error)=>{
          this.estado=false
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
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token!);
  }

}

