import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicdialogComponent } from './topicdialog.component';

describe('TopicdialogComponent', () => {
  let component: TopicdialogComponent;
  let fixture: ComponentFixture<TopicdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
