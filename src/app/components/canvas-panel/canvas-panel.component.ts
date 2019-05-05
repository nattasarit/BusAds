import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { map } from 'rxjs/operators';
import { AppService, ResponseType } from '../../services/app.service';
import { DrawService, HWXY, XY, DrawMode } from '../../services/draw.service';
import { TemplateService } from '../../services/template.service';
import { forEach } from '@angular/router/src/utils/collection';
import { MatSelect } from '@angular/material/select';
import { ContextModel } from '../../model/context.model';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ColorPickerDialogComponent } from '../color-picker-dialog/color-picker-dialog.component';
import { DisplayZoomDialogComponent } from '../display-zoom-dialog/display-zoom-dialog.component';
import { ProjectService } from '../../services/project.service';
import { ItemService } from '../../services/item.service';
import * as createjs from 'createjs-module';

@Component({
  selector: 'app-canvas-panel',
  templateUrl: './canvas-panel.component.html',
  styleUrls: ['./canvas-panel.component.css']
})
export class CanvasPanelComponent implements OnInit {
  constructor(public appService: AppService,
    public drawService: DrawService,
    public projectService: ProjectService,
    public templateService: TemplateService,
    public itemService: ItemService,
    public dialog: MatDialog) { }

  @ViewChild('selectorBusRoute') selectorBusRoute: MatSelect;

  panelOpenState = false;
  containerFrameList = [];

  private mainStage = null;

  ngOnInit() {
    this.mainStage = new createjs.Stage('divCanvasContainer');
    createjs.Ticker.addEventListener('tick', (evt) => this.handleTick(evt));

    this.initBusAdsFrame();
  }

  private refresh() {
    this.initBusAdsFrame();
  }

  private handleTick(event) {
    this.mainStage.update();
  }

  private initBusAdsFrame() {
    let gapX = 15;
    let gapY = 20;
    //const listTemplate = this.templateService.getMatchedTemplateList();

    this.appService.showLoading();
    this.templateService.getMatchedTemplateList().subscribe(listTemplate => {
      console.log("getMatchedTemplateList listTemplate=", listTemplate);
      this.appService.hideLoading();
      listTemplate.forEach(template => {
        const containerFrame = new createjs.Container();
        const offset: XY = new XY();
        offset.x = gapX;
        offset.y = gapY;
        this.drawService.drawTemplate(containerFrame, template, DrawMode.modeFrameOnly, offset);

        gapX = gapX + 340;

        const containerFrame2 = new createjs.Container();
        const offset2: XY = new XY();
        offset2.x = gapX;
        offset2.y = gapY;
        this.drawService.drawTemplate(containerFrame2, template, DrawMode.modeCombine, offset2);

        gapX = gapX + 340;

        const containerFrame3 = new createjs.Container();
        //containerFrame3.addEventListener("click", (evt) => {
        //  this.onClickContainer(evt);
        //});

        const offset3: XY = new XY();
        offset3.x = gapX;
        offset3.y = gapY;

        ((_template) => containerFrame3.addEventListener("click", (evt) => {
          this.onClickContainer(_template);
        }))(template);

        this.drawService.drawTemplate(containerFrame3, template, DrawMode.modeImageOnly, offset3);

        this.mainStage.addChild(containerFrame);
        this.mainStage.addChild(containerFrame2);
        this.mainStage.addChild(containerFrame3);
        //this.mainStage.update();

        this.containerFrameList.push(containerFrame3);

        gapX = 15;
        gapY = gapY + 250;
      });


    });
  }

  private makeDraggable(o) {
    let offset = null;
    o.addEventListener('mousedown', (evt) => {
      offset = { x: evt.target.x - evt.stageX, y: evt.target.y - evt.stageY };
    });
    o.addEventListener('pressmove', (evt) => {
      evt.currentTarget.x = evt.stageX + offset.x;
      evt.currentTarget.y = evt.stageY + offset.y;
      o.getStage().update();
    });
  }

  getFilteringSelectValue() {
    if (1 === 1) {

    }
  }

  openColorPickerDialog() {
    const dialogRef = this.dialog.open(ColorPickerDialogComponent, {
      width: '550px'
    });
  }

  onClickContainer(template) {
    //const container = evt.currentTarget.clone(true);

    const zoomContainer = new createjs.Container();
    const offsetZoom: XY = new XY();
    offsetZoom.x = 0;
    offsetZoom.y = 0;
    this.drawService.drawTemplate(zoomContainer, template, DrawMode.modeImageOnly, offsetZoom);


    const dialogRef = this.dialog.open(DisplayZoomDialogComponent, {
      width: '1100px',
      data: { template: zoomContainer, id: template.id }
    });
  }

  saveColor(){
    
    let saveCommand =  "REL_PROJ_ID=" + this.projectService.curCusProj.REL_PROJ_ID + "&BG_COLOR=" + this.itemService.bgColor;
    console.log("saveCommand=", saveCommand);
    saveCommand = saveCommand.replace("#", "_");
    
    this.appService.showLoading();
    this.projectService.updateCusProjectColor(saveCommand).subscribe(responseUpdateCusProject => {
      this.appService.hideLoading();
      
      console.log("######### updateCusProjectColor=", responseUpdateCusProject);
    });

  }

  public submit() {

  }

}
