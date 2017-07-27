import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//---------------- Routes ----------------//
import { APP_ROUTING } from './app.routes';

//---------------- Services ----------------//
import { AlertService, AuthenticationService, UserService, SkillService, ProjectService } from './_services/index';

//---------------- Components ----------------//
// App
import { AppComponent } from './app.component';
import { DatePickerModule } from 'ng2-datepicker';

// Sections
import { NavbarComponent, ManageSkillsComponent, AlertComponent, HomeComponent, LoginComponent, RegisterComponent, SearchComponent, ReportsComponent, UsersComponent, ClientsComponent, ProjectsComponent, RolesComponent, TeamComponent, SkillsComponent } from './components/index';

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
    TeamComponent,
    SkillsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    APP_ROUTING,
    DatePickerModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    SkillService,
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
