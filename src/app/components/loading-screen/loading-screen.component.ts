import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LoadingScreenService } from 'src/app/services/loading-screen/loading-screen.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit, OnDestroy {

  constructor(public loadingScreenService: LoadingScreenService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
