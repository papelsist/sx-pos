import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../_auth/services/auth.service';

@Directive({
  selector: '[sxHasRole]'
})
export class HasRoleDirective implements OnInit, OnDestroy {
  @Input('sxHasRole') sxHasRole: string;

  authentication$: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('Evaluando role: ', this.sxHasRole);

    this.authentication$ = this.authService
      .getCurrentUser()
      .do(() => this.viewContainer.clear())
      .filter((auth: any) => auth.roles.find(role => role === this.sxHasRole))
      .subscribe(() => {
        this.viewContainer.createEmbeddedView(this.templateRef);
      });

    /*
    this.authentication$ = this.authService.getUser()
      .skip(1)
      .do( () => this.viewContainer.clear())
      .do( user => console.log('Current user', user))
      .filter( user => user.hasRole(this.roleName))
      .subscribe( () => {
        this.viewContainer.createEmbeddedView(this.templateRef);
      });
    // this.authService.getUser().subscribe( user => console.log('User logged: ', user));
    */
  }

  ngOnDestroy() {
    this.authentication$.unsubscribe();
  }
}
