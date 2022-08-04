import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoguinComponent } from './components/loguin/loguin.component';

import {  RouterModule } from '@angular/router';
//Haccer peticiones 
import { HttpClientModule } from '@angular/common/http';


//Importar rutas
import { ROUTES } from './app.routes';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PlatoComponent } from './components/plato/plato.component';
import { AvatarComponent } from './components/avatar/avatar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoguinComponent,
    NavbarComponent,
    PlatoComponent,
    AvatarComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(ROUTES , {useHash: true}),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
