import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sx-nav-layout',
  templateUrl: './nav-layout.component.html',
  styleUrls: ['./nav-layout.component.scss']
})
export class NavLayoutComponent implements OnInit {

  @Input() header: string = "Header";

  @Input() headerIcon = "apps";
  
  @Input() color = 'primary';
  
  @Input() sideNavWidth = '275px'
  
  @Input() modulo: string = "Modulo";

  constructor() { }

  ngOnInit() {
  }

}
