import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//---------------- Routes ----------------//
import { APP_ROUTING } from './app.routes';

//---------------- Services ----------------//
import { AlertService, AuthenticationService, UserService, SkillService } from './_services/index';

//---------------- Components ----------------//
// App
import { AppComponent } from './app.component';

// Sections
import { NavbarComponent, ManageSkillsComponent, AlertComponent, HomeComponent, LoginComponent, RegisterComponent, SearchComponent, ReportsComponent, UsersComponent, ClientsComponent, ProjectsComponent, RolesComponent, TeamComponent } from './components/index';

// Guards
import { AuthGuard } from './_guards/index';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    ManageSkillsComponent,
    AlertComponent,
    SearchComponent,
    ReportsComponent,
    UsersComponent,
    ClientsComponent,
    ProjectsComponent,
    RolesComponent,
    TeamComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    APP_ROUTING
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    SkillService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
