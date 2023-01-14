import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePackagelistComponent } from './delete-packagelist.component';

describe('DeletePackagelistComponent', () => {
  let component: DeletePackagelistComponent;
  let fixture: ComponentFixture<DeletePackagelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePackagelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePackagelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
