import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { CardsRoutingModule } from "./cards-routing.module";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from "../shared/directives/match-height.directive";

import { QuaiTableComponent } from "./advanced/advanced-cards.component";
import { BasicCardsComponent } from "./basic/basic-cards.component";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TablesRoutingModule } from 'app/tables/tables-routing.module';

@NgModule({
    imports: [
        CommonModule,
        CardsRoutingModule,
        NgxChartsModule,
        NgbModule,
        MatchHeightModule,
        CommonModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        TablesRoutingModule,
        NgxDatatableModule,
        HttpClientModule

    ],
    declarations: [
        BasicCardsComponent,
        QuaiTableComponent
    ]
})
export class CardsModule { }
