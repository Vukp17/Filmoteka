import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDatabseListItemComponent } from './admin-databse-list-item.component';

describe('AdminDatabseListItemComponent', () => {
  let component: AdminDatabseListItemComponent;
  let fixture: ComponentFixture<AdminDatabseListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDatabseListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDatabseListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
