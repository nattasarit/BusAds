import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DbconnectorService } from './services/dbconnector.service';
import { AppService } from './services/app.service';
import { DrawService } from './services/draw.service';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { UICarouselModule } from 'ui-carousel';
import { UploadSelectorComponent } from './core/upload-selector/upload-selector.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MenuComponent } from './components/menu/menu.component';
import { DesignPageComponent } from './components/design-page/design-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { UploadPanelComponent } from './components/upload-panel/upload-panel.component';
import { CanvasPanelComponent } from './components/canvas-panel/canvas-panel.component';
import { MenuSystemComponent } from './components/menu-system/menu-system.component';
import { BusTypePanelComponent } from './components/bus-type-panel/bus-type-panel.component';
import { BusTemplatePanelComponent } from './components/bus-template-panel/bus-template-panel.component';
import { ImageWithPriorityComponent } from './core/image-with-priority/image-with-priority.component';
import { MatRadioModule } from '@angular/material/radio';
import { ProjectPanelComponent } from './components/project-panel/project-panel.component';
import { DisplayTemplatePanelComponent } from './components/display-template-panel/display-template-panel.component';
import { ColorPickerDialogComponent } from './components/color-picker-dialog/color-picker-dialog.component';
import { DisplayZoomDialogComponent } from './components/display-zoom-dialog/display-zoom-dialog.component';
import { MatDatepickerModule, MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';

const APP_ROUTES: Routes = [
  {
    path: 'design',
    component: DesignPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '',
    component: LoginPageComponent
  }
];

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    UploadSelectorComponent,
    MenuComponent,
    DesignPageComponent,
    LoginPageComponent,
    UploadPanelComponent,
    CanvasPanelComponent,
    MenuSystemComponent,
    BusTypePanelComponent,
    BusTemplatePanelComponent,
    ImageWithPriorityComponent,
    ProjectPanelComponent,
    DisplayTemplatePanelComponent,
    ColorPickerDialogComponent,
    DisplayZoomDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    [RouterModule.forRoot(APP_ROUTES)],
    /*
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyB1vDNAIH-fNnhgEW3oREtL-eGdW5PGQHw',
      authDomain: 'busads-ab252.firebaseapp.com',
      databaseURL: 'https://busads-ab252.firebaseio.com',
      projectId: 'busads-ab252',
      storageBucket: 'busads-ab252.appspot.com',
      messagingSenderId: '485053449120'
    }),
    AngularFireStorageModule,
    */
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    HttpModule,
    HttpClientModule,
    JsonpModule,
    HttpClientJsonpModule,
    MatCardModule,
    UICarouselModule,
    MatDialogModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule
  ],
  exports: [RouterModule],
  providers: [DbconnectorService, AppService, DrawService, MatDatepickerModule, 
            { provide: MAT_DATE_LOCALE, useValue: 'it' }, //you can change useValue
            { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
            { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
  bootstrap: [AppComponent],
  entryComponents: [UploadPanelComponent,
    CanvasPanelComponent,
    BusTypePanelComponent,
    BusTemplatePanelComponent,
    ImageWithPriorityComponent,
    ProjectPanelComponent,
    DisplayTemplatePanelComponent,
    ColorPickerDialogComponent,
    DisplayZoomDialogComponent]
})
export class AppModule { }
