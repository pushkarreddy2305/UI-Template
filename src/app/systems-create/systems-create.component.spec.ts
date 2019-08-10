import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemsCreateComponent } from './systems-create.component';

describe('SystemsCreateComponent', () => {
  let component: SystemsCreateComponent;
  let fixture: ComponentFixture<SystemsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
