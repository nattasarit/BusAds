import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef, ComponentFactoryResolver } from '@angular/core';
import 'rxjs/add/observable/of';
import { map } from 'rxjs/operators';
// import * as fabric from '../../../../node_modules/fabric';
// const Fabric: any = fabric;
// import { Stage, Shape } from '@createjs/easeljs';
import { AppService } from '../../services/app.service';
import { CanvasPanelComponent } from '../canvas-panel/canvas-panel.component';
import { UploadPanelComponent } from '../upload-panel/upload-panel.component';


@Component({
  selector: 'app-design-page',
  templateUrl: './design-page.component.html',
  styleUrls: ['./design-page.component.css']
})
export class DesignPageComponent implements OnInit {

  constructor(public appService: AppService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) { }

  @ViewChild('mainDesignPageContainer') private mainDesignPageContainer: ElementRef;

  componentCanvasPanelFactory = null;
  componenUploadPanelFactory = null;
  private currentComponentRef = null;

  ngOnInit() {

  }

  onMenuIsClicked(response) {
    console.log('onMenuIsClicked=', response);
    if (response === 'upload') {
      if (this.componenUploadPanelFactory === null) {
        this.componenUploadPanelFactory = this.componentFactoryResolver.resolveComponentFactory(UploadPanelComponent);
      }
      this.initComponent(this.componenUploadPanelFactory);
    } else if (response === 'canvas') {
      if (this.componentCanvasPanelFactory === null) {
        this.componentCanvasPanelFactory = this.componentFactoryResolver.resolveComponentFactory(CanvasPanelComponent);
      }
      this.initComponent(this.componentCanvasPanelFactory);
    } else {
      console.log('s');
    }
  }

  initComponent(compo: any) {
    console.log('this.currentComponentRef=', this.currentComponentRef);
    console.log('this.mainDesignPageContainer=', this.mainDesignPageContainer);
    // this.mainDesignPageContainer.nativeElement.removeChild(this.currentComponentRef.location.nativeElement);
    for (const element of this.mainDesignPageContainer.nativeElement.children) {
      this.mainDesignPageContainer.nativeElement.removeChild(element);
    }
    this.currentComponentRef = this.viewContainerRef.createComponent(compo);
    this.mainDesignPageContainer.nativeElement.appendChild(this.currentComponentRef.location.nativeElement);


    // componentRef.instance.title = title || '';
    // componentRef.instance.content = content;
    // componentRef.instance.componentRef = componentRef;
  }


}
