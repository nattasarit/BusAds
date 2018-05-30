import { Component, OnInit } from '@angular/core';
import { DbconnectorService } from '../../services/dbconnector.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public dbconnector: DbconnectorService) {
    //auth.handleAuthentication();
  }


  ngOnInit() {
    
  }

  login(){
     this.dbconnector.test().subscribe(response => {
      console.log("response = ",response);
      if (response.success) {
        
      }
    });
    
  }

}
