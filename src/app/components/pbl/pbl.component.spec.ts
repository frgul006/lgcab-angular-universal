import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PblComponent } from './pbl.component';

describe('PblComponent', () => {
  let component: PblComponent;
  let fixture: ComponentFixture<PblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
