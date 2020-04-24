import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
declare var $: any;

@Component({
  selector: 'app-profile-builder',
  templateUrl: './profile-builder.component.html',
  styleUrls: ['./profile-builder.component.scss']
})
export class ProfileBuilderComponent implements OnInit {
  cvDetails:any;
  message:string="Successfully saved entered data";
  header:string='Personal Information';
  subHeader:string="Basic Info";
  certificationHeader:string="Certifications";
  subProjHeader:boolean=false;
  rows:any=[];
  showPersonal:boolean=true;
  showSummary:boolean=false;
  workExp:any={"company":"","designation":"","engagementType":"","from":{"year":"","month":""},"to":{"year":"","month":""},"location":""};
  education:any={"institute":"","course":"","from":"","to":"","grade":"","level":"","location":""};
  project:any={"name":"","role":"","skills_used":[],"domain":"","type":"","summary":"","responsibility":"" ,"ongoing":false,"from":{"year":"","month":""},"to":{"year":"","month":""},"location":""};
  certification:any={"title":"","organization":"","issue_date":"","expires":true,"expiry_date":"","credential_id":"","url":""};
  sections:any=['Personal Information','Education','Work Experience','Skills','Domain','Projects','Certification and Achievements'];
  subSection=['Basic Info', 'Job Specific Info'];
  noticePeriod=['Serving Notice Period',"Yet To Serve Notice Period"];
  expertise_level=[{"key":"Aware","value":"aware"},{"key":"Expert","value":"expert"},{"key":"Applied","value":"applied"}];
  currentSection;
  duration:any={};
  years:any=[];
  userObject:any={};
  constructor(private _cs:AppService) { 
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
  
  // ngOnInit() {

  // }
  ngOnInit() {
    if(!this._cs.userDetails || !this._cs.userDetails.id){
      this._cs.getcookie().subscribe(
        (res:any)=>{
          if(res.token) localStorage.setItem('token',res.token)
          this._cs.setUserDetails();
          this._cs.getData({"collection":"user",query:{"userId":this._cs.userDetails.id}}).subscribe((res:any)=>{
            this.cvDetails=res.body.data[0].cvdetails.builderDetails;
            this.userObject=res.body.data[0];
            console.log(this.cvDetails);
          });
        },
        (err)=>{
          console.log('error in getcookie()')
        }
      )
    }
    else{
      this._cs.getData({"collection":"user",query:{"userId":this._cs.userDetails.id}}).subscribe((res:any)=>{
        this.cvDetails=res.body.data[0].cvdetails.builderDetails;
        console.log(this.cvDetails);
        this.userObject=res.body.data[0];
      });
    }
    setTimeout(() => {
      document.getElementById(this.subHeader).style.color='blue';
    }, 200);
    this.duration.months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.duration.years=this.years;
  }
  addEducation(data){
    
    this.cvDetails.education.push(this.education);
    this.education={};
    
  }
  editEdu(row,i){
    this.education=row;
    this.showModal('educationModal');
  }
  deleteEdu(i){
    this.cvDetails.education.splice(i,1);
  }
  addWork(workData){
    
    this.cvDetails.experience.push(this.workExp);
    this.workExp={};
  }
  editWork(row,i){
    this.workExp=row;
    this.showModal('workModal');
  }
  deleteWork(i){
    this.cvDetails.experience.splice(i,1);
  }
  addProject(projectData){
    this.project.skills_used=this.project.skills.split(',');
    delete this.project.skills;
    this.cvDetails.projects.push(this.project);
    this.project={};
  }
  editProject(row,i){
    this.project=row;
    this.showModal('projectModal');
  }
  deleteProject(i){
    this.cvDetails.projects.splice(i,1);
  }
  addCertificate(workData){
   
    this.cvDetails.certifications.push(this.certification);
    
  }
  editCertificate(row,i){
    this.certification=row;
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
      this.cvDetails.skills.push({"name":"","expertise_level":"","years":""});
    }
    if(card=='domain'){
      this.cvDetails.domain.push({"name":"","expertise_level":"","years":""});
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
  save(){
    this.userObject.cvdetails.builderDetails=this.cvDetails;
    this._cs.updateObject({"collection":"user",query:{"userId":this._cs.userDetails.id},"updateFields":{"cvdetails":this.userObject.cvdetails}}).subscribe(()=>{

    });
  }
  
}
