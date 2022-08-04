import { Routes } from '@angular/router'; 
import { HomeComponent } from './components/home/home.component';
import { LoguinComponent } from './components/loguin/loguin.component';


export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'loguin', component: LoguinComponent },
    // { path: 'search', component: SearchComponent }, 
    // { path: 'artist/:id', component: ArtistaComponent }, 
    { path: '', pathMatch :'full', redirectTo: 'home'}, 
    { path: '**', pathMatch :'full', redirectTo: 'home'}, 
];
