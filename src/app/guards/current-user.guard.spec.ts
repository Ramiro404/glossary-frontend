import { TestBed } from '@angular/core/testing';

import { CurrentUserGuard } from './current-user.guard';

describe('CurrentUserGuard', () => {
  let guard: CurrentUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CurrentUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
