import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, LoginComponent, RegisterComponent, ManageSkillsComponent } from './components/index';
import { AuthGuard } from './_guards/index';

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'manage-skills', component: ManageSkillsComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
