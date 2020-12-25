import { Component, OnInit } from '@angular/core';
import { CommonpopupService } from "./commonpopup.service";

@Component({
  selector: 'app-commonpopup',
  templateUrl: './commonpopup.component.html',
  styleUrls: ['./commonpopup.component.css']
})
export class CommonpopupComponent implements OnInit {

  templateType: any;
  modelCloseStyle = 'block';
  modelTitle = '';
  constructor(private commonpopupService: CommonpopupService) { }

  ngOnInit() {
    this.commonpopupService.getTemplate().subscribe(templateType => {
      this.templateType = templateType;
      if(this.templateType==1) {
        this.modelTitle = 'Change Lead Name';
      }
  });
  }
  close() {
    this.templateType = 0;
  }
  submit() {
    this.templateType = 0;
  }

}
