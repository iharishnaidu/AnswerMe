import { TestBed } from '@angular/core/testing';

import { QuestionnaireserviceService } from './questionnaireservice.service';

describe('QuestionnaireserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionnaireserviceService = TestBed.get(QuestionnaireserviceService);
    expect(service).toBeTruthy();
  });
});
