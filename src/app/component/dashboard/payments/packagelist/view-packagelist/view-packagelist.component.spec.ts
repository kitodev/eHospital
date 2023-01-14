import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPackagelistComponent } from './view-packagelist.component';

describe('ViewPackagelistComponent', () => {
  let component: ViewPackagelistComponent;
  let fixture: ComponentFixture<ViewPackagelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPackagelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPackagelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
