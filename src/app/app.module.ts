import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule,MatMenuModule,MatButtonModule,MatCardModule, MatInputModule} from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './backend/header/header.component';
import { LoginComponent } from './backend/login/login.component';
import { SignupComponent } from './backend/signup/signup.component';
import { HomeComponent } from './backend/home/home.component';
import { UserService } from './shared/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
