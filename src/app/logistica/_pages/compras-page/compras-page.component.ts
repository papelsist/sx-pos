import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compras-page',
  templateUrl: './compras-page.component.html',
  styleUrls: ['./compras-page.component.scss']
})
export class ComprasPageComponent implements OnInit {

  selected = undefined;

  constructor() { }

  ngOnInit() {
  }

}
