import { Component } from '@angular/core';
import { lineChartAutoScale } from 'app/shared/configs/ngx-charts.config';
import { DataTabQuaiService } from 'app/shared/services/dataTabQuai.service';
import { DataTabRemService } from 'app/shared/services/dataTabRem.service';
import { DataTabSiteService } from 'app/shared/services/dataTabSite.service';
import * as Chart from 'chart.js';
import * as chartsData from '../../shared/data/chartjs';

@Component({
  selector: 'app-chartjs',
  templateUrl: './chartjs.component.html',
  styleUrls: ['./chartjs.component.scss']
})

export class ChartjsComponent {
 
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
  lineChart: Array<any> = [];



  // lineChart
  chart = new Chart('canvas', {
    type: 'line',
    data: {
      labels: this.dataNR,
      datasets: [
        { 
          data: this.dataTE,
          borderColor: "#3cba9f",
          fill: false
        },
        { 
          data: this.dataTR,
          borderColor: "#ffcc00",
          fill: false
        },
      ]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: true
        }],
        yAxes: [{
          display: true
        }],
      }
    }
  });

  // areaChart
  public areaChartData = chartsData.areaChartData;
  public areaChartLabels = chartsData.areaChartLabels;
  public areaChartOptions = chartsData.areaChartOptions;
  public areaChartColors = chartsData.areaChartColors;
  public areaChartLegend = chartsData.areaChartLegend;
  public areaChartType = chartsData.areaChartType;

  // scatterChart
  public scatterChartData = chartsData.scatterChartData;
  public scatterChartLabels = chartsData.scatterChartLabels;
  public scatterChartOptions = chartsData.scatterChartOptions;
  public scatterChartColors = chartsData.scatterChartColors;
  public scatterChartLegend = chartsData.scatterChartLegend;
  public scatterChartType = chartsData.scatterChartType;

  // barChart
  public barChartOptions = chartsData.barChartOptions;
  public barChartLabels = chartsData.barChartLabels;
  public barChartType = chartsData.barChartType;
  public barChartLegend = chartsData.barChartLegend;
  public barChartData = chartsData.barChartData;
  public barChartColors = chartsData.barChartColors;

  // Doughnut
  public doughnutChartLabels = chartsData.doughnutChartLabels;
  public doughnutChartData = chartsData.doughnutChartData;
  public doughnutChartType = chartsData.doughnutChartType;
  public doughnutChartColors = chartsData.doughnutChartColors;
  public doughnutChartOptions = chartsData.doughnutChartOptions;

  // Radar
  public radarChartLabels = chartsData.radarChartLabels;

  public radarChartData = chartsData.radarChartData;
  public radarChartType = chartsData.radarChartType;
  public radarChartColors = chartsData.radarChartColors;
  public radarChartOptions = chartsData.radarChartOptions;


  // Pie
  public pieChartLabels = chartsData.pieChartLabels;
  public pieChartData = chartsData.pieChartData;
  public pieChartType = chartsData.pieChartType;
  public pieChartColors = chartsData.pieChartColors;
  public pieChartOptions = chartsData.pieChartOptions;

  // PolarArea
  public polarAreaChartLabels = chartsData.polarAreaChartLabels;
  public polarAreaChartData = chartsData.polarAreaChartData;
  public polarAreaLegend = chartsData.polarAreaLegend;
  public ploarChartColors = chartsData.ploarChartColors;
  public polarAreaChartType = chartsData.polarAreaChartType;
  public polarChartOptions = chartsData.polarChartOptions;

  // events
  public chartClicked(e: any): void {
    //your code here
  }

  public chartHovered(e: any): void {
    //your code here
  }
 
  constructor(private DataTabRService: DataTabRemService,private DataTabSService: DataTabSiteService,private DataTabQService: DataTabQuaiService) {
   console.log(this.dataTE), console.log("this.dataTE");; 
}

ngOnInit(): void {

    this.DataTabRService.getRemorqueList().subscribe(
        data => { console.log(data) ;
        
          data.forEach(element => {
      
            this.dataNR.push( {idRemorque : element['idRemorque'] } );
           
            
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

            this.lineChart=[

              { data: this.dataTR , label: 'TR' },
              { data: this.dataTE , label: 'TE' },
              
            ];
        }
      

  

}