import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { ChefGuard } from 'app/shared/auth/chef.guard';
import { RespGuard } from 'app/shared/auth/resp.guard';
import { Full_ROUTES } from 'app/shared/routes/full-layout.routes';
import { DataTablesComponent } from './data-tables.component';



const routes: Routes = [
  {
    path: '',
    component: DataTablesComponent,
    data: {
      title: 'DataTable',
     },
     canActivate : [ChefGuard]
    
    },
   

    
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataTablesRoutingModule { }
