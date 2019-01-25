import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromReports from './reports.reducer';
import * as fromSuppliers from './suppliers.reducer';
import * as fromDownloads from './downloads.reducer';

export interface CpaState {
  reportsManager: fromReports.State;
  suppliersManager: fromSuppliers.State;
  downloadsManager: fromDownloads.State;
}

export const reducers: ActionReducerMap<CpaState> = {
  reportsManager: fromReports.reducer,
  suppliersManager: fromSuppliers.reducer,
  downloadsManager: fromDownloads.reducer
};

export const getCpaMangerState = createFeatureSelector('cpa-manager');
export const getReportsState = createSelector(getCpaMangerState, (state: CpaState) => state.reportsManager.reports);
export const getDownloadsState = createSelector(getCpaMangerState, (state: CpaState) => state.downloadsManager.downloads);
export const getSuppliersState = createSelector(getCpaMangerState, (state: CpaState) => state.suppliersManager.suppliers);
