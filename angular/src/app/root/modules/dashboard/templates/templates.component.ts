import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $:any

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  constructor(private r:Router) { }

  ngOnInit(): void {
  }

  publish(template){
    this.r.navigate([`/dashboard/templates/${template}`])
  }

  templateName:any
  showModal(name){
    this.templateName = name;
    $('#imagePreview').modal('show');
   let img= <HTMLImageElement>document.getElementById('image');
   img.src=`assets/images/${name}.jpg`;
  }

}
