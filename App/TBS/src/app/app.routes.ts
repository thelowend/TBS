import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, LoginComponent, RegisterComponent, ManageSkillsComponent, SearchComponent, ReportsComponent, UsersComponent, ClientsComponent, ProjectsComponent, RolesComponent, TeamComponent } from './components/index';
import { AuthGuard } from './_guards/index';

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'manage-skills', component: ManageSkillsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'team', component: TeamComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
