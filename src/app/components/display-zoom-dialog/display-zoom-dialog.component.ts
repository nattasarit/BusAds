import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as createjs from 'createjs-module';
import { ProjectService } from '../../services/project.service';
import { AppService } from '../../services/app.service';

export interface DialogData {
  template: any;
  id: string;
}

@Component({
  selector: 'app-display-zoom-dialog',
  templateUrl: './display-zoom-dialog.component.html',
  styleUrls: ['./display-zoom-dialog.component.css']
})
export class DisplayZoomDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DisplayZoomDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, 
  public projectService: ProjectService,
  public appService: AppService) { }

  private mainStage = null;
  private canvas = null;
  private zoom = null;

  MouseWheelHandler(e) {
    if (Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))) > 0)
      this.zoom = 1.1;
    else
      this.zoom = 1 / 1.1;
    var local = this.mainStage.globalToLocal(this.mainStage.mouseX, this.mainStage.mouseY);
    this.mainStage.regX = local.x;
    this.mainStage.regY = local.y;
    this.mainStage.x = this.mainStage.mouseX;
    this.mainStage.y = this.mainStage.mouseY;
    this.mainStage.scaleX = this.mainStage.scaleY *= this.zoom;
    this.mainStage.update();
  }

  ngOnInit() {
    this.canvas = document.getElementById("divZoomCanvasContainer");
    this.mainStage = new createjs.Stage('divZoomCanvasContainer');
    createjs.Ticker.addEventListener('tick', (evt) => this.handleTick(evt));
    this.canvas.addEventListener("mousewheel", (e) => this.MouseWheelHandler(e), false);
    this.canvas.addEventListener("DOMMouseScroll", (e) => this.MouseWheelHandler(e), false);
    this.mainStage.addEventListener("stagemousedown", (e) => {
      var offset = { x: this.mainStage.x - e.stageX, y: this.mainStage.y - e.stageY };
      this.mainStage.addEventListener("stagemousemove", (ev) => {
        this.mainStage.x = ev.stageX + offset.x;
        this.mainStage.y = ev.stageY + offset.y;
        this.mainStage.update();
      });
      this.mainStage.addEventListener("stagemouseup", (e) => {
        this.mainStage.removeAllEventListeners("stagemousemove");
      });
    });

    console.log("template = ", this.data.template);
    if(this.data.template){
      this.data.template.removeEventListener("click");

      this.mainStage.addChild(this.data.template);
      this.data.template.parent.x = 10;
      this.data.template.parent.y = 10;
      this.mainStage.update();
      
    }
  }

  private handleTick(event) {
    this.mainStage.update();
  }

  private useTemplate(){
    console.log("this.projectService.custProjectList = ", this.projectService.custProjectList);
    let isSame = null;
    for(const project of this.projectService.custProjectList){
      console.log("project = ", project);
      if(project["BUS_TEM_ID"] == this.data.id.toString() && project["CUS_PROJ_ID"] != this.projectService.curCusProj.CUS_PROJ_ID){
        //check date
        const projectDate = new Date(project["START_DATE"]);
        const todayDate = new Date();
        const diffTime = Math.abs(todayDate.getTime() - project["START_DATE"]);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        console.log("diffDays=", diffDays);
        if(diffDays < 90){ 
           console.log("in diffday=");
          isSame = project;
        }
        isSame = project;
      }
    }
    
    if(isSame){
      console.log("isSame = ", isSame);
      let text = "ไม่สามารถเลือกได้เนื่องจากมี " + isSame["CUS_PROJ_NAME"] + " เลือกใช้ไปแล้ว";
      alert(text);
    }
    else{
      const saveCommand =  "REL_PROJ_ID=" + this.projectService.curCusProj.REL_PROJ_ID + "&BUS_TEM_ID=" + this.data.id;
      console.log("saveCommand=", saveCommand);
      this.appService.showLoading();
      this.projectService.updateCusProjectSelectTemplate(saveCommand).subscribe(responseUpdateCusProject => {
        this.appService.hideLoading();
        alert("บันทึกสำเร็จ");
        console.log("######### responseupdateCusProjectSelectTemplate=", responseUpdateCusProject);
      });
    }


  }

}
