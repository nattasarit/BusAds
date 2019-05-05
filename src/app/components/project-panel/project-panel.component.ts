import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProjectService } from '../../services/project.service'
import { ItemService } from '../../services/item.service'
import { AppService } from '../../services/app.service'
import { ImageModel } from '../../model/image.model';

export interface LUTProject {
  PROJ_ID: string;
  PROJ_VALUE: string;
}

export interface CustProject {
  CUS_PROJ_ID: string;
  CUS_PROJ_NAME: string;
  CUS_PROJ_TYPE: string;
  REL_PROJ_ID: string;
  IMAGE_A: string;
  IMAGE_B: string;
  IMAGE_C: string;
  TEXT_A: string;
  TEXT_B: string;
  TEXT_C: string;
  BG_STYLE: string;
  BG_COLOR: string;
  BUS_TEM_ID: string;
  START_DATE: string;
}

@Component({
  selector: 'app-project-panel',
  templateUrl: './project-panel.component.html',
  styleUrls: ['./project-panel.component.css']
})
export class ProjectPanelComponent implements OnInit {
  LUTProjects: LUTProject[] = [];
  CustProjects: CustProject[] = [];
  @ViewChild('productNameElem') productNameElem: ElementRef;
  @ViewChild('productTypeElem') productTypeElem: ElementRef;
  @ViewChild('dateInput') dateInput: ElementRef;
  

  productName: string = '';
  productType: string = null;
  isAddMode: boolean = true;
  startDate: Date = null;

  constructor(public projectService: ProjectService, 
              public itemService: ItemService,
              public appService: AppService) {
  }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.LUTProjects = [];
    this.CustProjects = [];

    this.appService.showLoading();
    this.projectService.getLUTProjectList().subscribe(LUTProjectList => {
      this.appService.hideLoading();
      LUTProjectList.forEach(LUTProject => {
        this.LUTProjects.push({ PROJ_ID: LUTProject.PROJ_ID, PROJ_VALUE: LUTProject.PROJ_VALUE });
      });
      
    });

    this.projectService.getCusProjectList().subscribe(custProjectList => {
      this.projectService.custProjectList = custProjectList;
      custProjectList.forEach(CustProject => {
        console.log("getCustProjectList custProjectList = ", custProjectList);
        this.CustProjects.push({
          CUS_PROJ_ID: CustProject.CUS_PROJ_ID,
          CUS_PROJ_NAME: CustProject.CUS_PROJ_NAME,
          CUS_PROJ_TYPE: CustProject.CUS_PROJ_TYPE,
          REL_PROJ_ID: CustProject.REL_PROJ_ID,
          IMAGE_A: CustProject.IMAGE_A,
          IMAGE_B: CustProject.IMAGE_B,
          IMAGE_C: CustProject.IMAGE_C,
          TEXT_A: CustProject.TEXT_A,
          TEXT_B: CustProject.TEXT_B,
          TEXT_C: CustProject.TEXT_C,
          BG_STYLE: CustProject.BG_STYLE,
          BG_COLOR: CustProject.BG_COLOR ? CustProject.BG_COLOR.replace("_", "#") : null,
          BUS_TEM_ID: CustProject.BUS_TEM_ID,
          START_DATE: CustProject.START_DATE
        });
      });
    });
  }

  addProject() {
    this.productName = '';
    this.productType = null;
    this.isAddMode = true;
  }

  saveProject() {
    //.getTime()
    console.log("dateInput = ", this.dateInput.nativeElement.value);
    let mydate = null;
    if(this.dateInput.nativeElement.value){
       let splitDate = this.dateInput.nativeElement.value.split("/");
       let newDate = splitDate[1] + '/' + splitDate[0] + '/' + splitDate[2];
       mydate = new Date(newDate).getTime();
       console.log("mydate=", mydate);

       let a = new Date(mydate);
       console.log("a=", a);
    }
    

    let saveCommand = "CUS_PROJ_NAME=" + this.productNameElem.nativeElement.value + "&CUS_PROJ_TYPE=" + this.productType + "&START_DATE=" + mydate;

    console.log("######### saveProject saveCommand=", saveCommand);
    if (this.isAddMode == true) {
      this.appService.showLoading();
      this.projectService.saveCusProject(saveCommand).subscribe(responseSaveCusProject => {
        this.appService.hideLoading();
        if (responseSaveCusProject.success == true) {
          if (responseSaveCusProject.data.length > 0) {
            let saveCommandRel = "CUS_PROJ_ID=" + responseSaveCusProject.data[0]["CUS_PROJ_ID"];
            this.projectService.saveRelProject(saveCommandRel).subscribe(responseSaveRelProject => {
              console.log("projectService response = ", responseSaveRelProject);
              alert("บันทึกสำเร็จ");
              this.reload();
            });
          }
        }
      });
    }
    else{
      
      saveCommand = saveCommand + "&CUS_PROJ_ID=" + this.projectService.curCusProj.CUS_PROJ_ID;
      console.log("######### saveProject saveCommand=", saveCommand);

      this.appService.showLoading();
      this.projectService.updateCusProject(saveCommand).subscribe(responseUpdateCusProject => {
        this.appService.hideLoading();
        alert("บันทึกสำเร็จ");
        this.reload();
        console.log("######### responseUpdateCusProject=", responseUpdateCusProject);
      });
    }
  }

  cancelProject() {

  }

  onCustProjectClick(CusProject) {
    this.isAddMode = false;
    this.projectService.curCusProj = CusProject;

    this.itemService.items = [];
    this.itemService.itemsText = [];

    console.log("onCustProjectClick CusProject = ", this.projectService.curCusProj);

    this.productName = this.projectService.curCusProj.CUS_PROJ_NAME;
    this.productType = this.projectService.curCusProj.CUS_PROJ_TYPE;
    this.itemService.bgColor = CusProject.BG_COLOR;
    let intDate = parseInt(CusProject.START_DATE);
    console.log("intDate=", intDate);
    this.startDate = new Date(intDate);
    console.log("this.startDate=", this.startDate);

    //Image
    if (this.projectService.curCusProj.IMAGE_A) {
      const imageA = new ImageModel();
      imageA.image = this.projectService.curCusProj.IMAGE_A;
      imageA.priority = 'A';
      this.itemService.items.push(imageA);
    }

    if (this.projectService.curCusProj.IMAGE_B) {
      const imageB = new ImageModel();
      imageB.image = this.projectService.curCusProj.IMAGE_B;
      imageB.priority = 'B';
      this.itemService.items.push(imageB);
    }

    if (this.projectService.curCusProj.IMAGE_C) {
      const imageC = new ImageModel();
      imageC.image = this.projectService.curCusProj.IMAGE_C;
      imageC.priority = 'C';
      this.itemService.items.push(imageC);
    }

    //Text
    if (this.projectService.curCusProj.TEXT_A) {
      const textA = new ImageModel();
      textA.image = this.projectService.curCusProj.TEXT_A;
      textA.priority = 'A';
      this.itemService.itemsText.push(textA);
    }

    if (this.projectService.curCusProj.TEXT_B) {
      const textB = new ImageModel();
      textB.image = this.projectService.curCusProj.TEXT_B;
      textB.priority = 'B';
      this.itemService.itemsText.push(textB);
    }

    if (this.projectService.curCusProj.TEXT_C) {
      const textC = new ImageModel();
      textC.image = this.projectService.curCusProj.TEXT_C;
      textC.priority = 'C';
      this.itemService.itemsText.push(textC);
    }
  }

}
