import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[sxToUpperCase]',
})
export class ToUpperCaseDirective {

  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  value: any;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) { }

  /*@HostListener('input', ['$event']) onInputChange($event) {
    this.value = $event.target.value.toUpperCase();
    this.ngModelChange.emit(this.value);
  }*/


  @HostListener('keyup') onKeyUp() {
    this.el.nativeElement.value = this.el.nativeElement.value.toUpperCase();

  }

}
