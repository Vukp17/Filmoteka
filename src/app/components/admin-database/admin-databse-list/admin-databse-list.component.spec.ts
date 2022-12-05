import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDatabseListComponent } from './admin-databse-list.component';

describe('AdminDatabseListComponent', () => {
  let component: AdminDatabseListComponent;
  let fixture: ComponentFixture<AdminDatabseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDatabseListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDatabseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
