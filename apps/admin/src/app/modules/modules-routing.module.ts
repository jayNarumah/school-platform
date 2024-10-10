import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from '../layout/app.layout.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AppLayoutComponent,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./dashboard/dashboard.module').then(
                (m) => m.DashboardModule
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ModulesRoutingModule { }
