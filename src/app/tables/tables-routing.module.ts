import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicComponent } from "./basic/basic.component";
import { ExtendedTableComponent } from "./extended/extended-table.component";
import { TablesComponent } from './angular/tables.component';
import { AuthGuard } from '../shared/auth/auth-guard.service';
import { ChefGuard } from 'app/shared/auth/chef.guard';
import { RespGuard } from 'app/shared/auth/resp.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        component: BasicComponent,
        data: {
          title: 'Basic Table'
        }
        ,
     canActivate : [RespGuard]
      
        
      },
      {
        path: 'extended',
        component: ExtendedTableComponent,
        data: {
          title: 'Extended Table',
         
        },
        canActivate : [ChefGuard]

          
      },
      {
        path: 'tables',
        component: TablesComponent,
        data: {
          title: 'Angular Table'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }
