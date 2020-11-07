import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService , SharedServcieService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    list = [{
        id: 1,
        name: 'suraj'
    }, {
        id: 2,
        name: 'Pawan'
    }];
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private sharedService: SharedServcieService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'Home';
    }
   
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.userName, this.model.password)
            .subscribe(
                data => {
                    debugger;
                    this.sharedService.changeProfileName(data.name);
                    localStorage.setItem('profileName', data.name);
                    console.log(data);
                    this.router.navigate(['Home']);
                },
                error => {
                    this.loading = false;
                });
    }
}
