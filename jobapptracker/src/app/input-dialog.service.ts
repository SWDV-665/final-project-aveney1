import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TrackerService } from './tracker.service';


@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

  constructor(private dataService: TrackerService, private alertController: AlertController) {
    console.log('Hello InputDialogService Provider');
   }


  async showPrompt(item?, index?) {
    const alert = await this.alertController.create({
      header: item? 'Edit Item' : 'Add Item',
      message: item? 'Please edit item...' : 'Please add item...',
      buttons: [{
        text: 'Save',
        handler: data => {
          if(index!==undefined){
            item.title = data.title;
            item.company = data.company;   
            this.showStatusPrompt(item, index);  
          }else{
            this.showStatusPrompt(data);
          }

        }
      },
      {
        text: 'Cancel',
        handler: data => {
          console.log("Cancel clicked...", data);
        }
      }
      ],
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: item? item.title : null,
        },
        {
          name: 'company',
          placeholder: 'Company',
          value: item? item.company : null,
        },
      ],
    });

    await alert.present();
  }


  async showStatusPrompt(item?, index?) {
    const alert = await this.alertController.create({
      header: 'Select status',
      message: 'Please select status',
      buttons: [{
        text: 'Save',
        handler: data => {
          console.log("Save clicked...", data);
          if(index!==undefined){
            item.status = data; 
            this.dataService.editItem(item, index);
          }else{
            item.status = data;
            this.dataService.addItem(item);
          }
        }
      },
      {
        text: 'Cancel',
        handler: data => {
          console.log("Cancel clicked...", data);
        }
      }
      ],
      inputs: [
        {
          type: 'radio',
          name: 'status',
          label: 'Applied',
          value: 'Applied',
          checked: item.status == 'Applied'
        },
        {
          type: 'radio',
          name: 'status',
          label: 'Interview',
          value: 'Interview',
          checked: item.status == 'Interview'
        },
        {
          type: 'radio',
          name: 'status',
          label: 'Offer',
          value: 'Offer',
          checked: item.status == 'Offer'
        },
        {
          type: 'radio',
          name: 'status',
          label: 'Rejection',
          value: 'Rejection',
          checked: item.status == 'Rejection'
        },
      ],
    });

    await alert.present();
  }
}

