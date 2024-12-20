import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImgComponent } from './edit-img.component';

describe('EditImgComponent', () => {
  let component: EditImgComponent;
  let fixture: ComponentFixture<EditImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditImgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
