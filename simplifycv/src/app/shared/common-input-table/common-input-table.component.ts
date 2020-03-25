import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-common-input-table',
  templateUrl: './common-input-table.component.html',
  styleUrls: ['./common-input-table.component.css']
})
export class CommonInputTableComponent implements OnInit {
@Input('details') _details:any
@Input('records') _records:any[] = []
  constructor() { }

  ngOnInit() {
  }

  addnewrow(){
      let rec = JSON.parse(JSON.stringify(this._records[0]))
      let keys = Object.keys(rec)
      for(let key of keys){
        rec[key] = ''
      }
      this._records.push(rec)
  }

  updateArray(event){
    this._records[event.index][event.key] = event.value
  }

}
