import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TdLoadingService, TdDigitsPipe, TdMediaService } from '@covalent/core';

@Component({
  selector: 'sx-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, AfterViewInit {

  @Input() title = 'SX-POS';

  @Input() drawerTitle = 'Opciones';

  @Input() navigationRoute = '/';

  @Input() logo = 'assets:siipap-rx2';

  @Input() navigation = [];

  @Input() sidenavWidth = "250px"

  constructor(
    public media: TdMediaService,
    private _titleService: Title,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page

    this.media.broadcast();
    this._titleService.setTitle( this.title);

  }

}
