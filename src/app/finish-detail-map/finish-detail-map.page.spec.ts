import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinishDetailMapPage } from './finish-detail-map.page';

describe('FinishDetailMapPage', () => {
  let component: FinishDetailMapPage;
  let fixture: ComponentFixture<FinishDetailMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishDetailMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinishDetailMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
