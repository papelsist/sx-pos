import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import * as fromDevoluciones from './devoluciones.reducer';
import * as fromComs from './coms.reducer';
import * as fromDecs from './decs.reducer';
import * as fromSols from './sols.reducers';
import * as fromSectores from './sectores.reducer';
import * as fromConteos from './conteos.reducer';


// Embarques state
import * as fromFacturistas from './facturistas.reducers';
import * as fromChoferes from './choferes.reducer';
import * as fromTransportes from './transportes.reducre';
import * as fromEmbarques from './embarques.reducer';

export interface LogisticaState {
  devoluciones: fromDevoluciones.State
  coms: fromComs.State
  decs: fromDecs.State
  sols: fromSols.State
  sectores: fromSectores.State
  conteos: fromConteos.State
  facturistas: fromFacturistas.State
  choferes: fromChoferes.State
  transportes: fromTransportes.State
  embarques: fromEmbarques.State
}

export interface State extends fromRoot.State {
  logistica: LogisticaState;
}

export const reducers = {
  devoluciones: fromDevoluciones.reducer,
  coms: fromComs.reducer,
  decs: fromDecs.reducer,
  sols: fromSols.reducer,
  sectores: fromSectores.reducer,
  conteos: fromConteos.reducer,
  facturistas: fromFacturistas.reducer,
  choferes: fromChoferes.reducer,
  transportes: fromTransportes.reducer,
  embarques: fromEmbarques.reducer,
}; 

export const selectLogisticaState = createFeatureSelector<LogisticaState>('logistica');

// Devoluciones state selectors
export const selectDevolucionesState = createSelector(
  selectLogisticaState,
  (state: LogisticaState) => state.devoluciones
);

export const getSelectedDevolucion = createSelector(
  selectDevolucionesState,
  fromDevoluciones.getSelected
);

export const getDevoluciones = createSelector(
  selectDevolucionesState,
  fromDevoluciones.getEntities
)

export const getDevolucionesFilter = createSelector(
  selectDevolucionesState,
  fromDevoluciones.getFilter
);
export const getDevolucionesLoading = createSelector(
  selectDevolucionesState,
  fromDevoluciones.getLoading
);

/**** COMS state selectors */
export const selectComsState = createSelector(
  selectLogisticaState,
  (state: LogisticaState) => state.coms
);

export const getComs = createSelector(
  selectComsState,
  fromComs.getEntities
);
export const getComsLoading = createSelector(
  selectComsState,
  fromComs.getLoading
);
export const getSelectedCom = createSelector(
  selectComsState,
  fromComs.getSelected
);

// Decs state selctors
export const selectDecState = createSelector(
  selectLogisticaState,
  (state: LogisticaState) => state.decs
);

export const getDecs = createSelector(
  selectDecState,
  fromDecs.getEntities
);
export const getDecsLoading = createSelector(
  selectDecState,
  fromDecs.getLoading
);
export const getSelectedDec = createSelector(
  selectDecState,
  fromDecs.getSelected
);

/**** SOLS state selectors */
export const selectSolsState = createSelector(
  selectLogisticaState,
  (state: LogisticaState) => state.sols
);

export const getSols = createSelector(
  selectSolsState,
  fromSols.getEntities
);
export const getSolsLoading = createSelector(
  selectSolsState,
  fromSols.getLoading
);
export const getSelectedSol = createSelector(
  selectSolsState,
  fromSols.getSelected
);

/**** Sectores state selectors */
export const selectSectoresState = createSelector(
  selectLogisticaState,
  (state: LogisticaState) => state.sectores
);

export const getSectores = createSelector(
  selectSectoresState,
  fromSectores.getEntities
);
export const getSectoresLoading = createSelector(
  selectSectoresState,
  fromSectores.getLoading
);
export const getSelectedSector = createSelector(
  selectSectoresState,
  fromSectores.getSelected
);

/**** Conteos selectors */
export const selectConteoState = createSelector(
  selectLogisticaState,
  (state: LogisticaState) => state.conteos
);
export const getConteos = createSelector(
  selectConteoState,
  fromConteos.getEntities
);
export const getConteosLoading = createSelector(
  selectConteoState,
  fromConteos.getLoading
);
export const getSelectedConteo = createSelector(
  selectConteoState,
  fromConteos.getSelected
);

/**** EMBARQUES  */
/** Facturistas */
export const selectFacturistasState = createSelector(
  selectLogisticaState,
  (state: LogisticaState) => state.facturistas
);
export const getFacturistas = createSelector(
  selectFacturistasState,
  fromFacturistas.getEntities
);
export const getFacturistasLoading = createSelector(
  selectFacturistasState,
  fromFacturistas.getLoading
);
export const getSelectedFacturista = createSelector(
  selectFacturistasState,
  fromFacturistas.getSelected
);

/** Choferes */
export const selectChoferesState = createSelector(
  selectLogisticaState,
  (state: LogisticaState) => state.choferes
);
export const getChoferes = createSelector(
  selectChoferesState,
  fromChoferes.getEntities
);
export const getChoferesLoading = createSelector(
  selectChoferesState,
  fromChoferes.getLoading
);
export const getSelectedChofer = createSelector(
  selectChoferesState,
  fromChoferes.getSelected
);

/** Transportes */
export const selectTransportesState = createSelector(
  selectLogisticaState,
  (state: LogisticaState) => state.transportes
);
export const getTransportes = createSelector(
  selectTransportesState,
  fromTransportes.getEntities
);
export const getTransportesLoading = createSelector(
  selectTransportesState,
  fromTransportes.getLoading
);
export const getSelectedTransporte = createSelector(
  selectTransportesState,
  fromTransportes.getSelected
);

/** Embarque */
export const selectEmbarquesState = createSelector(
  selectLogisticaState,
  (state: LogisticaState) => state.embarques
);
export const getEmbarques = createSelector(
  selectEmbarquesState,
  fromEmbarques.getEntities
);
export const getEmbarquesLoading = createSelector(
  selectEmbarquesState,
  fromEmbarques.getLoading
);
export const getSelectedEmbarque = createSelector(
  selectEmbarquesState,
  fromEmbarques.getSelected
);
export const getEmbarquesPorSalir = createSelector(
  selectEmbarquesState,
  fromEmbarques.getEmbarquesPorSalir
)
