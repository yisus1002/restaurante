import { Routes } from '@angular/router'; 
import { HomeComponent } from './components/home/home.component';
import { LoguinComponent } from './components/loguin/loguin.component';
import { 
    AuthGuardService as AuthGuard
} from './services/auth-guard.service';


export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
    { path: 'login', component: LoguinComponent },
    // { path: 'search', component: SearchComponent }, 
    // { path: 'artist/:id', component: ArtistaComponent }, 
    { path: '', pathMatch :'full', redirectTo: 'home'}, 
    { path: '**', pathMatch :'full', redirectTo: 'home'}, 
];
