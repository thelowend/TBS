import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ManageSkillsComponent } from './components/manage-skills/manage-skills.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'manage-skills', component: ManageSkillsComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
