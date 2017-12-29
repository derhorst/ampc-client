import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';

/**
 * This class provides services regarding the WebsocketConnection
 */

@Injectable()
export class WebsocketService {

  private subject: Subject<any>;

  /**
   * connect to the websocket
   *
   * @param {string} endpoint
   *
   * @return {Subject<MessageEvent>} subject
   */
  public connect(endpoint: string) {
    if (!this.subject) {
      this.subject = this.create(endpoint);
    }
    return this.subject;
  }

  /**
   * create websocket connection
   *
   * @param {string} url - url of the websocket
   *
   * @return {Subject<MessageEvent>} ws
   */
  private create(url: string): Subject<MessageEvent> {
    const ws = new WebSocket(url);

    const observable = Observable.create(
      (obs: Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror   = obs.error.bind(obs);
        ws.onclose   = obs.complete.bind(obs);

        return ws.close.bind(ws);
      }
    );

    const observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(data);
        }
      }
    };

    return Subject.create(observer, observable);
  }
}
