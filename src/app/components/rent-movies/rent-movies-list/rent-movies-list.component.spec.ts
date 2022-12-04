import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentMoviesListComponent } from './rent-movies-list.component';

describe('RentMoviesListComponent', () => {
  let component: RentMoviesListComponent;
  let fixture: ComponentFixture<RentMoviesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentMoviesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentMoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
