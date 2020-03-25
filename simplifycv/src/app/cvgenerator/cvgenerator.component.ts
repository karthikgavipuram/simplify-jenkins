import { Component, OnInit } from '@angular/core';
declare var $:any

@Component({
  selector: 'app-cvgenerator',
  templateUrl: './cvgenerator.component.html',
  styleUrls: ['./cvgenerator.component.css']
})
export class CvgeneratorComponent implements OnInit {
  template:any = {
    general:{email:'',name:'',ph_no:'',experience:'',photo:'',dob:''},
    education:[{year:"",institute:"",course:"",percentage:""}],
    experience:[{year:"",company:"",desgination:""}],
    skillset:[{name:"",experience:""}],
    projects:[{name:"",duration:"",role:"",domain:"",tech_used:""}],
    domain_knowledge:[{name:"",experience:""}],
    frameworks:[{name:"",experience:""}],
    certification_achievements:[]
  }
  details = {
    education:{
      headers:['Year','Institute','Course','Percentage'],
      keys:['year','institute','course','percentage'],
      title:'Education'
    },
    experience:{
      headers:['Year','Company','Designation'],
      keys:['year','company','desgination'],
      title:'Experience'
    },
    skillset:{
      headers:['Name','Experience'],
      keys:['name','experience'],
      title:'Skill Set'
    },
    projects:{
      headers:['Name','Duration','Role','Domain','Technology Used'],
      keys:['name','duration','role','domain','tech_used'],
      title:'Projects'
    },
    frameworks:{
      headers:['Name','Experience'],
      keys:['name','experience'],
      title:'Frameworks'
    },
    domain_knowledge:{
      headers:['Name','Experience'],
      keys:['name','experience'],
      title:'Domain Knowledge'
    }
  }


  constructor() { }

  ngOnInit() {
  }

  updateKey(event){
    if(event.obj){
      if(event.parent) this[event.obj][event.parent][event.key] = event.value
      else this[event.obj][event.key] = event.value
    }
    else{
      this[event.key] = event.value
    }
    console.log(this.template)
  }

  imageString(event){
    this.template.general.photo = event.value
  }

}
