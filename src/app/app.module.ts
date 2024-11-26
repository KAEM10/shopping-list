import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { IonicStorageModule } from '@ionic/storage-angular'; // Importa el módulo de Storage
import { NuevoProductoModalComponent } from './components/nuevo-producto-modal/nuevo-producto-modal.component';
import { NuevoSitioModalComponent } from './components/nuevo-sitio-modal/nuevo-sitio-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NuevoProductoModalComponent,
    NuevoSitioModalComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    IonicStorageModule.forRoot() // Configura Storage aquí
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
