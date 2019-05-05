import { Injectable } from '@angular/core';
import { DbconnectorService } from './dbconnector.service';
import { Observable } from 'rxjs/Observable';
import { CustProject } from '../components/project-panel/project-panel.component';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private dbconnector: DbconnectorService) { }

  custProjectList: [];
  curCusProj:CustProject = null;

  getLUTProjectList() {
    const LUTProjectList = new Array();
    let observable = Observable.create(observer => {
      this.dbconnector.reqDB("LUT_PROJECT_Q", null).subscribe(response_lut_project => {
        if (response_lut_project.success = true) {
          response_lut_project.data.forEach(data => {
            LUTProjectList.push(data);
          });
        }
        observer.next(LUTProjectList);
        observer.complete();
      });
    });
    return observable;
  }

  getCusProjectList() {
    const custProjectList = new Array();
    let observable = Observable.create(observer => {
      this.dbconnector.reqDB("CUS_PROJECT_Q", null).subscribe(response_cust_project => {
        if (response_cust_project.success = true) {
          response_cust_project.data.forEach(data => {
            custProjectList.push(data);
          });
        }
        observer.next(custProjectList);
        observer.complete();
      })
    })
    return observable;
  }

  saveCusProject(command) {
    let observable = Observable.create(observer => {
      this.dbconnector.reqDB("CUS_PROJECT_I", command).subscribe(response => {
        observer.next(response);
        observer.complete();
      });
    });
    return observable;
  }

  updateCusProject(command) {
    let observable = Observable.create(observer => {
      this.dbconnector.reqDB("CUS_PROJECT_U", command).subscribe(response => {
        observer.next(response);
        observer.complete();
      });
    });
    return observable;
  }

  updateCusProjectSelectTemplate(command) {
    let observable = Observable.create(observer => {
      this.dbconnector.reqDB("CUS_PROJECT_U_SELECT_TEMPLATE", command).subscribe(response => {
        observer.next(response);
        observer.complete();
      });
    });
    return observable;
  }

  updateCusProjectColor(command) {
    let observable = Observable.create(observer => {
      this.dbconnector.reqDB("CUS_PROJECT_U_COLOR", command).subscribe(response => {
        observer.next(response);
        observer.complete();
      });
    });
    return observable;
  }

  saveRelProject(command) {
    let observable = Observable.create(observer => {
      this.dbconnector.reqDB("REL_PROJECT_I", command).subscribe(response => {
        observer.next(response);
        observer.complete();
      });
    });
    return observable;
  }

}
