import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentMoviesItemComponent } from './rent-movies-item.component';

describe('RentMoviesItemComponent', () => {
  let component: RentMoviesItemComponent;
  let fixture: ComponentFixture<RentMoviesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentMoviesItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentMoviesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
