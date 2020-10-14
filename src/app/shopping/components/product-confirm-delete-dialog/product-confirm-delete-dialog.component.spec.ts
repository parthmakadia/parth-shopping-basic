import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductConfirmDeleteDialogComponent } from './product-confirm-delete-dialog.component';

describe('ProductConfirmDeleteDialogComponent', () => {
  let component: ProductConfirmDeleteDialogComponent;
  let fixture: ComponentFixture<ProductConfirmDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductConfirmDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductConfirmDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
