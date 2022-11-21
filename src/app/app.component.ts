import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { AddingSubService } from './services/adding-sub.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { InfodialogComponent } from './components/infodialog/infodialog.component';
import { Profile } from './model/Profile';

const PUBLIC_KEY = 'BLK14mMHX3Otx9HrWoPphLvov8SniviBx25Lro8VUHWrLeE521GsycHfC5LNlSof7zUfuJzCUpi4PSwovxBuoac';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'runescapeTracker_frontend';
  username: string;
  loading: boolean;
  profiles: Array<Profile>;
  
  constructor(private swPush: SwPush, private subService: AddingSubService, public dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.getTableData();
  }

  activateNotify() {
    this.loading = true;
    if (!this.swPush.isEnabled) {
      this.loading = false;
      this.dialog.open(InfodialogComponent, {
        data: { text: 'Push Notification is not enabled.', success: false }
      });
      return;
    }
    this.swPush.requestSubscription({
      serverPublicKey: PUBLIC_KEY
    })
    .then(sub => {
      this.subService.savingSub(sub, this.username).subscribe(res => {
        this.loading = false;
        this.dialog.open(InfodialogComponent, {
          data: { text: this.username, success: true }
        });
        this.username = '';
        this.getTableData();
      }, err => {
        this.loading = false;
        this.username = '';
        this.dialog.open(InfodialogComponent, {
          data: { text: err.error.message, success: false }
        });
      });
    })
    .catch(err => console.log(err));
  }

  getTableData() {
    this.subService.getUsernames().subscribe(response => {
      this.profiles = response;
      this.profiles.sort((a: Profile, b: Profile) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    });
  }

  unSubscribe(): void {
    this.swPush.unsubscribe().then(res => console.log(res)).catch(err => console.log(err));
  }
}
