import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

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
    [RouterModule.forRoot(APP_ROUTES)]
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
