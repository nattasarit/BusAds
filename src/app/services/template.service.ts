import { Injectable } from '@angular/core';
import { BusTemplateModel } from '../model/bus-template.model';
import { BusSubTemplateModel } from '../model/bus-subtemplate.model';
import { ItemService } from '../services/item.service';
import { template } from '@angular/core/src/render3';
import { BusMainFrameModel } from '../model/bus-mainframe.model';
import { DbconnectorService } from './dbconnector.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private itemService: ItemService, private dbconnector: DbconnectorService) { }

  getAllMainFrameList(): Observable<any> {
    const mainFrameList = new Array();

    let observable = Observable.create(observer => {
      this.dbconnector.reqDB("BUS_MAINFRAME_Q", null).subscribe(response_mainframe => {
        if (response_mainframe.success = true) {
          response_mainframe.data.forEach(data => {
            let mainframe: BusMainFrameModel = {
              id: data.BUS_MF_ID,
              name: data.BUS_MF_NAME,
              MainFrameCommand: data.BUS_MF_COMMAND
            }
            mainFrameList.push(mainframe);
          });
        }

        observer.next(mainFrameList); // This method same as resolve() method from Angular 1
        observer.complete();//to show we are done with our processing
      });
    });

    return observable;
  }

  getAllTemplateList(): Observable<any> {
    const mainFrameList = new Array<BusMainFrameModel>();
    const templateList = new Array();

    // M A I N F R A M E
    let observable = Observable.create(observer => {
      this.dbconnector.reqDB("BUS_MAINFRAME_Q", null).subscribe(response_mainframe => {
        if (response_mainframe.success = true) {
          response_mainframe.data.forEach(data => {
            let mainframe: BusMainFrameModel = {
              id: data.BUS_MF_ID,
              name: data.BUS_MF_NAME,
              MainFrameCommand: data.BUS_MF_COMMAND
            }
            mainFrameList.push(mainframe);
          });

          //T E M P L A T E
          this.dbconnector.reqDB("BUS_TEMPLATE_Q", null).subscribe(response_template => {
            if (response_template.success = true) {
              response_template.data.forEach(data => {
                let template: BusTemplateModel = {
                  id: data.BUS_TEM_ID,
                  name: data.BUS_TEM_NAME,
                  MainFrame: mainFrameList.filter(x => x.id.toString() == data.BUS_TEM_MF_ID.toString())[0],
                  AFrameCommand: this.splitCommand(data.BUS_TEM_COMMAND_A),
                  BFrameCommand: this.splitCommand(data.BUS_TEM_COMMAND_B),
                  CFrameCommand: this.splitCommand(data.BUS_TEM_COMMAND_C)
                };
                templateList.push(template);
              });
            }

            observer.next(templateList); // This method same as resolve() method from Angular 1
            observer.complete();//to show we are done with our processing
          });
        }
      });

    })

    return observable;
  }

  splitCommand(stringCommand): Array<any> {
    let command: Array<any>;
    command = stringCommand.split(",");

    return command;
  }

  getTemplate() {

  }

  getMatchedTemplateList(): Observable<any> {
    let numImageA = 0;
    let numImageB = 0;
    let numImageC = 0;
    if (this.itemService.items.length > 0) {
      this.itemService.items.forEach(item => {
        switch (item.priority) {
          case 'A':
            numImageA++;
            break;
          case 'B':
            numImageB++;
            break;
          case 'C':
            numImageC++;
            break;
          default:
            console.log('error case');
        }
      });
    }

    console.log("numImageA=", numImageA);
    console.log("numImageB=", numImageB);
    console.log("numImageC=", numImageC);

    let observable = Observable.create(observer => {
      //const templateList = this.getAllTemplateList();
      this.getAllTemplateList().subscribe(templateList => {
        console.log("templateList = ", templateList);
        const matchedTemplateList = new Array();

        for (let i = 0; i < templateList.length; i++) {
          console.log("A Frame =", templateList[i].AFrameCommand.length);
          console.log("B Frame =", templateList[i].BFrameCommand.length);
          console.log("C Frame =", templateList[i].CFrameCommand.length);

          let stillMatch = true;
          if (numImageA > 0) {
            if (templateList[i].AFrameCommand.length > numImageA && templateList[i].AFrameCommand[0].length > 0) {
              stillMatch = false;
            }
          } else {
            if (templateList[i].AFrameCommand.length > 0 && templateList[i].AFrameCommand[0].length > 0) {
              stillMatch = false;
            }
          }

          if (numImageB > 0) {
            if (templateList[i].BFrameCommand.length > numImageB && templateList[i].BFrameCommand[0].length > 0) {
              stillMatch = false;
            }
          } else {
            if (templateList[i].BFrameCommand.length > 0 && templateList[i].BFrameCommand[0].length > 0) {
              stillMatch = false;
            }
          }

          if (numImageC > 0) {
            if (templateList[i].CFrameCommand.length > numImageC && templateList[i].CFrameCommand[0].length > 0) {
              stillMatch = false;
            }
          } else {
            if (templateList[i].CFrameCommand.length > 0 && templateList[i].CFrameCommand[0].length > 0) {
              stillMatch = false;
            }
          }

          if (stillMatch === true) {
            matchedTemplateList.push(templateList[i]);
          }
        }

        observer.next(matchedTemplateList); // This method same as resolve() method from Angular 1
        observer.complete();//to show we are done with our processing
      });
    });

    return observable;
    //return [];
  }
}
