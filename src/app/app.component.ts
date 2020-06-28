import {Component, OnDestroy, OnInit} from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit, OnDestroy{
  title = 'gestion-doc';
  mediaSub: Subscription;
  devicesXs: boolean;
  constructor(private mediaObserver: MediaObserver) {
  }
  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        console.log(result.mqAlias);
        this.devicesXs = result.mqAlias === 'xs' ? true : false;
    });
  }
  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }
}
