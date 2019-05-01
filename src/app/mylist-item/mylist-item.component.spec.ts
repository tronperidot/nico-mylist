import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MylistItemComponent } from './mylist-item.component';

describe('MylistItemComponent', () => {
  let component: MylistItemComponent;
  let fixture: ComponentFixture<MylistItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
