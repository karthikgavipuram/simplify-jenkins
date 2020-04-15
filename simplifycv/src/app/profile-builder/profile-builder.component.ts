import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-builder',
  templateUrl: './profile-builder.component.html',
  styleUrls: ['./profile-builder.component.scss']
})
export class ProfileBuilderComponent implements OnInit {

  message:string="Successfully saved entered data";
  header:string;
  subHeader:string="Demographics";
  certificationHeader:string="Certifications";
  subProjHeader:boolean=false;
  rows:any=[];
  constructor() { 
    for(let i=0;i<3;i++){
      this.rows.push(i);
    }
  }

  ngOnInit() {
  }
  showFields(header){
    if(this.subProjHeader){
      this.subProjHeader=false;
    }
    this.header=header;
  }
  showRow(){
    let len=this.rows.length;
    this.rows.push(len+1);
  }
  subHeaderChange(header){
    this.subHeader=header;
  }
  certificationHeaderChange(header){
    this.certificationHeader=header;
  }
  experienced(event){
  }

}
