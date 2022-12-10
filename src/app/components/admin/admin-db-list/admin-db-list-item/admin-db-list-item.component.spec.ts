import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDbListItemComponent } from './admin-db-list-item.component';

describe('AdminDbListItemComponent', () => {
  let component: AdminDbListItemComponent;
  let fixture: ComponentFixture<AdminDbListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDbListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDbListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
