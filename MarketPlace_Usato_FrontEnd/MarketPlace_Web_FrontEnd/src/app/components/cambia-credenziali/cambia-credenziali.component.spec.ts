import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiaCredenzialiComponent } from './cambia-credenziali.component';

describe('CambiaCredenzialiComponent', () => {
  let component: CambiaCredenzialiComponent;
  let fixture: ComponentFixture<CambiaCredenzialiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambiaCredenzialiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambiaCredenzialiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
