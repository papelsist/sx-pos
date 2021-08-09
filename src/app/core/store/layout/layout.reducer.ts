import * as layout from './layout.actions';

export interface State {
  showSidenav: boolean;
  navegation?: [{path: string, nombre: string, descripcion: string, icon: string}]
}

const initialState: State = {
  showSidenav: false,
  navegation: [
    {path: '', nombre: 'Inicio', descripcion: 'Inicio del sistema', icon: 'home'}
    ]
};

export function reducer(state = initialState, action: layout.Actions): State {
  switch (action.type) {
    case layout.CLOSE_SIDENAV:
      return {
        showSidenav: false,
      };

    case layout.OPEN_SIDENAV:
      return {
        showSidenav: true,
      };

    default:
      return state;
  }
}

export const getShowSidenav = (state: State) => state.showSidenav;

export const getSideBarNavigation = (state: State) => state.navegation;
