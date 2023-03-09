import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _record: string[] = [];

  constructor() {}

  get record(): string[] {
    return [...this._record];
  }

  search(value: string) {
    value = value.trim().toLocaleLowerCase();

    if (!this._record.includes(value)) {
      this._record.unshift(value);
      this._record = this._record.splice(0, 10);
    }

    console.log(this._record);
  }
}
