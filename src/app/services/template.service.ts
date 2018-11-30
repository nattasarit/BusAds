import { Injectable } from '@angular/core';
import { BusTemplateModel } from '../model/bus-template.model';
import { BusSubTemplateModel } from '../model/bus-subtemplate.model';
import { ItemService } from '../services/item.service';
import { template } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private itemService: ItemService) { }

  public sampleTemplate1: BusTemplateModel = {
    id: 1,
    name: 'template1',
    MainFrameCommand: 'MT*0*0|LT*315*0|LT*315*185|LT*122*185|CT*102*120*52*120*32*185|LT*0*185|CP',
    AFrameCommand: 'RECT*200*20*110*155',
    BFrameCommand: 'RECT*0*0*70*50',
    CFrameCommand: ''
  };

  public sampleTemplate2: BusTemplateModel = {
    id: 2,
    name: 'template2',
    MainFrameCommand: 'MT*0*0|LT*315*0|LT*315*185|LT*122*185|CT*102*120*52*120*32*185|LT*0*185|CP',
    AFrameCommand: 'RECT*100*50*90*85',
    BFrameCommand: 'RECT*220*0*80*120',
    CFrameCommand: 'RECT*0*20*70*50'
  };

  public sampleTemplate3: BusTemplateModel = {
    id: 3,
    name: 'template3',
    MainFrameCommand: 'MT*0*0|LT*315*0|LT*315*185|LT*122*185|CT*102*120*52*120*32*185|LT*0*185|CP',
    AFrameCommand: 'RECT*20*20*100*90',
    BFrameCommand: 'RECT*120*50*80*80',
    CFrameCommand: 'RECT*220*80*80*80'
  };

  public sampleTemplate4: BusTemplateModel = {
    id: 4,
    name: 'template4',
    MainFrameCommand: 'MT*0*0|LT*315*0|LT*315*185|LT*122*185|CT*102*120*52*120*32*185|LT*0*185|CP',
   AFrameCommand: 'RECT*140*30*110*140',
    BFrameCommand: '',
    CFrameCommand: ''
  };

  public sampleSubTemplate1: BusSubTemplateModel = {
    id: 1,
    name: 'subtemplate1',
    MainFrameCommand: '',
    Frame1Command: 'RECT*0*0*150*150',
    Frame2Command: 'RECT*0*150*150*150',
    Frame3Command: '',
    Frame4Command: ''
  };

  public sampleSubTemplate2: BusSubTemplateModel = {
    id: 2,
    name: 'subtemplate1',
    MainFrameCommand: '',
    Frame1Command: 'RECT*0*0*150*105',
    Frame2Command: 'RECT*0*150*150*150',
    Frame3Command: 'RECT*0*300*150*150',
    Frame4Command: ''
  };

  findMatchedTemplate() {

  }

  getAllTemplateList(): Array<BusTemplateModel> {
    const templateList = new Array();
    templateList.push(this.sampleTemplate1);
    templateList.push(this.sampleTemplate2);
    templateList.push(this.sampleTemplate3);
    templateList.push(this.sampleTemplate4);

    return templateList;
  }

  getMatchedTemplateList(): Array<BusTemplateModel> {
    let isA: Boolean = false;
    let isB: Boolean = false;
    let isC: Boolean = false;
    if (this.itemService.items.length > 0) {
      this.itemService.items.forEach(item => {
        switch (item.priority) {
          case 'A':
            isA = true;
            break;
          case 'B':
            isB = true;
            break;
          case 'C':
            isC = true;
            break;
          default:
            console.log('error case');
        }
      });
    }

    const templateList = this.getAllTemplateList();

    const matchedTemplateList = new Array();

    for (let i = 0; i < templateList.length; i++) {
      let stillMatch = true;
      if (isA === true) {
        if (templateList[i].AFrameCommand.length === 0) {
          stillMatch = false;
        }
      } else {
        if (templateList[i].AFrameCommand.length > 0) {
          stillMatch = false;
        }
      }

      if (isB === true) {
        if (templateList[i].BFrameCommand.length === 0) {
          stillMatch = false;
        }
      } else {
        if (templateList[i].BFrameCommand.length > 0) {
          stillMatch = false;
        }
      }

      if (isC === true) {
        if (templateList[i].CFrameCommand.length === 0) {
          stillMatch = false;
        }
      } else {
        if (templateList[i].CFrameCommand.length > 0) {
          stillMatch = false;
        }
      }

      if (stillMatch === true) {
        matchedTemplateList.push(templateList[i]);
      }
    }

    return matchedTemplateList;
  }
}
