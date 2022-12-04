import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentMoviesComponent } from './rent-movies.component';

describe('RentMoviesComponent', () => {
  let component: RentMoviesComponent;
  let fixture: ComponentFixture<RentMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentMoviesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
