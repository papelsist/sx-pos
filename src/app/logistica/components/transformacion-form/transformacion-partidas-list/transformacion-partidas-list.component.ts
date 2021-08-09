import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TdDialogService, TdVirtualScrollContainerComponent } from '@covalent/core';

@Component({
  selector: 'sx-transformacion-partidas-list',
  templateUrl: './transformacion-partidas-list.component.html',
  styleUrls: ['./transformacion-partidas-list.component.scss']
})
export class TransformacionPartidasListComponent implements OnInit {

  @Input() parent: FormGroup;

  @Input() editable = true;

  @Output() delete = new EventEmitter();

  @Input() partidas: Array<any> = [];

  @ViewChild(TdVirtualScrollContainerComponent) listContainer: TdVirtualScrollContainerComponent;

  constructor(
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
  }

  onDelete(index: number) {
    this.delete.emit(index);
  }

  mostrarCortes(row) {
    this._dialogService.openAlert({
      message: `Cortes: ${row.cortes}  Instrucción: ${row.cortesInstruccion ? row.cortesInstruccion : ''}`,
      viewContainerRef: this._viewContainerRef, //OPTIONAL
      title: 'Cortes', //OPTIONAL, hides if not provided
      closeButton: 'Cerrar', //OPTIONAL, defaults to 'CLOSE'
    });
  }

  scrollToLast() {
    this.listContainer.scrollToEnd();
  }
  scrollToStart() {
    this.listContainer.scrollToStart();
  }

}
