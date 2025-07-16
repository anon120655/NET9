import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Products } from './pages/backoffice/products/products';
import { Home } from './pages/front/home/home';
import { ServiceWorkerModule } from '@angular/service-worker';
import { Login } from './pages/auth/login/login';
import { FrontLayout } from './layouts/front-layout/front-layout';
import { BackofficeLayout } from './layouts/backoffice-layout/backoffice-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { About } from './pages/front/about/about';
import { ProductForm } from './pages/backoffice/products/product-form/product-form';
//import { SharedModule } from './shared/shared-module';


@NgModule({
  declarations: [
    App,
    Products,
    Home,
    Login,
    FrontLayout,
    BackofficeLayout,
    AuthLayout,
    About,
    ProductForm
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    //SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }


