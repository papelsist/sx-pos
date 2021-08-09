import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'sx-pedido-comentario-panel',
  template: `
  <td-expansion-panel label="Comentario" [expand]="'false'" >
    <div layout >
      <sx-comentario-field [parent]="parent" class="md-padding" flex></sx-comentario-field>  
    </div>
  </td-expansion-panel>
  `
})
export class PedidoComentarioPanelComponent implements OnInit {

  @Input() parent: FormGroup;
  
  constructor() { }

  ngOnInit() { }
}