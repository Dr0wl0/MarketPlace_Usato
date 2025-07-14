import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostraListaComponent } from './mostra-lista.component';

describe('MostraListaComponent', () => {
  let component: MostraListaComponent;
  let fixture: ComponentFixture<MostraListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostraListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostraListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
