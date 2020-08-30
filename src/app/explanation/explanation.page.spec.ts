import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExplanationPage } from './explanation.page';

describe('ExplanationPage', () => {
  let component: ExplanationPage;
  let fixture: ComponentFixture<ExplanationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplanationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExplanationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
