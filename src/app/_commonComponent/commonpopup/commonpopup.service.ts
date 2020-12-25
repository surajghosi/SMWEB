import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';


@Injectable() export class CommonpopupService {
  private subject = new Subject<any>();
  constructor() { }
  setTemplate(templateType: string) {
      this.action(templateType);
  }
  action(templateType: string) {
      const that = this;
      this.subject.next(templateType);
      // this.subject.next({
      //     type: 'confirm',
      //     text: message,
      //     siFn() {
      //             that.subject.next();
      //             siFn();
      //         },
      //     noFn() {
      //         that.subject.next();
      //         noFn();
      //     }
      // });
      // if(templateType==1) {
      //   alert(templateType);
      // }
  }
  getTemplate(): Observable<any> {
      return this.subject.asObservable();
  }
}
