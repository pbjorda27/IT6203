import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class YoutubeApiService {
  private apiUrl = 'https://www.googleapis.com/youtube/v3/search';

  constructor(private http: HttpClient) { }

  searchVideos(query: string): Observable<any[]> {
    let params = new HttpParams();
    params = params.set('q', query);
    params = params.set('part', 'snippet');
    params = params.set('type', 'video');
    params = params.set('key', 'AIzaSyC8G-MXndLO78VmUnSWUbJpW7_7nDd5GTM');
    params = params.set('maxResults', '15');

    return this.http.get<any>(this.apiUrl, { params })
      .pipe(
        map(response => response.items)
      );
  }
}
