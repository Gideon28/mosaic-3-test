import { DownloadsAction, LOAD_DOWNLOADS_SUCCESS} from '../actions/downloads.actions';
import { Download } from '../../models/download.model';

// TODO: may need to change after backend is ready
export interface State {
  downloads: Download[];
}

export const initialState: State = {
  downloads: []
};

export function reducer(state = initialState, action: DownloadsAction): State {
  switch (action.type) {
    case LOAD_DOWNLOADS_SUCCESS: {
      return {...state, downloads: action.payload};
    }

    default:
      return state;
  }
}
