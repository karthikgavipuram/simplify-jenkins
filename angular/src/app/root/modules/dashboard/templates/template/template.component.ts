import { Component, OnInit } from '@angular/core';
import { AppService } from '@root/app.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  name='shruthi Thejashwini'
  role='software developer'
  cvDetails:any={};
  myAngularxQrCode:string=null;
  constructor(private _cs:AppService) { 
    this.myAngularxQrCode = 'facebook.com';
  }

  ngOnInit(){
    // if(!this._cs.userDetails || !this._cs.userDetails.id){
    //   this._cs.getcookie().subscribe(
    //     (res:any)=>{
    //       if(res.token) localStorage.setItem('token',res.token)
    //       this._cs.setUserDetails();
    //       this._cs.getData({"collection":"user",query:{"userId":this._cs.userDetails.id}}).subscribe((res:any)=>{
    //         this.cvDetails=res.body.data[0].cvdetails.builderDetails;
    //         console.log(this.cvDetails)
    //       });
    //     },
    //     (err)=>{
    //       console.log('error in getcookie()')
    //     }
    //   )
    // }
    // else{
    //   this._cs.getData({"collection":"user",query:{"userId":this._cs.userDetails.id}}).subscribe((res:any)=>{
    //     this.cvDetails=res.body.data[0].cvdetails.builderDetails;
    //   });
    // }
    this.cvDetails.education=[{
      "year":"2010-2016",
      "level":"BE",
      "institution":"Dr TTIT",
      "location":"Kolar"
    },
    {
      "year":"2016-2020",
      "level":"MS",
      "institution":"VIT",
      "location":"Chennai"
    }
  ];
  this.cvDetails.experience=[{
    "year":"2010-Present",
    "company":"Simplify3x Software Private Limited",
    "role":"Software Developer",
    "location":"Bengaluru, KA"
  },
  {
    "year":"2016-Present",
    "company":"Accenture",
    "role":"Associate",
    "location":"Hyderabad"
  },
];
this.cvDetails.projects=[{
  "year":"2010-Present",
  "role":"Software Developer",
  "domain":"UI/UX",
  "location":"Bengaluru, KA",
  "skills":"Java, Angular, Node"
},
{
  "year":"2016-Present",
  "role":"Testing",
  "domain":"Tesing",
  "location":"Hyderabad",
  "skills":"Selenium, Automation"
},
]
  }

}
