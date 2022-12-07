import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackerService } from './tracker.service';
import { InputDialogService } from './input-dialog.service';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { HttpClientModule } from '@angular/common/http'; 
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@awesome-cordova-plugins/media-capture/ngx';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    TrackerService,
    InputDialogService,
    SocialSharing,
    MediaCapture,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
