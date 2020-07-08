import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizreviewComponent } from './quizreview.component';

describe('QuizreviewComponent', () => {
  let component: QuizreviewComponent;
  let fixture: ComponentFixture<QuizreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
