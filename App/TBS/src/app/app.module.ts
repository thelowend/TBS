import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//---------------- Routes ----------------//
import { APP_ROUTING } from './app.routes';

//---------------- Services ----------------//
import { AlertService, AuthenticationService, UserService } from './_services/index';

//---------------- Components ----------------//
// App
import { AppComponent } from './app.component';

// Sections
import { NavbarComponent, ManageSkillsComponent, AlertComponent, HomeComponent, LoginComponent, RegisterComponent } from './components/index';

// Guards
import { AuthGuard } from './_guards/index';

// Backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    ManageSkillsComponent,
    AlertComponent
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

    // providers used to create fake backend
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
