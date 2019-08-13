import { TestBed } from '@angular/core/testing';

import { MylistService } from './mylist.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MylistService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ]
  }));

  it('should be created', () => {
    const service: MylistService = TestBed.get(MylistService);
    expect(service).toBeTruthy();
  });
});
