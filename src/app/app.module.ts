import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { GeneralComponent } from './general/general.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { ClavierComponent } from './clavier/clavier.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
    declarations: [AppComponent, AuthComponent, GeneralComponent, ListProductsComponent, ClavierComponent, NavComponent],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
