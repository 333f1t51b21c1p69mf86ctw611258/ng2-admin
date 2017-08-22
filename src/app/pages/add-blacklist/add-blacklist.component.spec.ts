import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlacklistComponent } from './add-blacklist.component';

describe('AddBlacklistComponent', () => {
  let component: AddBlacklistComponent;
  let fixture: ComponentFixture<AddBlacklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBlacklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBlacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
