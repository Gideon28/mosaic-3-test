import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';

import { CpaManagerService } from '../../service/cpa-manager.service';
import {LOAD_DOWNLOADS, LoadDownloadsSuccess, LoadDownloads} from '../actions/downloads.actions';
import { Download } from '../../models/download.model';

@Injectable()
export class DownloadsEffects {

  constructor(private actions$: Actions,
              private cpaManagerService: CpaManagerService) {}

  @Effect()
  loadDownloads$ = this.actions$.pipe(
    ofType(LOAD_DOWNLOADS),
    switchMap((action: LoadDownloads) => {
      return this.cpaManagerService.fetchDownloads().pipe(
        tap(data => console.log('From download.effects: ', data)),
        map((data: Download[]) => new LoadDownloadsSuccess(data))
      );

    })
  );
}
