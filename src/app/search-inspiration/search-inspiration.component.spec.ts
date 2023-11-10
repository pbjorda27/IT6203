import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInspirationComponent } from './search-inspiration.component';

describe('SearchInspirationComponent', () => {
  let component: SearchInspirationComponent;
  let fixture: ComponentFixture<SearchInspirationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchInspirationComponent]
    });
    fixture = TestBed.createComponent(SearchInspirationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
