import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTabelComponent } from './user-tabel.component';

describe('UserTabelComponent', () => {
  let component: UserTabelComponent;
  let fixture: ComponentFixture<UserTabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
