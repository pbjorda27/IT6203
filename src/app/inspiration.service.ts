import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// We know that the response will be in JSON format
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class InspirationService {

  private baseUrl = 'http://localhost:8000'; // Update the base URL

  constructor(private http: HttpClient) { }

  getInspiration(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/inspiration`);
  }

  searchAndFilterByKeyword(keyword: string): Observable<any | null> {
    return this.getInspiration().pipe(
      map((inspirations: any[]) => {
        const filteredInspirations = inspirations.filter(
          inspiration => inspiration.keyword1 === keyword ||
                         inspiration.keyword2 === keyword ||
                         inspiration.keyword3 === keyword
        );

        if (filteredInspirations.length > 0) {
          // Shuffle the inspirations
          const shuffledInspirations = this.shuffleArray(filteredInspirations);
          // Select the first (randomized) inspiration
          return shuffledInspirations[0];
        } else {
          return null;
        }
      })
    );
  }

  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Uses http.post() to post data 
  addInspiration(inspiration: string, keyword1: string, keyword2: string, keyword3: string) {
    this.http.post(`${this.baseUrl}/inspiration`, { inspiration, keyword1, keyword2, keyword3 })
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  deleteInspiration(inspirationId: string) {
    this.http.delete(`${this.baseUrl}/inspiration/${inspirationId}`)
      .subscribe(() => {
        console.log('Deleted: ' + inspirationId);
      });
    location.reload();
  }

  updateInspiration(inspirationId: string, inspiration: string, keyword1: string, keyword2: string, keyword3: string) {
    // Request path http://localhost:8000/inspiration/5xbd456xx 
    // Inspiration and keywords will be sent as HTTP body parameters 
    this.http.put(`${this.baseUrl}/inspiration/${inspirationId}`, { inspiration, keyword1, keyword2, keyword3 })
      .subscribe(() => {
        console.log('Updated: ' + inspirationId);
      });
  }

  // Uses http.get() to request data based on inspiration id 
  getInspiration1(inspirationId: string) {
    return this.http.get(`${this.baseUrl}/inspiration/${inspirationId}`);
  }

  searchByKeyword(keyword: string) {
    console.log('Searching for keyword:', keyword);
    return this.http.get(`${this.baseUrl}/inspiration/search?keyword=${keyword}`);
  }
}