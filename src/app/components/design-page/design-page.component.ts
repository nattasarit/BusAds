import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef, ComponentFactoryResolver } from '@angular/core';
import 'rxjs/add/observable/of';
import { map } from 'rxjs/operators';
// import * as fabric from '../../../../node_modules/fabric';
// const Fabric: any = fabric;
// import { Stage, Shape } from '@createjs/easeljs';
import { AppService } from '../../services/app.service';
import { MenuComponent } from '../menu/menu.component';
import { CanvasPanelComponent } from '../canvas-panel/canvas-panel.component';
import { UploadPanelComponent } from '../upload-panel/upload-panel.component';
import { BusTypePanelComponent } from '../bus-type-panel/bus-type-panel.component';
import { BusTemplatePanelComponent } from '../bus-template-panel/bus-template-panel.component';
import { BusSubtemplatePanelComponent } from '../bus-subtemplate-panel/bus-subtemplate-panel.component';
import { ProjectPanelComponent } from '../project-panel/project-panel.component';
import { DisplayTemplatePanelComponent } from '../display-template-panel/display-template-panel.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-design-page',
  templateUrl: './design-page.component.html',
  styleUrls: ['./design-page.component.css']
})
export class DesignPageComponent implements OnInit {

  constructor(public appService: AppService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    public router: Router) { }

  @ViewChild('mainDesignPageContainer') private mainDesignPageContainer: ElementRef;
  @ViewChild('compMenu') private compMenu: MenuComponent;

  componentCanvasPanelFactory = null;
  componenUploadPanelFactory = null;
  componenBusTypePanelFactory = null;
  componenBusTemplatePanelFactory = null;
  componenBusSubTemplatePanelFactory = null;
  componenProjectPanelFactory = null;
  componenDisplayTemplatePanelFactory = null;
  private currentComponentRef = null;

  ngOnInit() {

  }

  onMenuIsClicked(response) {
    switch (response) {
      case 'project': {
        if (this.componenProjectPanelFactory === null) {
          this.componenProjectPanelFactory = this.componentFactoryResolver.resolveComponentFactory(ProjectPanelComponent);
        }
        this.initComponent(this.componenProjectPanelFactory);
        break;
      }case 'upload': {
        if (this.componenUploadPanelFactory === null) {
          this.componenUploadPanelFactory = this.componentFactoryResolver.resolveComponentFactory(UploadPanelComponent);
        }
        this.initComponent(this.componenUploadPanelFactory);
        break;
      } case 'canvas': {
        if (this.componentCanvasPanelFactory === null) {
          this.componentCanvasPanelFactory = this.componentFactoryResolver.resolveComponentFactory(CanvasPanelComponent);
        }
        this.initComponent(this.componentCanvasPanelFactory);
        break;
      } case 'bus-type': {
        if (this.componenBusTypePanelFactory === null) {
          this.componenBusTypePanelFactory = this.componentFactoryResolver.resolveComponentFactory(BusTypePanelComponent);
        }
        this.initComponent(this.componenBusTypePanelFactory);
        break;
      } case 'bus-template': {
        if (this.componenBusTemplatePanelFactory === null) {
          this.componenBusTemplatePanelFactory = this.componentFactoryResolver.resolveComponentFactory(BusTemplatePanelComponent);
        }
        this.initComponent(this.componenBusTemplatePanelFactory);
        break;
      } case 'bus-subtemplate': {
        if (this.componenBusSubTemplatePanelFactory === null) {
          this.componenBusSubTemplatePanelFactory = this.componentFactoryResolver.resolveComponentFactory(BusSubtemplatePanelComponent);
        }
        this.initComponent(this.componenBusSubTemplatePanelFactory);
        break;
      } case 'display-template': {
        if (this.componenDisplayTemplatePanelFactory === null) {
          this.componenDisplayTemplatePanelFactory = this.componentFactoryResolver.resolveComponentFactory(DisplayTemplatePanelComponent);
        }
        this.initComponent(this.componenDisplayTemplatePanelFactory);
        break;
      }default: {
        console.log('other case');
        break;
      }
      


    }
  }

  onMenuSystemIsClicked(response) {
    switch (response) {
      case 'logout': {
        this.router.navigate(['']);
        break;
      } default: {
        this.compMenu.system = response;
        break;
      }
    }
  }

  initComponent(compo: any) {
    for (const element of this.mainDesignPageContainer.nativeElement.children) {
      this.mainDesignPageContainer.nativeElement.removeChild(element);
    }
    setTimeout(() => {
      this.currentComponentRef = this.viewContainerRef.createComponent(compo);
      this.mainDesignPageContainer.nativeElement.appendChild(this.currentComponentRef.location.nativeElement);
    }, 10);
  }


}
