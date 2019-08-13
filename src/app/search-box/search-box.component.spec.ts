import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SimpleModalService } from 'ngx-simple-modal';

import { SearchBoxComponent } from './search-box.component';
import { of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;

  beforeEach(async(() => {
    const AngularFirestoreStub = {
      collection: (_) => ({
        valueChanges: () => of([])
      }),
    };
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      providers: [
        SimpleModalService,
        { provide: AngularFirestore, useValue: AngularFirestoreStub }
      ],
      declarations: [ SearchBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
