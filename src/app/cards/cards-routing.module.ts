import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicCardsComponent } from "./basic/basic-cards.component";
import { QuaiTableComponent } from "./advanced/advanced-cards.component";
import { ChefGuard } from 'app/shared/auth/chef.guard';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { RespGuard } from 'app/shared/auth/resp.guard';

const routes: Routes = [
    {
        path: '',
        children: [{
            path: 'basic',
            component: BasicCardsComponent
        }, {
            path: 'advanced',
            component: QuaiTableComponent,
            canActivate :[RespGuard]
        }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CardsRoutingModule { }
