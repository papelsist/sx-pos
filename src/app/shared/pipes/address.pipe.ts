import { Pipe, PipeTransform } from '@angular/core';
import {Direccion} from '../../models/direccion';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(value: Direccion, args?: any): string {
    return `${value.calle} / ${value.colonia}`;
  }

}
