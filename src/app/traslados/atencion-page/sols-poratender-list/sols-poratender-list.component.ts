import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sx-sols-poratender-list',
  templateUrl: './sols-poratender-list.component.html',
})
export class SolsPoratenderListComponent implements OnInit {

  @Input() solicitudes = [];
  
  @Output() print = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

}
