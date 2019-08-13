import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MylistItemComponent } from './mylist-item.component';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

describe('MylistItemComponent', () => {
  let component: MylistItemComponent;
  let fixture: ComponentFixture<MylistItemComponent>;

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
        { provide: AngularFirestore, useValue: AngularFirestoreStub }
      ],
      declarations: [ MylistItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MylistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
