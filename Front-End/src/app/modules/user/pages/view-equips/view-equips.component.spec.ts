import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEquipsComponent } from './view-equips.component';

describe('ViewEquipsComponent', () => {
  let component: ViewEquipsComponent;
  let fixture: ComponentFixture<ViewEquipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewEquipsComponent]
    });
    fixture = TestBed.createComponent(ViewEquipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
