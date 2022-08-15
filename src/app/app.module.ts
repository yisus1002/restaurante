import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoguinComponent } from './components/loguin/loguin.component';

import {  RouterModule } from '@angular/router';
//Haccer peticiones 
import { HttpClientModule } from '@angular/common/http';

// para trabajar con formularios
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms"; // <---

//Pagination module
import { NgxPaginationModule } from 'ngx-pagination';

//Importar rutas
import { ROUTES } from './app.routes';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PlatoComponent } from './components/plato/plato.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { JwtModule } from '@auth0/angular-jwt';
import { PlatoDetalleComponent } from './components/plato-detalle/plato-detalle.component';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoguinComponent,
    NavbarComponent,
    PlatoComponent,
    AvatarComponent,
    PlatoDetalleComponent,
    SanitizeHtmlPipe, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        // ...
        tokenGetter: () => {
          return localStorage.getItem("token");
        },
      },
    }),
    NgxPaginationModule ,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
