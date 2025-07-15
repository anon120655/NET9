import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './pages/auth/login/login';
import { FrontLayout } from './layouts/front-layout/front-layout';
import { BackofficeLayout } from './layouts/backoffice-layout/backoffice-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';

import { Home as FrontHome } from './pages/front/home/home';
import { About } from './pages/front/about/about';

import { Home as BackofficeHome } from './pages/backoffice/home/home';
import { Products } from './pages/backoffice/products/products';
import { ProductForm } from './pages/backoffice/products/product-form/product-form';

const routes: Routes = [
  {
    path: '',
    component: FrontLayout,
    children: [
      { path: '', component: FrontHome },
      { path: 'about', component: About }
    ]
  },
  {
    path: 'backoffice',
    component: BackofficeLayout,
    children: [
      { path: '', component: BackofficeHome },
      {
        path: 'products',
        children: [
          { path: '', component: Products },
          { path: 'create', component: ProductForm },
          { path: 'update/:id', component: ProductForm }
        ]
      }
    ]
  },
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'login', component: Login }
    ]
  },
  { path: '**', redirectTo: '' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
