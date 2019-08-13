import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';

import { MasterService } from './master.service';
import { of } from 'rxjs';

describe('MasterService', () => {
  const AngularFirestoreStub = {
    collection: (_) => ({
      valueChanges: () => of([])
    }),
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: AngularFirestore, useValue: AngularFirestoreStub }
    ]
  }));

  it('should be created', () => {
    const service: MasterService = TestBed.get(MasterService);
    expect(service).toBeTruthy();
  });
});
