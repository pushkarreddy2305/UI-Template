import {BrowserModule} from '@angular/platform-browser';
import {NgModule, OnDestroy, OnInit, OnChanges, EventEmitter, ElementRef, SimpleChanges} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ChartsModule, BaseChartDirective} from 'ng2-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatSidenavModule, MatDialogModule, MatProgressSpinnerModule, MatToolbarModule,
  MatTableModule, MatSortModule, MatPaginatorModule, MatGridListModule, MatSelectModule,
  MatExpansionModule, MatTooltipModule, MatCardModule, MatInputModule, MatMenuModule, MatButtonModule,
  MatCheckboxModule
} from '@angular/material';
import {TokeninjectorService} from './services/tokeninjector.service';
import {ProjectService} from './services/project.service'
import {UserIdleModule} from 'angular-user-idle';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {AppComponent} from './app.component';
import {UploadComponent} from './upload/upload.component';
import {LoginComponent} from './login/login.component';
import {FooterComponent} from './footer/footer.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AppRoutingModule} from './/app-routing.module';
import {LandingComponent} from './landing/landing.component';
import {LoadingComponent} from './upload/loading/loading.component';
import 'chartjs-plugin-colorschemes';
import {defaults} from 'chart.js';
import {ProjectComponent} from "./project/project.component";
import {UsersComponent} from "./users/users.component";
import { CreateComponent } from './create/create.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { SearchProjectsComponent } from './search-projects/search-projects.component';
import { SystemsComponent } from './systems/systems.component';
import { SystemsCreateComponent } from './systems-create/systems-create.component';
import { TemplateComponent } from './template/template.component';
import { TemplateCrudComponent } from './template-crud/template-crud.component';
import { EdittemplateComponent } from './edittemplate/edittemplate.component';
import { DataEntity } from './shared/data.service';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// import { UpdateComponent } from './update/update.component';

/**
 * @todo move to typings file
 */
declare module 'ng2-charts' {
  class BaseChartDirective implements OnDestroy, OnChanges, OnInit {
    data: number[] | any[];
    datasets: any[];
    labels: Array<any>;
    chartType: string;

    constructor(element: ElementRef);

    ngOnInit(): any;

    ngOnChanges(changes: SimpleChanges): void;

    ngOnDestroy(): any;

    getChartBuilder(ctx: any): any;

    private updateChartData(newDataValues);

    getDatasets();

    private refresh();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    LoginComponent,
    FooterComponent,
    DashboardComponent,
    LandingComponent,
    LoadingComponent,
    ProjectComponent,
    UsersComponent,
    CreateComponent,
    DeleteDialogComponent,
    SearchProjectsComponent,
    SystemsComponent,
    SystemsCreateComponent,
    TemplateComponent,
    TemplateCrudComponent,
    EdittemplateComponent,
    CreateTemplateComponent
  ],
  entryComponents: [
    LoadingComponent,
    DeleteDialogComponent
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    Ng2SearchPipeModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ChartsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSelectModule,
    UserIdleModule.forRoot({idle: 60, timeout: 240, ping: 10}),
    DragDropModule,
    MatGridListModule,
    MatToolbarModule,
    MatExpansionModule,
    MatTooltipModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [DataEntity,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokeninjectorService,
    multi: true
  }],
  // providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    defaults.global.plugins.colorschemes.scheme = 'tableau.ClassicColorBlind10';
    BaseChartDirective.prototype.getDatasets = function () {
      var _this = this;
      var datasets = void 0;
      // in case if datasets is not provided, but data is present
      if (!this.datasets || !this.datasets.length && (this.data && this.data.length)) {
        if (Array.isArray(this.data[0])) {
          datasets = this.data.map(function (data, index) {
            return {data: data, label: _this.labels[index] || "Label " + index};
          });
        } else {
          datasets = [{data: this.data, label: "Label 0"}];
        }
      }
      if (this.datasets && this.datasets.length ||
        (datasets && datasets.length)) {
        datasets = (this.datasets || datasets)
          .map(function (elm, index) {
            var newElm = Object.assign({}, elm);
            /*
            if (_this.colors && _this.colors.length) {
                Object.assign(newElm, _this.colors[index]);
            }
            else {
                Object.assign(newElm, getColors(_this.chartType, index, newElm.data.length));
            }
            */
            return newElm;
          });
      }
      if (!datasets) {
        throw new Error("ng-charts configuration error,\n      data or datasets field are required to render char " + this.chartType);
      }
      return datasets;
    };
  }
}
