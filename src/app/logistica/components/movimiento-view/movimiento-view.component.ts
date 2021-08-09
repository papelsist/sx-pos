import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sx-movimiento-view',
  templateUrl: './movimiento-view.component.html',
  styleUrls: ['./movimiento-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovimientoViewComponent implements OnInit {

  @Input() movimiento = undefined;

  constructor() { }

  ngOnInit() {
  }

}
