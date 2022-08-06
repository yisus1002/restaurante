import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-loguin',
  templateUrl: './loguin.component.html',
  styleUrls: ['./loguin.component.css']
})
export class LoguinComponent implements OnInit {
  mostrar:boolean=false;
  tipo:any='password'
  angForm!: FormGroup;
  constructor(public auth:AuthService,
              private fb: FormBuilder) {
                this.createForm();
               }

  ngOnInit(): void {
  }
  createForm() {
    this.angForm = this.fb.group({
      email: ["",[ Validators.required]],
      password: ["", [Validators.required, Validators.minLength(4)]],
    });
    this.angForm.controls["email"].valueChanges.subscribe(data => {
      console.log(data);
    });
  }

  enviar(){
    if (this.angForm.valid) {
      this.auth.credential=this.angForm.value
      console.log(this.angForm.value);
      this.auth.postuser()
    } else {
      alert("Campos invalidos");
    }
  }
  ver(){
    if(this.mostrar==false){
      this.tipo='text'
      this.mostrar=true;
    }else if(this.mostrar==true){
      this.tipo='password'
      this.mostrar=false;
    }
  }
  // evaluar(){
  //   var ta = this.auth.credential['password'];
  //   var letra = ta.replace(/ /g, "");
  //   ta=letra
  
  //  }

}
