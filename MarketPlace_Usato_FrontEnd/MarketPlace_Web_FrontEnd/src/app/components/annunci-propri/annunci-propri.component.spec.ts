import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnunciPropriComponent } from './annunci-propri.component';

describe('AnnunciPropriComponent', () => {
  let component: AnnunciPropriComponent;
  let fixture: ComponentFixture<AnnunciPropriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnunciPropriComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnunciPropriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
