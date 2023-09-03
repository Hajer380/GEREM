import { Component, Output, EventEmitter, Input, OnInit, ɵɵqueryRefresh, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTabRemService } from 'app/shared/services/dataTabRem.service';
import { DataTabQuaiService } from 'app/shared/services/dataTabQuai.service';
import { RemorqueModel } from './class';
import { DataTablesComponent } from '../data-tables.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-modal',
  templateUrl: './crud-modal.component.html',
  styleUrls: ['./crud-modal.component.scss']
})
export class CrudModalComponent implements OnInit{

  myForm : FormGroup;
  showAdd!: boolean ;
  showUpdate !: boolean ;
  listQuai;
  IsDataReady ;
  
  @ViewChild('editremorque') editremorque: ElementRef;

 Nremorque:  RemorqueModel   = new RemorqueModel();


  constructor(private DataTabComponent: DataTablesComponent,private DataTabRService: DataTabRemService,
    private DataTabQService :DataTabQuaiService,
   public activeModal: NgbActiveModal,
   private formBuilder: FormBuilder
  ) {
     this.DataTabQService.getQuaiList().subscribe(
      data => { console.log(data) ;
      
          this.listQuai= data
    
          console.info('this.rows');console.info(this.listQuai);
          this.IsDataReady = true;
      }, error => { console.log(error) })
 
  }
  
  ngOnInit():void  {
    this.myForm = this.formBuilder.group({
      id:['', Validators.required],
      destination: ['', Validators.required],
      traçabilité: ['', Validators.required],
      dateESP: ['', Validators.required],
      contenu: ['', Validators.required],
      nomTransporteur: ['', Validators.required],
      qaui :[, Validators.required],
      nomRemorque :['', Validators.required],
      degUrg :['', Validators.required],
      timeESP :['', Validators.required],
    });
  }










  addremorque() {
    console.log("myform.value");
    console.log(this.myForm.value);    
    
    console.log("this.Nremorque.");
    console.log(this.Nremorque);

    this.showAdd = true ;
    this.showUpdate = false ;
       this.Nremorque.id = this.myForm.value.id;
       this.Nremorque.timeESP = this.myForm.value.timeESP ;
      this.Nremorque.degUrg = this.myForm.value.degUrg ;
      this.Nremorque.destination = this.myForm.value.destination ;
      this.Nremorque.traçabilité = this.myForm.value.traçabilité;
      this.Nremorque.nomRemorque = this.myForm.value.nomRemorque;
      this.Nremorque.qaui = {"idQuai" : this.myForm.value.qaui};
      this.Nremorque.dateESP = this.myForm.value.dateESP;
      this.Nremorque.contenu = this.myForm.value.contenu;
      this.Nremorque.nomTransporteur = this.myForm.value.nomTransporteur;


      this.DataTabRService.addRemorque(this.Nremorque).subscribe(response => {
        console.log(response);
        console.log("oui ")
        Swal.fire()
        let ref = document.getElementById("close ")
        ref?.click()
        this.myForm.reset()
        this.DataTabRService.getRemorqueList()
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
      
     /*  editSite(row :any) {
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
       this.NSite.nomQuai=this.myForm.value.idQuai;
       this.NSite.nomRemorque=this.myForm.value.idRemorque;
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
  */

  
  
  submitForm() {
    this.activeModal.close(this.myForm.value);
  }

}
