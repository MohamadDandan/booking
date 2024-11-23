import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateImgComponent } from './create-img.component';

describe('CreateImgComponent', () => {
  let component: CreateImgComponent;
  let fixture: ComponentFixture<CreateImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateImgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
