import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessGrantComponent } from './access-grant.component';

describe('AccessGrantComponent', () => {
  let component: AccessGrantComponent;
  let fixture: ComponentFixture<AccessGrantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessGrantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessGrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
