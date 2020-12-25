import { Component, Input, OnInit } from '@angular/core';
import { ConfirmDialogService } from "./confirmation.service";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  message: any;
    constructor(
        private confirmDialogService: ConfirmDialogService
    ) { }

    ngOnInit() {
      this.confirmDialogService.getMessage().subscribe(message => {
          this.message = message;
      });
  }
}
