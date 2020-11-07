import { Component, OnInit } from '@angular/core';
import  { SharedServcieService } from '../../_services/index';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  profileName = '' ;
  constructor(private sharedService: SharedServcieService) { }

  ngOnInit() {
    this.sharedService.username.subscribe(result => {
      this.profileName = result;
    });
  }

}
