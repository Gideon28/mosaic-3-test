import { Action } from '@ngrx/store';

import { Report } from '../../models/report.model';

export const LOAD_REPORTS = '[CpaManager] Load Reports';
export const LOAD_REPORTS_SUCCESS = '[CpaManager] Load Reports Success';

export interface ReportsAction extends Action {
  type: string;
  payload?: any;
}

export class LoadReports implements ReportsAction {
  readonly type = LOAD_REPORTS;

  constructor(public payload?: Report[]) {}
}

export class LoadReportsSuccess implements ReportsAction {
  readonly type = LOAD_REPORTS_SUCCESS;

  constructor(public payload?: Report[]) {}
}