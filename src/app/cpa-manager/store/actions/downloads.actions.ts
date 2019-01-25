import { Action } from '@ngrx/store';

import { Download } from '../../models/download.model';

export const LOAD_DOWNLOADS = '[CpaManager] Load Downloads';
export const LOAD_DOWNLOADS_SUCCESS = '[CpaManager] Load Downloads Success';

export interface DownloadsAction extends Action {
  type: string;
  payload?: any;
}

export class LoadDownloads implements DownloadsAction {
  readonly type = LOAD_DOWNLOADS;

  constructor(public payload?: Download[]) {}
}

export class LoadDownloadsSuccess implements DownloadsAction {
  readonly type = LOAD_DOWNLOADS_SUCCESS;

  constructor(public payload?: Download[]) {}
}