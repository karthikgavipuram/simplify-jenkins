import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-profile-builder',
  templateUrl: './profile-builder.component.html',
  styleUrls: ['./profile-builder.component.scss']
})
export class ProfileBuilderComponent implements OnInit {
  cvDetails:any={};
  message:string="Successfully saved entered data";
  header:string='Personal Information';
  subHeader:string="Basic Info";
  certificationHeader:string="Certifications";
  subProjHeader:boolean=false;
  rows:any=[];
  showPersonal:boolean=true;
  showSummary:boolean=false;
  workExp:any={};
  education:any={};
  project:any={};
  certification:any={};
  editedIndex;
  constructor() { 
    for(let i=0;i<3;i++){
      this.rows.push(i);
    }
  }
  
  ngOnInit() {
    this.cvDetails={
      "basicInfo":{
            "name" : "Shane Alex Pereira",
            "dob" : "25th Dec 1995",
            "location" : "Bengaluru, Karnataka",
            "ph_number" : 9110824364,
            "relocation" : false
      },
      "education" : [{
        "institute" : "St Joseph's Convent",
        "qualification_level" : "High School",
        "specialisation_in" : "",
        "duration" : "2008-2010",
        "location":"Kolar",
        "grade":"79%"
        },
        {
          "institute" : "St Teresa's Convent",
          "qualification_level" : "PUC",
          "specialisation_in" : "PCMB",
          "duration" : "2010-2012",
          "location":"Kolar",
          "grade":"75%"
          }
      ],
      "workexperience": [{
        "company":"Apple",
        "designation":"Software Developer",
        "duration":"2017-present",
        "location":"bengalure",
        "engagementType":"full time"
      }
      ],
        "skills" : [{
          "name" : "Java",
          "expertise_level" : "Medium",
          "years" : 2.0
        },
        {
          "name" : "Angular",
          "expertise_level" : "Medium",
          "years" : 1.0
        },
        {
          "name" : "Nodejs",
          "expertise_level" : "Medium",
          "years" : 2.0
        }
      ],
        "domain" : [{
          "name" : "App Development",
          "expertise_level" : "Medium",
          "years" : 2.0
        }],
        "projects" : [{
          "name" : "Simplifycv",
          "domain" : "Web Development",
          "role" : "Developer",
          "duration":"",
          "skills" : "Javascript Nodejs Kubernetes",
          "summary":"",
          "responsibility":""
        }],
      "certifications" : [{
          "title" : "xx",
          "organization" : "xx",
          "issue_date" : "25",
          "expires" : true,
          "expiry_date" : "25",
          "cretification_id" : "xx",
          "url" : "xx"
      }],
    }
  }
  addEducation(data){
    if(this.editedIndex!=-1){
      this.cvDetails.education.splice(this.editedIndex,1,this.education)
    }
    else{
      this.cvDetails.education.push(this.education);
    }
    this.education={};
    this.editedIndex=-1;
  }
  editEdu(row,i){
    this.education=row;
    this.editedIndex=i;
    this.showModal('educationModal');
  }
  deleteEdu(i){
    this.cvDetails.education.splice(i,1);
  }
  addWork(workData){
    if(this.editedIndex!=-1){
      this.cvDetails.workexperience.splice(this.editedIndex,1,this.workExp)
    }
    else{
    this.cvDetails.workexperience.push(this.workExp);
    }
    this.workExp={};
    this.editedIndex=-1;
  }
  editWork(row,i){
    this.workExp=row;
    this.editedIndex=i;
    this.showModal('workModal');
  }
  deleteWork(i){
    this.cvDetails.workexperience.splice(i,1);
  }
  addProject(projectData){
    if(this.editedIndex!=-1){
      this.cvDetails.projects.splice(this.editedIndex,1,this.project)
    }
    else{
    this.cvDetails.projects.push(this.project);
    }
    this.project={};
    this.editedIndex=-1;
  }
  editProject(row,i){
    this.project=row;
    this.editedIndex=i;
    this.showModal('projectModal');
  }
  deleteProject(i){
    this.cvDetails.projects.splice(i,1);
  }
  addCertificate(workData){
    if(this.editedIndex!=-1){
      this.cvDetails.certifications.splice(this.editedIndex,1,this.certification)
    }
    else{
    this.cvDetails.certifications.push(this.certification);
    }
    this.workExp={};
    this.editedIndex=-1;
  }
  editCertificate(row,i){
    this.certification=row;
    this.editedIndex=i;
    this.showModal('certificationModal');
  }
  deleteCertificate(i){
    this.cvDetails.certifications.splice(i,1);
  }
  showModal(id){
    $(".modal").modal('hide');
    $("#" + id).modal();
  }
  showFields(header){
    if(this.subProjHeader){
      this.subProjHeader=false;
    }
    this.header=header;
  }
  showRow(card){
    if(card=='skills'){
      this.cvDetails.skills.push({"name":"","expertise_level":"medium","years":0});
    }
    if(card=='domain'){
      this.cvDetails.domain.push({"name":"","expertise_level":"medium","years":0});
    }
  }
  deleteRow(card,i){
    if(card=='skills'){
      this.cvDetails.skills.splice(i,1);
    }
    if(card=='domain'){
      this.cvDetails.domain.splice(i,1);
    }
  }
  subHeaderChange(header){
    this.header='Personal Information'
    this.subHeader=header;
  }
  projectExpand(id){
    this.showSummary=!this.showSummary;
    let x = document.getElementById(id);
    if(this.showSummary){
    x.style.height="85%";
  }
  else{
    x.style.height="30%";
  }
  }
  
}
