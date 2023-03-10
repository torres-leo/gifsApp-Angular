import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _record: string[] = [];
  private apikey: string = 'Ke6fe6R4M99VYJb4xujkllxBSW1jlgji';
  private api_url: string = 'https://api.giphy.com/v1/gifs/';
  limit: number = 20;
  public results: Gif[] = [];

  constructor(private http: HttpClient) {
    this._record = JSON.parse(localStorage.getItem('record')!) ?? [];
    this.results = JSON.parse(localStorage.getItem('last_results')!) ?? [];
  }

  get record(): string[] {
    return [...this._record];
  }

  search(value: string) {
    value = value.trim().toLocaleLowerCase();

    if (!this._record.includes(value)) {
      this._record.unshift(value);
      this._record = this._record.splice(0, 10);

      localStorage.setItem('record', JSON.stringify(this._record));
    }

    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('limit', this.limit)
      .set('q', value);

    this.http
      .get<GifsResponse>(`${this.api_url}search`, { params })
      .subscribe((response) => {
        this.results = response.data;
        localStorage.setItem('last_results', JSON.stringify(this.results));
      });
  }
}
