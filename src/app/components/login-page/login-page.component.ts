import { Component, OnInit } from '@angular/core';
import { DbconnectorService } from '../../services/dbconnector.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(public dbconnector: DbconnectorService) {
    // auth.handleAuthentication();
  }


  ngOnInit() {
    // this.dbconnector.test().subscribe(response => {
    //   if (response.success) {

    //   }
    // });
  }

  login() {


  }
}
