import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent , SettingsComponent,
     UsermanagementComponent, PipelineComponent,
      StageComponent, TagsComponent, DashboardComponent , AdvancedLeadCreatorComponent , TodoComponent ,
      HelpCenterComponent, ChangePasswordComponent , ContactComponent, 
      NotesComponent, FilesComponent , ProductComponent , SourceComponent , ManageAccessComponent, ZonesComponent  } from './pages/index';

import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { HeaderComponent , FooterComponent , BlockTemplateComponent } from './_commonComponent/index';
import { ContextmenuModule } from 'ng2-contextmenu';  // we are not using
import {ShContextMenuModule} from 'ng2-right-click-menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { JwPaginationModule } from 'jw-angular-pagination';
import { ConfirmationComponent, ConfirmDialogService } from './_commonComponent/confirmation/index';
import { BlockUIModule } from 'ng-block-ui';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { LeadDetailsComponent } from './pages/advanced-lead-creator/lead-details/lead-details.component';
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
        BlockUIModule.forRoot({
            template: BlockTemplateComponent
          }),
        DragDropModule,
        ScrollingModule,
        NgxDaterangepickerMd.forRoot({
            separator: ' To ',
            applyLabel: 'Okay',
            clearLabel: 'Clear', // detault is 'Clear'
        }),
        AutocompleteLibModule
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
        ConfirmationComponent ,
        BlockTemplateComponent,
        AdvancedLeadCreatorComponent,
        TodoComponent,
        HelpCenterComponent,
        ChangePasswordComponent,
        ContactComponent,
        SourceComponent,
        ProductComponent,
        FilesComponent,
        NotesComponent,
        ManageAccessComponent,
        ZonesComponent,
        LeadDetailsComponent],
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
    entryComponents: [
        BlockTemplateComponent // Make sure to add it to the entry components
      ],
    bootstrap: [AppComponent]
})

export class AppModule { }