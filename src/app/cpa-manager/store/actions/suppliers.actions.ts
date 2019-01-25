import { Action } from '@ngrx/store';

import { Supplier } from '../../models/supplier.model';

export const LOAD_SUPPLIERS = '[CpaManager] Load Suppliers';
export const LOAD_SUPPLIERS_SUCCESS = '[CpaManager] Load Suppliers Success';

export interface SuppliersAction extends Action {
  type: string;
  payload?: any;
}

export class LoadSuppliers implements SuppliersAction {
  readonly type = LOAD_SUPPLIERS;

  constructor(public payload?: Supplier[]) {}
}

export class LoadSuppliersSuccess implements SuppliersAction {
  readonly type = LOAD_SUPPLIERS_SUCCESS;

  constructor(public payload?: Supplier[]) {}
}