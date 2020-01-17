import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateBankingComponent } from './private-banking.component';

describe('PrivateBankingComponent', () => {
  let component: PrivateBankingComponent;
  let fixture: ComponentFixture<PrivateBankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateBankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateBankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
