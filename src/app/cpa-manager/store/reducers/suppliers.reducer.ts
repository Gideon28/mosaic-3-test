import { SuppliersAction, LOAD_SUPPLIERS_SUCCESS } from '../actions/suppliers.actions';
import { Supplier } from '../../models/supplier.model';

// TODO: may need to change after backend is ready
export interface State {
  suppliers: Supplier[];
}

export const initialState: State = {
  suppliers: []
};

export function reducer(state = initialState, action: SuppliersAction): State {
  switch (action.type) {
    case LOAD_SUPPLIERS_SUCCESS: {
      return {...state, suppliers: action.payload};
    }

    default:
      return state;
  }
}
