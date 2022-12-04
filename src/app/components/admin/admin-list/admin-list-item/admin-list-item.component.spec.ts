import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListItemComponent } from './admin-list-item.component';

describe('AdminListItemComponent', () => {
  let component: AdminListItemComponent;
  let fixture: ComponentFixture<AdminListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
