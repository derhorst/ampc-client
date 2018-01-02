import { Injectable, Inject, forwardRef } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { State } from './../models/state.model';

@Injectable()
export class StateService {
  private stateObservable: ReplaySubject<State> = new ReplaySubject(1);

  setState(state: State): void {
    this.stateObservable.next(state);
  }

  getState(): ReplaySubject<State> {
    return this.stateObservable;
  }
}
