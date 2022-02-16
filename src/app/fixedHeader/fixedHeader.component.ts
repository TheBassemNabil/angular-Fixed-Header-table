import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fixedHeader',
  templateUrl: './fixedHeader.component.html',
  styleUrls: ['./fixedHeader.component.css']
})
export class FixedHeaderComponent implements OnInit {
  dataList: any;

  pageUpdated = false;
  pageDestored = false;

  showAddres = true;

  constructor(private httpClient: HttpClient){}

  ngOnInit() {
    this.httpClient.get("./data.json").subscribe(data =>{
      this.dataList = data;
    })
  }

  removeAddress() {
    this.showAddres = !this.showAddres;
    this.pageUpdated = !this.pageUpdated;
  }

}
