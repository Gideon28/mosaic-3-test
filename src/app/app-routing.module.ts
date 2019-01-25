import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CpaManagerComponent } from './cpa-manager/cpa-manager.component';
import { ErrorPageComponent } from './core/components/error-page/error-page.component';

const routes: Routes = [
  {path: 'cpa-manager', component: CpaManagerComponent},
  {path: 'error', component: ErrorPageComponent},
  {path: '', component: CpaManagerComponent},
  {path: '**', redirectTo: '/error', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
