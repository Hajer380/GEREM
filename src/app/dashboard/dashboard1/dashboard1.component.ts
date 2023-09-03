
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from "ng-chartist";
import ChartistTooltip from 'chartist-plugin-tooltips-updated';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexDataLabels,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexLegend,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  ApexTheme,
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";

import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
//import { DatatableData } from '../data/datatables.data';
import {
  ColumnMode,
  DatatableComponent,
  elementsFromPoint,
  SelectionType
} from '@swimlane/ngx-datatable';
import { HttpClient } from '@angular/common/http';
import { debounceTime, map } from 'rxjs/operators';
import { DataTabRemService } from 'app/shared/services/dataTabRem.service';
import { DataTabSiteService } from 'app/shared/services/dataTabSite.service';
import { DataTabQuaiService } from 'app/shared/services/dataTabQuai.service';
import { fromEvent } from 'rxjs';

Component({
  selector: 'app-dashboard',
  templateUrl: 'src/app/dashboard/dashboard1/dashboard1.component.html',
  styleUrls: ['src/app/dashboard/dashboard1/dashboard1.component.scss'],
})


declare var require: any;

const data: any = require('../../shared/data/chartist.json');


  export type ChartOptions = {
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;
    colors: string[],
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis | ApexYAxis[],
    title: ApexTitleSubtitle;
    dataLabels: ApexDataLabels,
    stroke: ApexStroke,
    grid: ApexGrid,
    legend?: ApexLegend,
    tooltip?: ApexTooltip,
    plotOptions?: ApexPlotOptions,
    labels?: string[],
    fill: ApexFill,
    markers?: ApexMarkers,
    theme: ApexTheme,
    responsive: ApexResponsive[]
  
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
  // plugins?: any;
}

var $primary = "#975AFF",
  $success = "#40C057",
  $info = "#2F8BE6",
  $warning = "#F77E17",
  $danger = "#F55252",
  $label_color_light = "#E6EAEE";
var themeColors = [$primary, $warning, $success, $danger, $info];

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss']
})

export class Dashboard1Component implements OnInit {

 // public
 public contentHeader: object;
 mixedChartOptions : Partial<ChartOptions>;
 pieChartOptions : Partial<ChartOptions>;
donutChartOptions : Partial<ChartOptions>;
 // row data
 public rows =[];
 IsDataReady:boolean

 // column header
 public columns = [
   { name: 'nomRemorque', prop: 'nomRemorque' },
   { name: 'NomSite', prop: 'nomSite' },
   { name: 'DateEAPL', prop: 'dateEAPL' },
   { name: 'Local', prop: 'local' },
   { name: 'degUrg', prop: 'degUrg' },
   { name: 'nomQuai', prop: 'nomQuai' },
   { name: 'IdSite', prop: 'idSite' },
   
   ];

 // multi Purpose datatable Row data
 ////////////////public multiPurposeRows = DatatableData;

 public ColumnMode = ColumnMode;

 @ViewChild(DatatableComponent) table: DatatableComponent;
 @ViewChild('tableRowDetails') tableRowDetails: any;
 @ViewChild('tableResponsive') tableResponsive: any;

 public expanded: any = {};

 public editing = {};

 public chkBoxSelected = [];
 public SelectionType = SelectionType;

 // server side row data
 public serverSideRowData;

 // private
 private tempData = [];
 private multiPurposeTemp = [];
 private http: HttpClient;
 //DataTableService: DataTabService;
 @ViewChild('search', { static: false }) search: any;
 public temp: Array<object> = [];


 /**
  * inlineEditingUpdate
  *
  * @param event
  * @param cell
  * @param rowIndex
  */
 inlineEditingUpdate(event, cell, rowIndex) {
   this.editing[rowIndex + '-' + cell] = false;
   this.rows[rowIndex][cell] = event.target.value;
   
 }
 ngAfterViewInit(): void {
  // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  // Add 'implements AfterViewInit' to the class.
  fromEvent(this.search.nativeElement, 'keydown')
    .pipe(
      debounceTime(550),
      map(x => x['target']['value'])
    )
    .subscribe(value => {
      this.updateFilter(value);
    });
}


updateFilter(val: any) {
   
  console.log("val");
  console.log(val);
 const value = val.toString().toLowerCase().trim();
 // get the amount of columns in the table
 const count = this.columns.length;
 // get the key names of each column in the dataset
 const keys = Object.keys(this.temp[0]);
 // assign filtered matches to the active datatable
 this.rows = this.temp.filter(item => {
   // iterate through each row's column data
   for (let i = 0; i < count; i++) {
     // check for a match
     if (
       (item[keys[i]] &&
         item[keys[i]]
           .toString()
           .toLowerCase()
           .indexOf(value) !== -1) ||
       !value
     ) {
       // found match, return true to add to result set
       return true;
     }
   }
 });

 // Whenever the filter changes, always go back to the first page
 // this.table.offset = 0;
}

 /**
  * filterUpdate
  *
  * @param code
  */

 filterUpdate(event) {
   const val = event.target.value.toLowerCase();

   // filter our data
   const temp = this.tempData.filter(function (d) {
     return d.full_name.toLowerCase().indexOf(val) !== -1 || !val;
   });

   // update the rows
   this.rows = temp;
   // Whenever the filter changes, always go back to the first page
   this.table.offset = 0;
 }

 /**
  * rowDetailsToggleExpand
  *
  * @param row
  */
 rowDetailsToggleExpand(row) {
   this.tableRowDetails.rowDetail.toggleExpandRow(row);
 }

 /**
  * toggleExpandRowResponsive
  *
  * @param row
  */
 toggleExpandRowResponsive(row) {
   this.tableResponsive.rowDetail.toggleExpandRow(row);
 }

 /**
  * customChkboxOnSelect
  *
  * @param { selected }
  */
 customChkboxOnSelect({ selected }) {
   this.chkBoxSelected.splice(0, this.chkBoxSelected.length);
  //  this.chkBoxSelected.push(...selected);
 }

 /**
  * serverSideSetPage
  *
  * @param event
  */
 serverSideSetPage(event) {
   this.http
     .get('assets/data/datatable-data.json')
     .pipe(map((data) => data as Array<any>))
     .subscribe((data) => {
       this.serverSideRowData = data;
     });
 }

 /**
  * MultiPurposeFilterUpdate
  *
  * @param event
  */
 MultiPurposeFilterUpdate(event) {
   const val = event.target.value.toLowerCase();

   // filter our data
   const temp = this.multiPurposeTemp.filter(function (d) {
     return d.full_name.toLowerCase().indexOf(val) !== -1 || !val;
   });

   // update the rows
   //this.multiPurposeRows = temp;
   // Whenever the filter changes, always go back to the first page
   this.table.offset = 0;
 }

 /**
  * Constructor
  *
  * @param {HttpClient} http
  */

 /*  constructor( http: HttpClient) {
   this.tempData = DatatableData;
   this.multiPurposeTemp = DatatableData;
 }  */

 constructor(private DataTabRService: DataTabRemService,private DataTabSService: DataTabSiteService,private DataTabQService: DataTabQuaiService) {
   this.IsDataReady = false;
   console.log("this.rows");
   console.log(this.rows);

   



   this.DataTabSService.getSite().subscribe(
     data => { console.log(data) }, error => { console.log(error) })

     this.DataTabQService.getQuaiList().subscribe(
       data => { console.log(data) }, error => { console.log(error) })  



   this.DataTabRService.getRemById(2).subscribe(
     data => { console.log(data) }, error => { console.log(error) })

     this.mixedChartOptions = {
      chart: {
        height: 350,
        type: 'line',
        stacked: false,
      },
      colors: themeColors,
      stroke: {
        width: [0, 2, 5],
        curve: 'smooth'
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        }
      },
      series: [{
        name: 'Temps Reel',
        type: 'column',
        data: this.dataTR ,
      }, {
        name: 'Temps Estimé',
        type: 'area',
        data: this.dataTE ,
      }],
      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
     labels: this.dataNR,
      markers: {
        size: 0
      },
      legend: {
        offsetY: -20
      },
      xaxis: {
        title: {offsetX : 390 ,
          text: 'Nom Remorque'
        },
       
      },
      
      yaxis: {
        title: {
          text: 'Temps en HHmm'
        }
      
      },
      tooltip: {
        shared: true,
        intersect: false,
       
       
      } 
    }
    this.pieChartOptions = {
      chart: {
        type: 'pie',
        height: 320
      },
      colors: themeColors,
      labels: ['Quai 1', 'Quai 2 ', 'Quai 3'],
      series: [44, 55, 13],
      legend: {
        itemMargin: {
          horizontal: 2
        },
      },
      responsive: [{
        breakpoint: 576,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }

    this.donutChartOptions = {
      chart: {
        type: 'pie',
        height: 320
      },
      colors: themeColors,
      labels: ['Quai 1', 'Quai 2 ', 'Quai 3'],
      series: [44,  41, 17],
      legend: {
        itemMargin: {
          horizontal: 2
        },
      },
      responsive: [{
        breakpoint: 576,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }




 }

 dataTE :any = ["1338"
];
  dataNR :any = ["Rem 1"
    
];
  dataTR:any = ["1300"
   
];
dataRetard :any=["10"];






 // Lifecycle Hooks
 // -----------------------------------------------------------------------------------------------------

 /**
  * On init
  */
 ngOnInit() {

  

   this.DataTabSService.getSite().subscribe(
     data => { console.log(data) ;
     
       data.forEach(element => {
 
         this.rows.push({nomRemorque : element['remorque']['nomRemorque'],degUrg : element['remorque']['degUrg'], nomSite : element["nomSite"] ,local : element["local"],nomQuai : element['qaui']['nomQuai']  , dateEAPL : element['dateEAPL'] ,idSite : element['idSite']} );}
    


         );
         console.info('this.rows');console.info(this.rows);
         this.IsDataReady = true;
     }, error => { console.log(error) })

     this.temp=this.rows;
      // -----------------------------------------------------------------------------------------------------
    
    //extraction des donnes 

    this.DataTabSService.getSite().subscribe(
      data => { console.log(data) ;
      
         data.forEach(element => {
  
          this.dataRetard.push(element['timeRAPL']-element['timeESP'] )
            
          this.IsDataReady = true;});
      }, error => { console.log(error) })
      console.info('dataRetard');console.info(this.dataRetard);

    //extraction NOM REMORQUE  


this.DataTabRService.getRemorqueList().subscribe(
  data => { console.log(data) ;

    data.forEach(element => {

      this.dataNR.push( element['nomRemorque'] );
     
      
      this.IsDataReady = true;})
  }, error => { console.log(error) })
  console.info('NR');console.info(this.dataNR);


 //extraction TEMPS REEL ENTREE REMORQUE  


  
  this.DataTabSService.getSite().subscribe(
    data => { console.log(data) ;
    
       data.forEach(element => {

        this.dataTR.push(element['timeRAPL'] )
          
        this.IsDataReady = true;});
    }, error => { console.log(error) })
    console.info('TR');console.info(this.dataTR);

//extraction TEMPS ESTIME ENTREE REMORQUE  

    
    this.DataTabSService.getSite().subscribe(
      data => { console.log(data) ;
      
        data.forEach(element => {
  
          this.dataTE.push(element['timeESP']);              
       
          this.IsDataReady = true;});
      }, error => { console.log(error) })
       
      console.info('TE');console.info(this.dataTE);
      ;



  
   // Initially load first page


   this.serverSideSetPage({ offset: 0 });

   // content header
   this.contentHeader = {
     headerTitle: 'Datatables',
     actionButton: true,
     breadcrumb: {
       type: '',
       links: [
         {
           name: 'Home',
           isLink: true,
           link: '#'
         },
         {
           name: 'Forms & Tables',
           isLink: true,
           link: ''
         },
         {
           name: 'Datatables',
           isLink: false
         }
       ]
     }
   };
 }

 

 

  onResized(event: any) {
    setTimeout(() => {
      this.fireRefreshEventOnWindow();
    }, 300);
  }

  fireRefreshEventOnWindow = function () {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("resize", true, false);
    window.dispatchEvent(evt);
  };

}
