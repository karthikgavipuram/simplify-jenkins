import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AppService } from '@root/app.service';
import {Router} from '@angular/router'
import {DashboardService} from '../dashboard.service'
declare var $: any;

@Component({
  selector: 'app-profile-builder',
  templateUrl: './profile-builder.component.html',
  styleUrls: ['./profile-builder.component.scss']
})
export class ProfileBuilderComponent implements OnInit, OnDestroy {
  subscribedSection:any;
  subscribedSubsection:any;
  cvDetails: any;
  message: string = "Successfully saved entered data";
  header: string = 'Personal Information';
  subHeader: string = "Basic Info";
  showPersonal: boolean = true;
  showSummary: boolean = false;
  workExp: any = { "company": "", "designation": "", "engagementType": "", "from": { "year": "", "month": "" }, "to": { "year": "", "month": "" }, "location": "" };
  education: any = { "institute": "", "course": "", "from": "", "to": "", "grade": { "type": "", "value": "" }, "level": "", "location": "" };
  project: any = { "name": "", "role": "", "skills_used": [], "domain": "", "type": "", "summary": "", "responsibility": "", "ongoing": false, "from": { "year": "", "month": "" }, "to": { "year": "", "month": "" }, "location": "" };
  certification: any = { "title": "", "organization": "", "issue_date": "", "expires": true, "expiry_date": "", "credential_id": "", "url": "" };
  sections: any = ['Personal Information', 'Education', 'Work Experience', 'Skills', 'Domain', 'Projects', 'Certifications and Achievements'];
  subSection = ['Basic Info', 'Job Specific Info'];
  noticePeriod = [{ "key": "Actively Looking", "value": "active" }, { "key": "Passively Looking", "value": "passive" }, { "key": "Serving Notice Period", "value": "serving" }, { "key": "Immediately Available", "value": "immediate" }];
  expertise_level = [{ "key": "Aware", "value": "aware" }, { "key": "Expert", "value": "expert" }, { "key": "Applied", "value": "applied" }];
  currency = [{ "key": "INR", "value": "INR" }, { "key": "USD", "value": "USD" }, { "key": "CAD", "value": "CAD" }, { "key": "AUD", "value": "AUD" }, { "key": "GBP", "value": "GBP" }];
  countries = [{ "key": "USA", "value": "USA" }, { "key": "Canada", "value": "Canada" }, { "key": "UK", "value": "UK" }, { "key": "Australia", "value": "Autralia" }, { "key": "Dubai", "value": "Dubai" }];
  qualification = [{ "key": "High School", "value": "High School" }, { "key": "Intermediate", "value": "Intermediate" }, { "key": "UG", "value": "UG" }, { "key": "PG", "value": "PG" }, { "key": "PhD", "value": "PhD" }];
  grade = [{ "key": "GPA", "value": "GPA" }, { "key": "Percentage", "value": "Percentage" }, { "key": "CGPA", "value": "CGPA" }];
  engagementType = [{ "key": "Full Time", "value": "Full Time" }, { "key": "Part Time", "value": "Part Time" }, { "key": "Intern", "value": "Intern" }];
  currentSection;
  duration: any = {};
  years: any = [];
  userObject: any = {};
  showPic: boolean = true;
  constructor(private _cs: AppService,public _r:Router,private _ds:DashboardService) {
    let today = new Date();
    let year = today.getFullYear();
    for (let i = 1980; i <= year; i++) {
      this.years.push(i);
    }
  }

  @HostListener('change') saveData(){
    this.calltimeout()
  }

  nextSection() {
    let section = this.sections.indexOf(this.header);
    let section1 = this.subSection.indexOf(this.subHeader);
    document.getElementById(this.subHeader).style.color = 'unset';
    if (section == 0 && section1 == 0) {
      this.subHeader = this.subSection[1];
      document.getElementById(this.subHeader).style.color = 'blue';
      return;
    }
    document.getElementById(this.header).style.color = 'unset';
    if (section == 0 || section1 > 0) {
      let index = ++section;
      if (index > 6)
        return;
      this.currentSection = this.sections[index];
      this.header = this.currentSection;
      document.getElementById(this.header).style.color = 'blue';
    }
  }
  ngOnInit() {
    if (!this._cs.userDetails || !this._cs.userDetails.id) {
      this._cs.getcookie().subscribe(
        (res: any) => {
          if (res.token) localStorage.setItem('token', res.token)
          this._cs.setUserDetails();
          this.getData()
        },
        (err) => {
          console.log('error in getcookie()')
        }
      )
    }
    else {
      this.getData()
    }
    this.duration.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.duration.years = this.years;
    this.showDate();
    this.subscribedSection = this._ds.selectedSection.subscribe((section: any) => {
      this.showFields(section)
    });
    this.subscribedSubsection = this._ds.selectedSubsection.subscribe((subsection: any) => {
    this.subHeaderChange(subsection)
});
  }

  getData() {
    this._cs.getData({ "collection": "user", query: { "userId": this._cs.userDetails.id } }).subscribe((res: any) => {
      this.cvDetails = res.body.data[0].cvdetails.builderDetails;
      console.log(this.cvDetails);
      if(this.cvDetails.projects.length){
        for(let row of this.cvDetails.projects){
          row.skills=row.skills_used.join();
        }
      }
      this.preferred_location= this.cvDetails.personal_info.job_info.preferred_location.split(',');
      this.userObject = res.body.data[0];
    });
  }

  

  showDate() {
    setTimeout(() => {
      $('.flatpickr').flatpickr({
        enableTime: false
      });
    }, 500);
  }
  addEducation(data) {
    if (this.edited != -1) {
      this.cvDetails.education.splice(this.edited,1,this.clone(this.education));
      this.edited = -1;
    }
    else {
      this.cvDetails.education.push(this.clone(this.education));
      this.calltimeout()
    }
    this.hideModal('educationModal')
  }
  editEdu(row, i) {
    this.education = row;
    this.edited = i
    this.showModal('educationModal');
  }
  deleteEdu(i) {
    this.cvDetails.education.splice(i, 1);
  }
  addWork(workData) {
    if (this.workExp.currently_working) {
      this.workExp.to = { "year": "", "month": "" };
    }
    if (this.edited != -1) {
      this.cvDetails.experience.splice(this.edited, 1, this.clone(this.workExp));
      this.edited = -1;
    }
    else {
      this.cvDetails.experience.push(this.clone(this.workExp));
      this.calltimeout()
    }
    this.hideModal('workModal')
  }
  clone(json) {
    return JSON.parse(JSON.stringify(json));
  }
  editWork(row, i) {
    this.workExp = row;
    this.edited = i;
    this.showModal('workModal');
  }
  deleteWork(i) {
    this.cvDetails.experience.splice(i, 1);
  }
  addProject(projectData) {
    if (this.project.ongoing) {
      this.project.to = { "year": "", "month": "" };
    }
    if (this.project.skills)
      this.project.skills_used = this.project.skills.split(',');
    delete this.project.skills;
    if (this.edited != -1) {
      this.cvDetails.projects.splice(this.edited, 1, this.clone(this.project));
      this.edited = -1;
    }
    else {
      this.cvDetails.projects.push(this.clone(this.project));
      this.calltimeout()
    }
    this.hideModal('projectModal')
  }
  edited = -1;
  editProject(row, i) {
    this.project = row;
    this.edited = i;
    this.showModal('projectModal');
  }
  deleteProject(i) {
    this.cvDetails.projects.splice(i, 1);
  }
  addCertificate(workData) {
    if (this.certification.expires) {
      this.certification.expiry_date = "";
    }
    if (this.edited != -1) {
      this.cvDetails.certifications.splice(this.edited, 1, this.clone(this.certification));
      this.edited = -1;
    }
    else {
      this.cvDetails.certifications.push(this.clone(this.certification));
      this.calltimeout()
    }
    this.hideModal('certificationModal')

  }
  editCertificate(row, i) {
    this.certification = row;
    this.edited = i
    this.showModal('certificationModal');
  }
  deleteCertificate(i) {
    this.cvDetails.certifications.splice(i, 1);
  }
  
  showModal(id) {
    $("#" + id).modal('show');
  }
  showFields(header) {
    this.header = header;
    this.showDate();
  }
  skills:any={};
  domains:any={};
  addSkills() {
      if(this.edited!=-1){
        this.cvDetails.skills.splice(this.edited,1,this.skills);
        this.edited=-1
      }
      else{
      this.cvDetails.skills.push(this.skills);
      }
      this.skills={};
  }
  editSkills(row,i){
    this.skills=row;
    this.edited=i;
  }
  addDomain(){
    if(this.edited!=-1){
      this.cvDetails.domain.splice(this.edited,1,this.domains);
      this.edited=-1
    }
    else{
    this.cvDetails.domain.push(this.domains);
    }
    this.domains={};
  }
  editDomain(row,i){
    this.domains=row;
    this.edited=i;
  }
  deleteRow(card, i) {
    if (card == 'skills') {
      this.cvDetails.skills.splice(i, 1);
    }
    if (card == 'domain') {
      this.cvDetails.domain.splice(i, 1);
    }
  }
  clearJson(json) {
    for (let key in json) {
      if (typeof json[key] == 'string') json[key] = ""
      else if (typeof json[key] == 'boolean') json[key] = false
      else if (typeof json[key] == 'number') json[key] = null
      else if (typeof json[key] == 'object') {
        this.clearJson(json[key])
      }
    }
  }

  hideModal(id) {
    $('#' + id).modal('hide');
    if (id == 'educationModal') {
      this.clearJson(this.education)
    } else if (id == 'workModal') {
      this.clearJson(this.workExp)
    } else if (id == 'projectModal') {
      this.clearJson(this.project)
    } else if (id == 'certificationModal') {
      this.clearJson(this.certification)
    }
  }


  subHeaderChange(header) {
    this.header = 'Personal Information';
    this.subHeader = header;
    this.showDate();
  }
  projectExpand(id) {
    this.showSummary = !this.showSummary;
  }
  convertToDate(s) {
    var date = new Date(s);
    return date
  }
  checkyear(id) {
    var a = $('#' + id + '_from_years').val();
    var b = $('#' + id + '_to_years').val();
    if (b < a) {
      document.getElementById(id + '_error').innerHTML = "Year should be greater";
      if (id == 'project')
        this.project.to = { "year": "", "month": "" };
      else if (id == 'work')
        this.project.to = { "year": "", "month": "" };
      else
        this.education.to = "";
      setTimeout(() => {
        document.getElementById(id + '_error').innerHTML = "";
      }, 5000);
    }
  }

  save() {
    // save date type
    if (!this.cvDetails.personal_info.job_info.relocation) {
      this.cvDetails.personal_info.job_info.preferred_location = "";
    }
    this.userObject.cvdetails.builderDetails = this.cvDetails;
    this._cs.updateObject({ "collection": "user", query: { "userId": this._cs.userDetails.id }, "updateFields": { "cvdetails": this.userObject.cvdetails } }).subscribe(
      (res: any) => {},
      (err: any) => {
        console.log(err)
      }
    );
  }
  profilepic: any;
  upload_profilepic(event) {
    this.showPic = false;
    var profile = <HTMLImageElement>document.getElementById('profile');
    profile.src = URL.createObjectURL(event.target.files[0]);
    profile.width = 250;
    profile.height = 200;

  }
  
  timeout:any
  calltimeout(){
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.save()
    }, 1000);
  }

  publish(){
    this._r.navigate(['/dashboard/profilebuilder/default'])
  }

  ngOnDestroy(){
    this.subscribedSection = undefined
    this.subscribedSubsection = undefined
  }
  next(){
    if(this.header=='Personal Information' && this.subHeader=='Basic Info'){
        this.subHeader="Job Specific Info";
        return
    }
    else if(this.header=='Personal Information' && this.subHeader!='Basic Info'){
      let section = this.sections.indexOf(this.header);
      this.header=this.sections[++section];
      this.subHeader="Basic Info";
      return
    }
    else if(this.header!='Personal Information'){
      let section = this.sections.indexOf(this.header);
      let index=++section;
      if(index>6)
        return
      this.header=this.sections[index];
    }
  }
  preferred_location:any=[];
  add(data){
    this.preferred_location= this.cvDetails.personal_info.job_info.preferred_location.split(',');
  }
  getEllipsis(data){
    let title;
    if(data.length>25) {
      title=data.slice(0,25);
      title+='...';
    }
    else
      title=data;
    return title;
  }
}
