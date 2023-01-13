import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPackagelistComponent } from './add-packagelist.component';

describe('AddPackagelistComponent', () => {
  let component: AddPackagelistComponent;
  let fixture: ComponentFixture<AddPackagelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPackagelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPackagelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
