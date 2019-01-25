import { EventEmitter, Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';

@Injectable()
export class LoadingIndicatorService {

  onLoadingChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  creations: number = 0;
  resolutions: number = 0;

  constructor() { }

  onStarted(req: HttpRequest<any>): void {
    this.creations++;
    this.notify();
  }

  onFinished(req: HttpRequest<any>): void {
    this.resolutions++;
    this.notify();
  }

  private notify(): void {
    this.onLoadingChanged.emit(this.creations > this.resolutions);
  }

}
