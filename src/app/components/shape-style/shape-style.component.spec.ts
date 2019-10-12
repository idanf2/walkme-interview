import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeStyleComponent } from './shape-style.component';

describe('ShapeStyleComponent', () => {
  let component: ShapeStyleComponent;
  let fixture: ComponentFixture<ShapeStyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShapeStyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
