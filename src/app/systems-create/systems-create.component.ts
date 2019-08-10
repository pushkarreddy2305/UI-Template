import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SystemsService } from '../services/systems.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-systems-create',
  templateUrl: './systems-create.component.html',
  styleUrls: ['./systems-create.component.scss']
})
export class SystemsCreateComponent implements OnInit {
  
  constructor(private system: SystemsService, private formBuilder: FormBuilder, private router: Router) { }

  systemCreateForm = this.formBuilder.group({
    systemName: ['', Validators.required],
    systemCredentials: ['', [Validators.required, Validators.maxLength(100)]],
    systemType: ['', [Validators.required, Validators.maxLength(100)]],
    systemLocation: ['', [Validators.required, Validators.maxLength(100)]]
  });
  
  ngOnInit() {
  }

  addProvider(){
    this.system.addSystem(this.systemCreateForm.value)
    .subscribe(res=>{
      console.log(res)
      if(res._id){
        this.router.navigate(['systems'])
      } else {
        alert('error adding provider')
      }
    })
  }

  cancelAction(){
    this.router.navigate(['systems'])
  }

}
