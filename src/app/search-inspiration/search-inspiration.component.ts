import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { InspirationService } from '../inspiration.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-inspiration',
  templateUrl: './search-inspiration.component.html',
  styleUrls: ['./search-inspiration.component.css']
})
export class SearchInspirationComponent {

  searchText: string = '';
  inspiration: string = '';
  searchResults: any[] = [];
  searchPerformed: boolean = false; // Add a flag to track if search has been done
  selectedInspiration$: Observable<any> | null = null;

  constructor(private inspirationService: InspirationService, private cdr: ChangeDetectorRef, private ngZone: NgZone, private router: Router) { }

  onSearch(keyword: string) {
    console.log('Search triggered with keyword:', keyword);
    this.inspirationService.searchAndFilterByKeyword(keyword)
      .pipe(
        switchMap((data: any) => {
          console.log('Received data from service:', data);
          // Check if the data is undefined or an empty array
          if (!data || (Array.isArray(data) && data.length === 0)) {
            console.log('No data found');
            return of(null);
          }

          // Check if the data is an array; if not, wrap it in an array
          const dataArray = Array.isArray(data) ? data : [data];
          const randomIndex = Math.floor(Math.random() * dataArray.length);
          return of([dataArray[randomIndex]]);
        })
      )
      .subscribe((data: any[] | null) => {
        console.log('Final data:', data);
        this.selectedInspiration$ = of(data);
        this.searchPerformed = true;
      });
  }

  transformToUpperCase(value: string): string {
    return value.toUpperCase();
  }

  goToAddInspiration() {
    this.router.navigate(['/addInspiration']); // Adjust the route as needed
  }

}





