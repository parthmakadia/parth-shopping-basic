import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRestoreDialogComponent } from './product-restore-dialog.component';

describe('ProductRestoreDialogComponent', () => {
  let component: ProductRestoreDialogComponent;
  let fixture: ComponentFixture<ProductRestoreDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductRestoreDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRestoreDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
