import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './backend/login/login.component';
import { SignupComponent } from './backend/signup/signup.component';
import { HomeComponent } from './backend/home/home.component';
import { AuthguardService as authGuard } from './shared/guards/authguard.service';
import { ProductComponent } from './backend/product/product.component';
import { UserComponent } from './backend/user/user.component';
import { ShopComponent } from './frontend/shop/shop.component';
import { CartComponent } from './frontend/cart/cart.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: HomeComponent,
    canActivate: [authGuard],
    data: {
      allowedRoles: ['Admin']
    }
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'product', component: ProductComponent,
    canActivate: [authGuard],
    data: {
      allowedRoles: ['Admin']
    }
  },
  {
    path: 'user', component: UserComponent,
    canActivate: [authGuard],
    data: {
      allowedRoles: ['Admin']
    }
  },
  { path: '', component: ShopComponent },
  { path: 'cart', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
