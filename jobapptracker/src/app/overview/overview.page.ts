import { Component, OnInit } from '@angular/core';
import { TrackerService } from '../tracker.service';

@Component({
  selector: 'app-overview',
  templateUrl: 'overview.page.html',
  styleUrls: ['overview.page.scss']
})
export class Tab3PageOverview implements OnInit{
  
  items: any = [];
  errorMessage: string;


  constructor(public dataService: TrackerService) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
      });
  }

  ngOnInit() {
    this.items = this.loadItems();
  }

  async loadItems(){
    this.dataService.getItems().subscribe(
      data => this.items = data,
      error => this.errorMessage = <any>error);
    return this.items;
  }

  countStatus(items, status){
    let count = 0;
    
    for(let i = 0; i < items.length; i++){
      if(items[i].status == status){
        count++;
      }
    }

    return count;
  }


  
}
