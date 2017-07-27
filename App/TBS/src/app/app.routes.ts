import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, LoginComponent, RegisterComponent, ManageSkillsComponent, SearchComponent, ReportsComponent, UsersComponent, ClientsComponent, ProjectsComponent, RolesComponent, TeamComponent, SkillsComponent } from './components/index';
import { AuthGuard } from './_guards/index';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'manage-skills', component: ManageSkillsComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'roles', component: RolesComponent, canActivate: [AuthGuard] },
  { path: 'team', component: TeamComponent, canActivate: [AuthGuard] },
  { path: 'skills', component: SkillsComponent, canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
