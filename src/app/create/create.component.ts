import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ProjectService } from "../services/project.service";
import { Router } from "@angular/router";
import { environment } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { IEntity } from "./entity/project.entity";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateComponent implements OnInit {
  public selectedMenu = "Select Template";
  public checked = true;

  togleCheck() {
    this.checked = !this.checked;
  }
  data = new IEntity();
  constructor(
    private formBuilder: FormBuilder,
    public project: ProjectService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  projectForm = this.formBuilder.group({
    name: ["", Validators.required],
    description: ["", [Validators.required, Validators.maxLength(100)]],
    //projectTitle: ['', [Validators.required, Validators.maxLength(100)]],
    key: ["", [Validators.required, Validators.maxLength(100)]],
    refreshprotect: []
    //. pageContent: ['', [Validators.required, Validators.maxLength(100)]]
  });

  create() {
    let project = {
      details: this.projectForm.value
    };
    project.details.components = [];
    console.log(project.details);
    this.http
      .post(environment.backend.url + "/project", project.details)
      .subscribe(res => {
        console.log(res);
        this.router.navigateByUrl("project").then(
          nav => {
            console.log(nav);
          },
          err => {
            console.log(err);
          }
        );
      });
  }

  cancel() {
    this.router.navigate(["/project"]);
  }

  selectTemplate(templateName) {
    this.selectedMenu = templateName;
  }
}
