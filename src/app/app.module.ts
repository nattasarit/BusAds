import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';

const APP_ROUTES: Routes = [
  {
    path: 'canvas',
    component: CanvasComponent
  },
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    [RouterModule.forRoot(APP_ROUTES)],
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyB1vDNAIH-fNnhgEW3oREtL-eGdW5PGQHw",
      authDomain: "busads-ab252.firebaseapp.com",
      databaseURL: "https://busads-ab252.firebaseio.com",
      projectId: "busads-ab252",
      storageBucket: "busads-ab252.appspot.com",
      messagingSenderId: "485053449120"
    }),
    AngularFireStorageModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
