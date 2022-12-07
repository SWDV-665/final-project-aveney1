import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { TrackerService } from '../tracker.service';
import { InputDialogService } from '../input-dialog.service';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { MediaCapture, MediaFile, CaptureError, CaptureAudioOptions } from '@awesome-cordova-plugins/media-capture/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class Tab1PageHome implements OnInit{
  title = "JobAppTracker";

  items: any = [];
  errorMessage: string;

  constructor(public toastCtrl: ToastController,
    public alertController: AlertController,
    public dataService: TrackerService,
    public inputDialogService: InputDialogService,
    public socialSharing: SocialSharing,
    public mediaCapture: MediaCapture
    ) {
      dataService.dataChanged$.subscribe((dataChanged: boolean) => {
        this.loadItems();
      });
    }

  ngOnInit() {
    this.loadItems();
  }

  async loadItems(){
    this.dataService.getItems().subscribe(
      data => this.items = data,
      error => this.errorMessage = <any>error);
    return this.items;
  }
  
  removeItem(id){
    this.dataService.removeItem(id);
  }

  shareItem(item){
    let message = "App Item - Title: " + item.title + " - Company: " + item.company + " - Status: " + item.status;
    let subject = "Shared via JobAppTracker app";
    
    console.log("Subject: " + subject);
    console.log("Message: " + message);

    this.socialSharing.share(message, subject).then(() => {
      // Success!
      console.log("Shared successfully");
    }).catch((error) => {
      // Error!
      console.error("Error while sharing ", error );
    }); 
  }

  record(item){

      let options: CaptureAudioOptions = { limit: 1 };
      
      this.mediaCapture.captureAudio(options)
        .then((data: MediaFile[])=>{
          // Success!
          console.log("Recorded successfully" + data + " for item " + item);
        }).catch((err: CaptureError) => {
          // Error!
          console.error("Error while recording ", err );
        });
  }

  editItem(item, index){
    this.inputDialogService.showPrompt(item, index);
  }

  addItem(){
    this.inputDialogService.showPrompt();
  }
}
  
