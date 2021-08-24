import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDboardComponent } from './client-dboard.component';

describe('ClientDboardComponent', () => {
  let component: ClientDboardComponent;
  let fixture: ComponentFixture<ClientDboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
