import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinishDetailPage } from './finish-detail.page';

describe('FinishDetailPage', () => {
  let component: FinishDetailPage;
  let fixture: ComponentFixture<FinishDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinishDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
