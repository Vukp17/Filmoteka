import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDbListComponent } from './admin-db-list.component';

describe('AdminDbListComponent', () => {
  let component: AdminDbListComponent;
  let fixture: ComponentFixture<AdminDbListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDbListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDbListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
