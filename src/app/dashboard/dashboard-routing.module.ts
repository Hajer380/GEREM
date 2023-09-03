import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard1Component } from "./dashboard1/dashboard1.component";
import { Dashboard2Component } from "./dashboard2/dashboard2.component";
import { ChefGuard } from '../shared/auth/chef.guard';
import { Full_ROUTES } from 'app/shared/routes/full-layout.routes';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { RespGuard } from 'app/shared/auth/resp.guard';

const routes: Routes = [
  {
    path: 'GRMK',
   
        component: Dashboard1Component,
        data: {
          title: 'Dashboard 1'
        },
         children: Full_ROUTES, 
         //canActivate : [AuthGuard , ChefGuard , RespGuard ]



   /*  children: [
      {
        path: 'dashboard1',
        component: Dashboard1Component,
        data: {
          title: 'Dashboard 1'
        },
         children: Full_ROUTES, 

       
      },
      {
        path: 'dashboard2',
        component: Dashboard2Component,
        data: {
          title: 'DashboardD 2',
       
        }
        , children: Full_ROUTES, 
    
      },
    ] */
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
