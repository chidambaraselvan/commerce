import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule,MatMenuModule,MatButtonModule,MatCardModule, MatInputModule,MatSidenavModule,MatListModule,MatIconModule,MatBadgeModule,MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS, MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatProgressSpinnerModule, MatSelectModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './backend/header/header.component';
import { LoginComponent } from './backend/login/login.component';
import { SignupComponent } from './backend/signup/signup.component';
import { HomeComponent } from './backend/home/home.component';
import { SidebarComponent } from './backend/sidebar/sidebar.component';
import { ProductComponent } from './backend/product/product.component';
import { ProductdialogComponent } from './backend/product/productdialog/productdialog.component';
import { UserComponent } from './backend/user/user.component';
import { UserDetailComponent } from './backend/user/user-detail/user-detail.component';
import { UserEditComponent } from './backend/user/user-edit/user-edit.component';
import { UserAddComponent } from './backend/user/user-add/user-add.component';
import { ShopComponent } from './frontend/shop/shop.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    SidebarComponent,
    ProductComponent,
    ProductdialogComponent,
    UserComponent,
    UserDetailComponent,
    UserEditComponent,
    UserAddComponent,
    ShopComponent
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
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ],
  entryComponents: [
    ProductdialogComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, direction: 'ltr'}},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 1500,panelClass: ['blue-snackbar'],horizontalPosition:"right",verticalPosition:'bottom'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
