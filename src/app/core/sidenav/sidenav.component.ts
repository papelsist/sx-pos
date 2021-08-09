import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'sx-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  
  @Output() selection = new EventEmitter<string>();
  @Input() routes;
  
  

  constructor() { }

  ngOnInit() {
  }

  select(path: string){
    this.selection.emit(path);
  }

}
