import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import { HomeComponent , SettingsComponent ,DashboardComponent } from './pages/index';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard],
        children: [
        { path: 'Home',  component : DashboardComponent, canActivate: [AuthGuard] },
        { path: 'settings',  component : SettingsComponent , canActivate: [AuthGuard]},

        ]
    },
    { path: 'Login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: 'Login' }
];

export const routing = RouterModule.forRoot(appRoutes);