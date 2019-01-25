import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';

import { CpaManagerService } from '../../service/cpa-manager.service';
import { LOAD_REPORTS, LoadReportsSuccess, LoadReports } from '../actions/reports.actions';
import { Report } from '../../models/report.model';

@Injectable()
export class ReportsEffects {

  constructor(private actions$: Actions,
              private cpaManagerService: CpaManagerService) {

  }

  @Effect()
  loadReports$ = this.actions$.pipe(
    ofType(LOAD_REPORTS),
    switchMap((action: LoadReports) => {
      return this.cpaManagerService.fetchReports().pipe(
        tap(data => console.log(data)),
        map((data: Report[]) => new LoadReportsSuccess(data))
      );

    })
  );
}
