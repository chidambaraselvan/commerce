import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule,MatMenuModule,MatButtonModule,MatCardModule, MatInputModule,MatSidenavModule,MatListModule,MatIconModule,MatBadgeModule,MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './backend/header/header.component';
import { LoginComponent } from './backend/login/login.component';
import { SignupComponent } from './backend/signup/signup.component';
import { HomeComponent } from './backend/home/home.component';
import { SidebarComponent } from './backend/sidebar/sidebar.component';
import { ProductComponent } from './backend/product/product.component';
import { ProductdialogComponent } from './backend/product/productdialog/productdialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    SidebarComponent,
    ProductComponent,
    ProductdialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatBadgeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  entryComponents: [
    ProductdialogComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, direction: 'ltr'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
