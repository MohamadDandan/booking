import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnProcessMenuComponent } from './on-process-menu.component';

describe('OnProcessMenuComponent', () => {
  let component: OnProcessMenuComponent;
  let fixture: ComponentFixture<OnProcessMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnProcessMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnProcessMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
