//import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';

//import { AppRoutingModule } from './app-routing-module';
//import { App } from './app';
//import { Products } from './pages/products/products';

//@NgModule({
//  declarations: [
//    App,
//    Products
//  ],
//  imports: [
//    BrowserModule,
//    AppRoutingModule
//  ],
//  providers: [
//    provideBrowserGlobalErrorListeners()
//  ],
//  bootstrap: [App]
//})
//export class AppModule { }

import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Products } from './pages/products/products';
import { Home } from './pages/home/home';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    App,
    Products,
    Home
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }


