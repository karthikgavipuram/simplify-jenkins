import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {
cvDetails:any;
userObject:any;
  constructor(private _cs:AppService) { }

  ngOnInit() {
    if(!this._cs.userDetails || !this._cs.userDetails.id){
      this._cs.getcookie().subscribe(
        (res:any)=>{
          if(res.token) localStorage.setItem('token',res.token)
          this._cs.setUserDetails();
          this._cs.getData({"collection":"user",query:{"userId":this._cs.userDetails.id}}).subscribe((res:any)=>{
            this.cvDetails=res.body.data[0].cvdetails.builderDetails;
            this.userObject=res.body.data[0];
            setTimeout(() => {
              this.generateGraphs()
            }, 500);
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
        this.userObject=res.body.data[0];
        setTimeout(() => {
          this.generateGraphs()
        }, 500);
      });
    }
  }

  getTotalExperience(val){
    let str = ``
    if(val.year.length) str = `${val.year} years`
    if(val.month.length) str += ` and ${val.month} months`
    return str
  }

  domainchart:any
  ctx:any
  generateGraphs(){
    if(this.domainchart) this.domainchart = undefined
    let domain_labels = []
    let domain_years = []
    for(let domain of this.cvDetails.domain){
      domain_years.push(domain.years)
      domain_labels.push(domain.name)
    }
    if(domain_labels.length && domain_years.length){
      this.domainchart = new Chart("chart1", {
        type: 'bar',
        data: {
          labels: domain_labels,
          datasets: [
            {
              label: "Years",
              data: domain_years,
              backgroundColor: ["red", "blue", "green", "blue"]
            }
          ]
        },
        options: {
          legend: {
            display: false,
            position: 'right',
            labels: {
                fontColor: "#000000",
                usePointStyle: true
            }
          
        },
          scales: {
            xAxes: [{
              display: true,
            }],
            yAxes: [{
              display: true,
              ticks: {
                  beginAtZero: true
              }
          }]
          },
          plugins: {
            datalabels: {
              display: true,
              anchor: 'end',
              align: 'top',
              font: {
                weight: 'bold'
              }
            }
          },
         hover: {
            mode: 'index',
            intersect: false
         },
         layout: {
            padding: {
                left: 10,
                right: 0,
                top: 0,
                bottom: 0
            }
        }
        }
      }); 
    }
  }
}
