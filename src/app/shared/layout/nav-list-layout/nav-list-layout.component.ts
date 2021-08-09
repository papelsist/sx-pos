import {AfterViewInit, ChangeDetectorRef, Component, Input} from '@angular/core';
import {TdMediaService} from '@covalent/core';
import {Title} from '@angular/platform-browser';
import { Sucursal } from 'app/models';


@Component({
  selector: 'sx-nav-list-layout',
  templateUrl: './nav-list-layout.component.html',
  styleUrls: ['./nav-list-layout.component.scss']
})
export class NavListLayoutComponent implements AfterViewInit {

  @Input() header: string = "Header";
  @Input() headerIcon = "apps";
  
  @Input() color = 'primary';
  
  @Input() navigation: Array<any> = [];
  
  @Input() sideNavWidth = '275px'
  
  @Input() modulo: string = "Modulo";


  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public media: TdMediaService,
    private titleService: Title
  ) {}

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    this._changeDetectorRef.detectChanges();
    this.titleService.setTitle(this.header);
  }
  

}
