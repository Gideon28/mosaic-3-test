import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';

import { CpaManagerService } from '../../service/cpa-manager.service';
import { LOAD_SUPPLIERS, LoadSuppliersSuccess, LoadSuppliers} from '../actions/suppliers.actions';
import { Supplier } from '../../models/supplier.model';

@Injectable()
export class SuppliersEffects {

  constructor(private actions$: Actions,
              private cpaManagerService: CpaManagerService) {

  }

  @Effect()
  loadSuppliers$ = this.actions$.pipe(
    ofType(LOAD_SUPPLIERS),
    switchMap((action: LoadSuppliers) => {
      return this.cpaManagerService.fetchSuppliers().pipe(
        tap(data => console.log(data)),
        map((data: Supplier[]) => new LoadSuppliersSuccess(data))
      );

    })
  );
}
