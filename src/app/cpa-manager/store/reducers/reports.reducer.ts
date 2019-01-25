import { ReportsAction, LOAD_REPORTS_SUCCESS } from '../actions/reports.actions';
import { Report } from '../../models/report.model';

// TODO: may need to change after backend is ready
export interface State {
  reports: Report[];
}

export const initialState: State = {
  reports: []
};

export function reducer(state = initialState, action: ReportsAction): State {
  switch (action.type) {
    case LOAD_REPORTS_SUCCESS: {
      return {...state, reports: action.payload};
    }

    default:
      return state;
  }
}
