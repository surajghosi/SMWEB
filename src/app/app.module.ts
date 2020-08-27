import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
//import { fakeBackendProvider } from './_helpers/index';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
//import { HomeComponent } from './home/index';
import { HomeComponent , SettingsComponent,
     UsermanagementComponent, PipelineComponent,
      StageComponent, TagsComponent,DashboardComponent } from './pages/index';

import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';;
import { HeaderComponent , FooterComponent } from './_commonComponent/index';
import { ContextmenuModule } from 'ng2-contextmenu';  // we are not using
import {ShContextMenuModule} from 'ng2-right-click-menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { JwPaginationModule } from 'jw-angular-pagination';;
import { ConfirmationComponent,ConfirmDialogService } from './_commonComponent/confirmation/index';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
    imports: [
        BrowserModule,
        JwPaginationModule,
        FormsModule,
        HttpClientModule,
        routing,
        ContextmenuModule,
        ShContextMenuModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        BlockUIModule.forRoot()
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent ,
        FooterComponent ,
        SettingsComponent ,
        UsermanagementComponent ,
        PipelineComponent,
        StageComponent, 
        TagsComponent,
        DashboardComponent ,
        ConfirmationComponent ],
    providers: [
        AuthGuard,
        AlertService,
        ConfirmDialogService,
        AuthenticationService,
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },

        // provider used to create fake backend
       // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }