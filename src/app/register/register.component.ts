import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.userService.registerUser(this.model)
            .subscribe(
                data => {
                    //this.alertService.success('Registration successful', true);
                   this.router.navigate(['/login']);
                },
                error => {
                    //console.log(error);
                    //this.alertService.error(error.error.message);
                    this.loading = false;
                });
    }
}
