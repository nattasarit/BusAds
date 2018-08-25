import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { DbconnectorService } from './services/dbconnector.service';
import { AppService } from './services/app.service';
import { DrawService } from './services/draw.service';
import { HttpModule } from '@angular/http';
import { MatCardModule } from '@angular/material/card';
import { UICarouselModule } from 'ui-carousel';
import { UploadSelectorComponent } from './core/upload-selector/upload-selector.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

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
    LoginComponent,
    UploadSelectorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    [RouterModule.forRoot(APP_ROUTES)],
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyB1vDNAIH-fNnhgEW3oREtL-eGdW5PGQHw",
      authDomain: "busads-ab252.firebaseapp.com",
      databaseURL: "https://busads-ab252.firebaseio.com",
      projectId: "busads-ab252",
      storageBucket: "busads-ab252.appspot.com",
      messagingSenderId: "485053449120"
    }),
    AngularFireStorageModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    HttpModule,
    MatCardModule,
    UICarouselModule,
    MatDialogModule,
    MatExpansionModule,
    FormsModule, 
    ReactiveFormsModule,
    MatSelectModule
  ],
  exports: [RouterModule],
  providers: [DbconnectorService, AppService, DrawService],
  bootstrap: [AppComponent]
})
export class AppModule { }
