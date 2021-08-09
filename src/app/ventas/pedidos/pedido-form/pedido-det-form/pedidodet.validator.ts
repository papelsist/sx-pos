import { AbstractControl, FormArray, ValidatorFn } from '@angular/forms';

/**
 * Valida algunos datos generales del pedido
 *
 * @param {AbstractControl} control
 * @returns {{[p: string]: boolean}}
 * @constructor
 */
export const PedidodetValidator = (
  control: AbstractControl
): { [key: string]: boolean } => {
  const existenciaLocal = control.get('existencia').value;
  const existencia = existenciaLocal ? existenciaLocal.disponible : 0;
  const cantidad = control.get('cantidad').value;
  const sinExistencia = control.get('sinExistencia').value;

  if (cantidad > existencia) {
    const re = !sinExistencia ? { sinExistencia: true } : null;
    return re;
  }

  return null;
};
