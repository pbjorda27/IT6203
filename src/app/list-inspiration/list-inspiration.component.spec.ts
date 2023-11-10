import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInspirationComponent } from './list-inspiration.component';

describe('ListInspirationComponent', () => {
  let component: ListInspirationComponent;
  let fixture: ComponentFixture<ListInspirationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListInspirationComponent]
    });
    fixture = TestBed.createComponent(ListInspirationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
