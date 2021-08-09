export interface Modulo {
  id: number;
  nombre: string;
  descripcion: string;
  path: string;
  icon?: string;
  routes?: Array<any>;
  roles?: string[];
  role?: string;
}
