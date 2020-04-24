import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
import { AppService } from '../app.service';
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
  sections:any=['Personal Information','Education','Work Experience','Skills','Domain','Projects','Certification and Achievements'];
  subSection=['Basic Info', 'Job Specific Info'];
  noticePeriod=['Serving Notice Period',"Yet To Serve Notice Period"]
  currentSection;
  duration:any={};
  years:any=[];
  userObject:any={};
  constructor(private _cs:AppService) { 
    for(let i=0;i<3;i++){
      this.rows.push(i);
    }
    let today=new Date();
    let year=today.getFullYear();
    for(let i=1980;i<=year;i++){
     this.years.push(i);
    }
  }
  nextSection(){
    let section=this.sections.indexOf(this.header);
    let section1=this.subSection.indexOf(this.subHeader);
    document.getElementById(this.subHeader).style.color='unset';
    if(section==0 && section1==0){
        this.subHeader=this.subSection[1];
        document.getElementById(this.subHeader).style.color='blue';
        return;
    }
    document.getElementById(this.header).style.color='unset';
    if(section==0 || section1>0){
    let index=++section;
  if(index>6)
    return;
    this.currentSection=this.sections[index];
    this.header=this.currentSection;
    document.getElementById(this.header).style.color='blue';
    }
  }
  ngOnInit() {
    if(!this._cs.userDetails || !this._cs.userDetails.id){
      this._cs.getcookie().subscribe(
        (res:any)=>{
          if(res.token) localStorage.setItem('token',res.token)
          this._cs.setUserDetails();
          this._cs.getData({"collection":"user",query:{"userId":this._cs.userDetails.id}}).subscribe((res:any)=>{
            console.log(res);
          });
        },
        (err)=>{
          console.log('error in getcookie()')
        }
      )
    }
    else{
      this._cs.getData({"collection":"user",query:{"userId":this._cs.userDetails.id}}).subscribe((res:any)=>{
        console.log(res);
        this.userObject=res.body.data[0];
      });
    }
  
    this.cvDetails={
        "personal_info" : {
            "basic_information" : {
                "full_name" : "Shane Alex Pereira",
                "dob" : "25 Dec 1995",
                "current_location" : "Bengaluru, Karnataka",
                "mobile_number" : 9110824364,
                "alt_number" : 123456779,
                "email_id" : "xx"
            },
            "job_info" : {
                "total_exp" : "1",
                "relocation" : false,
                "preferred_loc" : "Bangalore",
                "current_ctc" : "10000",
                "expected_ctc" : "1234567",
                "notice_period" : "",
                "visa_status" : {
                  "country" : "",
                  "type" : "",
                  "expires" : ""
                }
              }
            },
            "education" : [{
                "institution" : "xxx",
                "level" : "",
                "location" : "",
                "course" : "xxx",
                "from" : "", 
                "to":"",
                "grade" : "xx"
                }],
               
            "skills" : [{
                    "name" : "java",
                    "expertise_level" : "Aware",
                    "years" : 2.5
            }],
            "domain" : [{
              "name" : "App Development",
              "expertise_level" : "Medium",
              "years" : 2.0
            }],
            "projects" : [{
                    "name" : "Simplifycv",
                    "role" : "Developer",
                    "domain" : "Web Development",
                    "type" : "xx",
                    "from" : {
                      "year" : "2020",
                      "month" : ""
                      },
                      "to" : {
                          "year" : "",
                          "month" : ""
                      },
                    "summary" : "",
                    "responsibility" : "",
                    "skills_used" : ["Javascript", "Nodejs", "Kubernetes"],
                    "ongoing":true
            }],
            "experience" : [{
                "company" : "xxx",
                "designation" : "",
                "location" : "",
                "engagement_type" : "",
                "from" : {
                  "year" : "",
                  "month" : ""
                  },
              "to" : {
                  "year" : "",
                  "month" : ""
                 },

                "currently_working" : false 
            }],
            "achievements" : [{
                "title" : "xx",
                "description" : "xx",
                "year" : "xx"
            }],
            "certifications" : [{
                "title" : "xx",
                "organization" : "xx",
                "issue_date" : "",
                "expires" : true,
                "expiry_date" : "",
                "credential_id" : "xx",
                "url" : "xx"
        }],
    }
    setTimeout(() => {
      document.getElementById(this.subHeader).style.color='blue';
    }, 200);
    this.duration.months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.duration.years=this.years;
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
    document.getElementById(this.header).style.color='unset';
    document.getElementById(this.subHeader).style.color='unset';
    if(this.subProjHeader){
      this.subProjHeader=false;
    }
    this.header=header;
    let x =document.getElementById(this.header);
    x.style.color='blue';
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
  cancel(header){
    if(header=='education'){
        this.education={};
  }
  if(header=='experience'){
    this.workExp={};
  }
  if(header=='project'){
    this.project={};
  }
  if(header=='certification'){
    this.certification={};
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
  experienced(data){

  }
  save(){
    let cvDetails=this.userObject;
    this.userObject.cvdetails.builderdetails=this.cvDetails;
    this._cs.updateObject({"collection":"user",query:{"userId":this._cs.userDetails.id},"updateFields":{"cvdetails":this.userObject.cvdetails}}).subscribe();
  }
  
}
