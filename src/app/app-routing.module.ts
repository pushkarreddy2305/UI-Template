import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {UploadComponent} from './upload/upload.component';
import {LoginComponent} from './login/login.component';
import {LandingComponent} from './landing/landing.component';
import {AuthGuard} from './services/authentication.service';
import {ProjectComponent} from "./project/project.component";
import {UsersComponent} from "./users/users.component";
import { CreateComponent } from './create/create.component';
import { SystemsComponent } from './systems/systems.component';
import { SystemsCreateComponent } from './systems-create/systems-create.component'
import { TemplateComponent } from './template/template.component';
import { TemplateCrudComponent } from './template-crud/template-crud.component';
import { EdittemplateComponent } from './edittemplate/edittemplate.component';
import { CreateTemplateComponent } from './create-template/create-template.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    // path: '', component: LandingComponent, canActivate: [AuthGuard],
    path: '', component: LandingComponent,
    children: [
      {path: 'project', component: ProjectComponent},

      {path: 'users', component: UsersComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'upload', component: UploadComponent},
      {path: 'project/create', component:CreateComponent},
      {path: 'systems', component: SystemsComponent},
      {path: 'systems/create', component: SystemsCreateComponent}
    ]
  },
  { path: 'template', component: TemplateComponent },
  { path: 'viewtemplates', component: TemplateCrudComponent },
  { path: 'edittemplate', component: EdittemplateComponent},
  { path: 'createtemplate', component:CreateTemplateComponent}
  // { path: "bar-chart", component: DashboardBarChartComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
