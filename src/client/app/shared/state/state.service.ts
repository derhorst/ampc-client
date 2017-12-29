import { Injectable, Inject, forwardRef } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { State } from './../models/state.model';

/**
 * This class is used to provide a caching mechanism for workspaces
*/

@Injectable()
export class StateService {
  private stateObservable: ReplaySubject<State> = new ReplaySubject(1);

  /**
  * constructor of the WorkspaceStore service
  */
  // constructor() { }


  setState(state: State): void {
    this.stateObservable.next(state);
  }

  getState(): ReplaySubject<State> {
    return this.stateObservable;
  }
}
