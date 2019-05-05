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
  selectedMenu = null;

  dataSysDesign = [
    {
      name: 'project',
      displayName: 'แฟ้มงาน',
      icon: 'fas fa-folder'
    },
    {
      name: 'upload',
      displayName: 'รูปภาพ',
      icon: 'fas fa-file-upload'
    },
    {
      name: 'canvas',
      displayName: 'หน้าจอออกแบบ',
      icon: 'fas fa-drafting-compass'
    },
    {
      name: 'display-template',
      displayName: 'แม่แบบทั้งหมด',
      icon: 'fas fa-bus'
    }
  ];

  dataSysAddTemplate = [
    // {
    //   name: 'bus-type',
    //   displayName: 'Bus Type',
    //   icon: 'fas fa-file-upload'
    // },
    {
      name: 'bus-template',
      displayName: 'Bus Template',
      icon: 'fas fa-drafting-compass'
    }
  ];

  @Output()
  menuIsClicked: EventEmitter<boolean> = new EventEmitter();

  ngOnInit() {
    this.initMenu('design');
  }

  initMenu(system) {
    console.log("init menu =", system);
    let menuList = null;
    console.log("init menu =", system);

    switch (system) {
      case 'design': {
        menuList = this.dataSysDesign;
        this.selectedMenu = this.dataSysDesign[0];
        this.onCLickMenu(this.dataSysDesign[0]);
        break;
      } case 'add-template': {
        menuList = this.dataSysAddTemplate;
        this.selectedMenu = this.dataSysAddTemplate[0];
        this.onCLickMenu(this.dataSysAddTemplate[0]);
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

  onCLickMenu(menu) {
    // event.target.classList.add('class3'); // To ADD
    // event.target.classList.remove('class1'); // To Remove
    // event.target.classList.contains('class2'); // To check
    // event.target.classList.toggle('class4'); // To toggle
    this.selectedMenu = menu;
    this.menuIsClicked.emit(menu.name);
  }

}
