import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBodyDashboardComponent } from './dialog-body-dashboard.component';

describe('DialogBodyDashboardComponent', () => {
  let component: DialogBodyDashboardComponent;
  let fixture: ComponentFixture<DialogBodyDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogBodyDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogBodyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
