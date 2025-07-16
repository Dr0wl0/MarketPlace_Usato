import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnunciPreferitiComponent } from './annunci-preferiti.component';

describe('AnnunciPreferitiComponent', () => {
  let component: AnnunciPreferitiComponent;
  let fixture: ComponentFixture<AnnunciPreferitiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnunciPreferitiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnunciPreferitiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
