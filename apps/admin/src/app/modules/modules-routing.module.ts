import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from '../layout/app.layout.component';

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
export class ModulesRoutingModule {}
