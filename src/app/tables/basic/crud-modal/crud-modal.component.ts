import { Component, Output, EventEmitter, Input, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTabQuaiService } from 'app/shared/services/dataTabQuai.service';
import { DataTabRemService } from 'app/shared/services/dataTabRem.service';
import { DataTabSiteService } from 'app/shared/services/dataTabSite.service';

import { SiteModel } from './class';

@Component({
  selector: 'app-crud-modal',
  templateUrl: './crud-modal.component.html',
  styleUrls: ['./crud-modal.component.scss']
})
export class CrudModalComponent implements OnInit{

  myForm : FormGroup;
  showAdd!: boolean ;
  showUpdate !: boolean ;
  listQuai ;
  listRemorque ;
  IsDataReady ;
  
 NSite:  SiteModel   = new SiteModel();


  constructor(private DataTabSService: DataTabSiteService,private DataTabQService :DataTabQuaiService,private DataTabRService: DataTabRemService,
   public activeModal: NgbActiveModal,
   private formBuilder: FormBuilder
  ) {
    this.DataTabQService.getQuaiList().subscribe(
      data => { console.log(data) ;
    
          this.listQuai= data
     
          console.info('this.rows');console.info(this.listQuai);
          this.IsDataReady = true;
      }, error => { console.log(error) })

      this.DataTabRService.getRemorqueList().subscribe(
        data => { console.log(data) ;
      
            this.listRemorque= data
       
            console.info('this.listRemorque');console.info(this.listRemorque);
            this.IsDataReady = true;
        }, error => { console.log(error) })


      
 
  }

  ngOnInit():void  {
    this.myForm = this.formBuilder.group({
      local: ['', Validators.required],
      nomSite: ['', Validators.required],
      dateEAPL: ['', Validators.required],
      timeRAPL: ['', Validators.required],
      timeSPL: ['', Validators.required],
      qaui :['', Validators.required],
      remorque :['', Validators.required],
    });
  }


  addSite() {
    console.log("myform.value");
    console.log(this.myForm.value);    
    
    console.log("this.NSite");
    console.log(this.NSite);



    this.showAdd= true ;
    this.showUpdate= false ;
       this.NSite.local=this.myForm.value.local ;
      this.NSite.nomSite =this.myForm.value.nomSite ;
      this.NSite.dateEAPL=this.myForm.value.dateEAPL ;
      this.NSite.timeRAPL =this.myForm.value.timeRAPL;
      this.NSite.qaui = {"idQuai" : this.myForm.value.qaui};
      this.NSite.remorque={"idRemorque" : this.myForm.value.remorque};
      this.NSite.timeSPL=this.myForm.value.timeSPL;


      this.DataTabSService.addSite(this.NSite).subscribe(response => {
        console.log(response);
        console.log("oui ")
        alert("Ajouté avec succés ")
        let ref = document.getElementById("close ")
        ref?.click()
        this.myForm.reset()
        this.DataTabSService.getSite()
        ɵɵqueryRefresh ;
      },

      error => {alert("erreur veuillez verifier les donnes inserés  ")
        console.log(error),console.log("no");
      });}

      clickAdd(){
        this.myForm.reset();
        this.showAdd = true ;
        this.showUpdate = false ;
      }
      
      editSite(row :any) {
        this.showAdd= false ;
        this.showUpdate= true ;
       
        this.myForm.controls["id"].setValue(row.id) ;
        this.myForm.controls["local"].setValue(row.local) ;
       this.myForm.controls["nomSite"].setValue(row.nomSite);
       this.myForm.controls["dateEAPL"].setValue(row.dateEAPL) ;
       this.myForm.controls["timeRAPL"].setValue(row.timeRAPL);
       this.myForm.controls["nomQuai"].setValue(row.nomQuai);
       this.myForm.controls["nomRemorque"].setValue(row.nomRemorque);
       this.myForm.controls["timeSPL"].setValue(row.timeSPL);
 
      }

      updateSite() {

        this.NSite.local=this.myForm.value.local ;
       this.NSite.nomSite =this.myForm.value.nomSite ;
       this.NSite.dateEAPL=this.myForm.value.dateEAPL ;
       this.NSite.timeRAPL =this.myForm.value.timeRAPL;
       this.NSite.qaui=this.myForm.value.idQuai;
       this.NSite.remorque=this.myForm.value.idRemorque;
       this.NSite.timeSPL=this.myForm.value.timeSPL;
 
 
       this.DataTabSService.updateSite(this.NSite,this.NSite.id ).subscribe(response => {
         console.log(response);
         console.log("oui ")
         alert("Modifié avec succés ")
         let ref = document.getElementById("close ")
         ref?.click()
         this.myForm.reset()
         this.DataTabSService.getSite()
         ɵɵqueryRefresh ;
       },
 
       error => {alert("erreur veuillez verifier les donnes inserés  ")
         console.log(error),console.log("no");
       });}
 

  
  
  submitForm() {
    this.activeModal.close(this.myForm.value);
  }

}
