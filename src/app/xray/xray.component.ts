import { url } from '@angular-devkit/schematics';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { GetData, Image } from './get-data.service';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/observable/interval'; // wird



@Component({
  selector: 'app-xray',
  templateUrl: './xray.component.html',
  styleUrls: ['./xray.component.scss']
})

export class XrayComponent implements OnInit {

  datas: string;
  constructor(private getData: GetData) { }
  previewOn = ``;

  comingImage: String = 'https://loremflickr.com/320/240';

  titleBtn = 'preview';
  titleCptBtn: any = 'capture';
  error: any;
  disableBtn = true;
  inter2: any;

  ngOnInit() { }

  getDataOnClick() {
    if (this.titleBtn === 'preview') {
      this.inter2 = setInterval(() => {
        this.getImage();
      }, 1000);
      this.titleBtn = 'stop prewiev';
    } else {
      this.titleBtn = 'preview';
      clearInterval(this.inter2);
    }
  }

  getImage() {
    this.getData.getData()
      .subscribe(
        (img: Image) => {
          this.comingImage = `data:image/jpeg;base64,${img.base64}`;
        },
        (error: string) => {
          this.error = error;
          console.log('server err'); // need to full error handle
        });
  }

  captureImage() {
    this.getImage();
    clearInterval(this.inter2);
    this.titleBtn = 'preview';
    // it shoud hide preview btn?
  }

  hideBtn() {
    this.disableBtn = false;
    this.titleCptBtn = 10;
    const inter = setInterval(() => {
      this.titleCptBtn--;
      if (this.titleCptBtn === 0) {
        clearInterval(inter);
      }
    }, 1000);
    setTimeout(() => {
      this.disableBtn = true;
      this.titleCptBtn = 'capture';
    }, 10000);
  }
}
