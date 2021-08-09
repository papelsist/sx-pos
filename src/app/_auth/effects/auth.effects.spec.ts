import "rxjs/add/observable/of";
import "rxjs/add/observable/throw";
import { EffectsRunner, EffectsTestingModule } from "@ngrx/effects/testing";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { AuthEffects } from "../effects/auth.effects";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs/Observable";

describe('AuthEffects', () => {
  let runner, authEffects, authService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      AuthEffects,
      {
        provide: AuthService,
        useValue: jasmine.createSpyObj('authService', ['get'])
      }
    ]
  }));

  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    authEffects = TestBed.get(AuthEffects);
    authService = TestBed.get(AuthService);
  });

  describe('auth$', () => {

    it('should return a LOAD_SUCCESS action, on success', function () {

    });

    it('should return a LOAD_FAIL action, on error', function () {

    });

  });

});