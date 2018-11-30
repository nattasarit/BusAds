import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { MenuModel } from '../../model/menu.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  constructor() { }
  @Input()
  set system(system: string) {
    this.initMenu(system);
  }
  menus = [];

  dataSysDesign = [
    {
      name: 'project',
      displayName: 'Project',
      icon: 'fas fa-folder'
    },
    {
      name: 'upload',
      displayName: 'Upload',
      icon: 'fas fa-file-upload'
    },
    {
      name: 'canvas',
      displayName: 'Canvas',
      icon: 'fas fa-drafting-compass'
    },
    {
      name: 'display-template',
      displayName: 'Template',
      icon: 'fas fa-bus'
    }
  ];

  dataSysAddTemplate = [
    {
      name: 'bus-type',
      displayName: 'Bus Type',
      icon: 'fas fa-file-upload'
    },
    {
      name: 'bus-template',
      displayName: 'Bus Template',
      icon: 'fas fa-drafting-compass'
    },
    {
      name: 'bus-subtemplate',
      displayName: 'Bus Subtemplate',
      icon: 'fas fa-drafting-compass'
    }
  ];

  @Output()
  menuIsClicked: EventEmitter<boolean> = new EventEmitter();

  ngOnInit() {
    this.initMenu('design');
  }

  initMenu(system) {
    let menuList = null;
    switch (system) {
      case 'design': {
        menuList = this.dataSysDesign;
        this.onCLickMenu(this.dataSysDesign[0].name);
        break;
      } case 'add-template': {
        menuList = this.dataSysAddTemplate;
        this.onCLickMenu(this.dataSysAddTemplate[0].name);
        break;
      } default: {
        menuList = [];
        console.log('other case');
        break;
      }
    }

    this.menus = [];
    menuList.forEach(menuRes => {
      const menu = new MenuModel();
      menu.name = menuRes['name'];
      menu.displayName = menuRes['displayName'];
      menu.icon = menuRes['icon'];
      this.menus.push(menu);
    });
  }

  onCLickMenu(response) {
    this.menuIsClicked.emit(response);
  }

}
