import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagEditDialogComponent } from './tag-edit-dialog.component';
import { FormsModule } from '@angular/forms';

describe('TagEditDialogComponent', () => {
  let component: TagEditDialogComponent;
  let fixture: ComponentFixture<TagEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [ TagEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
