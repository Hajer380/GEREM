import { Component } from '@angular/core';
import { barChartSingle, barChartmulti, pieChartSingle, pieChartmulti, lineChartSingle,areaChartSingle, areaChartMulti, lineChartMulti } from '../../shared/data/ngxChart';
import * as chartsData from '../../shared/configs/ngx-charts.config';
import { DataTabSiteService } from 'app/shared/services/dataTabSite.service';
import { DataTabRemService } from 'app/shared/services/dataTabRem.service';
import { DataTabQuaiService } from 'app/shared/services/dataTabQuai.service';

@Component({
    selector: 'app-ngx',
    templateUrl: './ngx-charts.component.html',
    styleUrls: ['./ngx-charts.component.scss']
})

export class NGXChartsComponent {

    //Chart Data
    dataline = {
        "name": "TR",
        "series": []
      };       

    lineChartMulti = this.dataline;
    areaChartMulti = areaChartMulti;
    barChartmulti = barChartmulti;
    pieChartSingle = pieChartSingle;

    //Bar Charts
    barChartView: any[] = chartsData.barChartView;

    // options
    barChartShowYAxis = chartsData.barChartShowYAxis;
    barChartShowXAxis = chartsData.barChartShowXAxis;
    barChartGradient = chartsData.barChartGradient;
    barChartShowLegend = chartsData.barChartShowLegend;
    barChartShowXAxisLabel = chartsData.barChartShowXAxisLabel;
    barChartXAxisLabel = chartsData.barChartXAxisLabel;
    barChartShowYAxisLabel = chartsData.barChartShowYAxisLabel;
    barChartYAxisLabel = chartsData.barChartYAxisLabel;
    barChartColorScheme = chartsData.barChartColorScheme;

    //Pie Charts

    pieChartView: any[] = chartsData.pieChartView;

    // options
    pieChartShowLegend = chartsData.pieChartShowLegend;

    pieChartColorScheme = chartsData.pieChartColorScheme;

    // pie
    pieChartShowLabels = chartsData.pieChartShowLabels;
    pieChartExplodeSlices = chartsData.pieChartExplodeSlices;
    pieChartDoughnut = chartsData.pieChartDoughnut;
    pieChartGradient = chartsData.pieChartGradient;

    pieChart1ExplodeSlices = chartsData.pieChart1ExplodeSlices;
    pieChart1Doughnut = chartsData.pieChart1Doughnut;


    //Line Charts

    lineChartView: any[] = chartsData.lineChartView;

    // options
    lineChartShowXAxis = chartsData.lineChartShowXAxis;
    lineChartShowYAxis = chartsData.lineChartShowYAxis;
    lineChartGradient = chartsData.lineChartGradient;
    lineChartShowLegend = chartsData.lineChartShowLegend;
    lineChartShowXAxisLabel = chartsData.lineChartShowXAxisLabel;
    lineChartXAxisLabel = chartsData.lineChartXAxisLabel;
    lineChartShowYAxisLabel = chartsData.lineChartShowYAxisLabel;
    lineChartYAxisLabel = chartsData.lineChartYAxisLabel;

    lineChartColorScheme = chartsData.lineChartColorScheme;

    // line, area
    lineChartAutoScale = chartsData.lineChartAutoScale;
    lineChartLineInterpolation = chartsData.lineChartLineInterpolation;

    //Area Charts

    areaChartView = chartsData.areaChartView;

    // options
    areaChartShowXAxis = chartsData.areaChartShowXAxis;
    areaChartShowYAxis = chartsData.areaChartShowYAxis;
    areaChartGradient = chartsData.areaChartGradient;
    areaChartShowLegend = chartsData.areaChartShowLegend;
    areaChartShowXAxisLabel = chartsData.areaChartShowXAxisLabel;
    areaChartXAxisLabel = chartsData.areaChartXAxisLabel;
    areaChartShowYAxisLabel = chartsData.areaChartShowYAxisLabel;
    areaChartYAxisLabel = chartsData.areaChartYAxisLabel;

    areaChartColorScheme = chartsData.areaChartColorScheme;

    // line, area
    areaChartAutoScale = chartsData.areaChartAutoScale;
    areaChartLineInterpolation = chartsData.areaChartLineInterpolation;

    IsDataReady ;
    dataTE :any = [
        { 
            data: []
        }
    ];
      dataNR :any = [
        { 
            data: []
        }
    ];
      dataTR:any = [
        { 
            data: []
        }
    ];
    constructor(private DataTabRService: DataTabRemService,private DataTabSService: DataTabSiteService,private DataTabQService: DataTabQuaiService) {
        Object.assign(this, { barChartmulti, pieChartSingle,  lineChartMulti,  areaChartMulti })
    }

    ngOnInit(): void {

        this.DataTabSService.getSite().subscribe(
            data => { console.log(data) ;
            
              data.forEach(element => {
          
                this.dataNR.push( element ['nomRemorque'] );
               
                
                this.IsDataReady = true;});
            }, error => { console.log(error) })
            console.info('NR');console.info(this.dataNR);
          
          
           //extraction TEMPS REEL ENTREE REMORQUE  
          
          
            
            this.DataTabSService.getSite().subscribe(
              data => { console.log(data) ;
              
                 data.forEach(element => {
          
                  this.dataTR.push(  new Date(element['timeRAPL']).getHours()+":"+new Date(element['timeRAPL']).getMinutes() );
                  
                  
                  this.IsDataReady = true;});
              }, error => { console.log(error) })
              console.info('TR');console.info(this.dataTR);
          
          //extraction TEMPS ESTIME ENTREE REMORQUE  
          
              
              this.DataTabSService.getSite().subscribe(
                data => { console.log(data) ;
                
                  data.forEach(element => {
            
                    this.dataTE.push(  new Date(element['timeESP']).getHours()+":"+new Date(element['timeESP']).getMinutes());              
                 
                    this.IsDataReady = true;});
                }, error => { console.log(error) })
                 
                console.info('TE');
                console.info(this.dataTE);

                this.DataTabSService.getSite().subscribe(
                    data => { console.log(data) ;
                    
                      data.forEach(element => {
                
                        this.dataline["series"].push(  
                            {
                              
                                    "name": "TEST1",
                                    "value": new Date(element['timeRAPL']).getHours()+":"+new Date(element['timeRAPL']).getMinutes()
                                  
                               
                              }
                            
                            
                            
                            //new Date(element['timeESP']).getHours()+":"+new Date(element['timeESP']).getMinutes()
                            );              
                     
                        this.IsDataReady = true;});
                    }, error => { console.log(error) })
          
            }
          
            /**/
    
    onSelect(event) {
       //your code here
    }

}