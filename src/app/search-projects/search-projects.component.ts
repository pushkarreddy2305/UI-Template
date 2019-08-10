import { Component, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-projects',
  templateUrl: './search-projects.component.html',
  styleUrls: ['./search-projects.component.scss']
})
export class SearchProjectsComponent implements OnInit {
  @Output() sendToComponent = new EventEmitter()
  constructor() { }

  ngOnInit() {
  }
  onChange(input: string){
    this.sendToComponent.emit(input)
  }
}
