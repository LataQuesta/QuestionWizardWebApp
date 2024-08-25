import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CorporateRegisterModel } from '../../CorporateModel/CorporateRegisterModel';
import { AgeBM, CountryBM, EmployeeStatusBM, ExperienceBM, GenderBM, MaritalStatusBM, ProfessionBM, QualificationBM, StateBM } from '../../CorporateModel/MasterModel';
import { CorporateMasterService } from '../../CorporateService/corporate-master.service';
import { CorporateUserService } from '../../CorporateService/corporate-user.service';
import { CorporateDialogService } from '../../CorporateService/corporate-dialog.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AgeCalculator, RequirevalidatorForState, RequirevalidatorGender, RequirevalidatorQualification } from 'src/app/Global/Require-Validator.directive';
import { MatDialog } from '@angular/material/dialog';
import { OTPDialogComponent } from 'src/app/corporate-dialog/otpdialog/otpdialog.component';
import { ErrorHandlerService } from 'src/app/CorporateErrorLog/Service/error-handler.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../date.adapter';

@Component({
  selector: 'app-corporate-register',
  templateUrl: './corporate-register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./corporate-register.component.css'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    },
    {provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}}
  ]

})
export class CorporateRegisterComponent implements OnInit {

  name = 'Angular 6';
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
 

  experience : ExperienceBM[]
  countries: CountryBM[];
  states: StateBM[];
  Qualification: QualificationBM[];
  Profession: ProfessionBM[];
  Gender: GenderBM[];
  MaritalStatus: MaritalStatusBM[];
  EmployeeStatus: EmployeeStatusBM[];
  Industry: string[];
  Age: AgeBM[];
  CorporateModel: CorporateRegisterModel = new CorporateRegisterModel();
  IsDisableAllControl: boolean;
  TestId: Number;
  CorporateRegisterForm: FormGroup;
  CandidateFirstStage : FormGroup;
  CandidateSecondStage : FormGroup;
  CandidateThirdStage : FormGroup;
  submitted = false;
  loading = false;
  MessageLog: string;

  @ViewChild('search') searchTextBox: ElementRef;
  searchTextboxControl = new FormControl();
  selectedValues = [];
  filteredOptions: Observable<any[]>;

  subscriptions: Subscription[] = [];

  connectionStatusMessage: string;
  connectionStatus: string;

  OTPdialogRef: any;
  modelId: number;
  constructor(
    private _MasterSvc: CorporateMasterService,
    private _userSvc: CorporateUserService,
    private _router: Router,
    private formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    public matDialog: MatDialog,
    private dialogService: CorporateDialogService,
    private deviceService: DeviceDetectorService,
    private cdRef: ChangeDetectorRef,
    private _ErrorSvc: ErrorHandlerService) { }
  @ViewChild('stepper') stepper: MatStepper;


  ngOnInit() {




    this._route.paramMap.subscribe((params: ParamMap) => {
      let Id = params.get('Testid');
      this.TestId = parseInt(params.get('Testid'));

    });

    this.DeclareFormBuilder();

    this.GetAllMasterFieldData();

    this.GetCandidateData();

  }
  ngAfterViewInit() {
    //   this.stepper.selectedIndex = 2; 

    this.cdRef.detectChanges();
  }
  ngOnDestroy(): void {
    /**
     * Unsubscribe all subscriptions to avoid memory leak
     */
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  get f1() { return this.CandidateFirstStage.controls; }
  get f2() { return this.CandidateSecondStage.controls; }
  get f3() { return this.CandidateThirdStage.controls; }

  DeclareFormBuilder() {

    this.CandidateFirstStage = this.formBuilder.group(
      {

        FirstName: ["", [Validators.required]],
        LastName: ["", [Validators.required]],
        MiddelName : [""],
        Gender: ["", [Validators.required, Validators.min(1)]],
        GenderTxt: [""],
        DateOfBirth:[""]
      },
      {
        validator: [RequirevalidatorGender("Gender", "GenderTxt"),AgeCalculator("DateOfBirth")],
      }
    )
    this.CandidateSecondStage= this.formBuilder.group(
      {

        Email: ["", [Validators.required,Validators.email]],
        Phone: ["", [Validators.required,Validators.pattern("[0-9 ]{10}")]],
        Country: ["", [Validators.required, Validators.min(1)]],
        State: [""]
      },
      {
        validator: [   RequirevalidatorForState("Country", "State")]
      }
    )

    this.CandidateThirdStage= this.formBuilder.group(
      {

        Qualification: ["", [Validators.required, Validators.min(1)]],
        QualificationTxt: [""],
        Industry: ["", [Validators.required]],
        EmployeeStatus: ["", [Validators.required, Validators.min(1)]],
        Experience: ["", [Validators.required, Validators.min(1)]],
      },
      {
        validator: [ RequirevalidatorQualification("Qualification", "QualificationTxt")]
      }
    )

   /* this.CorporateRegisterForm = this.formBuilder.group(
      {
        Gender: ["", [Validators.required, Validators.min(1)]],
        GenderTxt: [""],
        Age: ["", [Validators.required, Validators.min(1)]],
        MaritalStatus: ["", [Validators.required, Validators.min(1)]],
        Qualification: ["", [Validators.required, Validators.min(1)]],
        QualificationTxt: [""],
        EmployeeStatus: ["", [Validators.required, Validators.min(1)]],
        Industry: ["", [Validators.required]],
        Country: ["", [Validators.required, Validators.min(1)]],
        State: [""]
      },
      {
        // Used custom form validator name
        validator: [RequirevalidatorGender("Gender", "GenderTxt"),
        RequirevalidatorQualification("Qualification", "QualificationTxt"),
        RequirevalidatorForState("Country", "State")]
      }
    );*/
  }

  GetAllMasterFieldData() {
    this._MasterSvc.GetCorporateMasterData().subscribe(
      data => {
        debugger
        this.countries = data.Countries;
        this.Qualification = data.Qualification;

        this.Profession = data.Profession;
        this.Age = data.Age;
        this.Gender = data.Gender;
        this.MaritalStatus = data.MaritalStatus;
        this.EmployeeStatus = data.EmployeeStatus;
        this.Industry = data.Industry;
        this.experience = data.Experience;

        this.filteredOptions = this.searchTextboxControl.valueChanges
          .pipe(
            startWith<string>(''),
            map(name => this._filter(name))
          );
      }
    );
  }

  GetCandidateData() {
    this._userSvc.GetCorporateCandiateData(this.TestId).subscribe(data => {
      if (data.IsSuccess) {
        this.CorporateModel = data.CandidateData;
        this.CorporateModel.BrowserName = this.deviceService.browser;
        this.CorporateModel.IsMobileDevice = this.deviceService.isMobile();
        this.CorporateModel.IsTabDevice = this.deviceService.isTablet();
        this.CorporateModel.IsDesktopDevice = this.deviceService.isDesktop();
        if (this.CorporateModel.Country !== 0) {
          this.onChangeCountry(this.CorporateModel.Country);
        }
        this.IsDisableAllControl = data.IsDisableAllControl;

        if (this.IsDisableAllControl) {
          for (let i = 0; i <= this.CorporateModel.Industry.length - 1; i++) {
            this.selectedValues.push(this.CorporateModel.Industry[i]);
          }
        //  this.CorporateRegisterForm.disable();
          this.CandidateFirstStage.disable();
          this.CandidateSecondStage.disable();
          this.CandidateThirdStage.disable();
          this.stepper.selectedIndex = 2;
        }

      } else {
        this._userSvc.RemoveLocalStorage();
        this._router.navigate(['/PageNotFound']);
      }
    })
  }


  onChangeCountry(countryId: number) {
    if (countryId) {
      this._MasterSvc.GetCorporateStateData(countryId).subscribe(
        data => {
          this.states = data.State
        });
    } else {
      this.states = null;
    }
  }

  OnSubmitCorporateDetails() {

    this.submitted = true;
    this.loading = true;
    // Returns false if form is invalid
    if (this.CandidateFirstStage.invalid && this.CandidateSecondStage.invalid && this.CandidateThirdStage.invalid) {
      return;
    }

    this.modelId = this.modelId + 1;


    if (this.OTPdialogRef !== undefined) {
      if (!this.OTPdialogRef.openDialogs || !this.OTPdialogRef.openDialogs.length) return;
    }
    if (this.CorporateModel.IsOTPRequire === true) {
      this.OTPdialogRef = this.matDialog.open(OTPDialogComponent, {
        disableClose: true,
        id: "OTP-component" + this.modelId,
        data: { MobileNo: this.CorporateModel.PhoneNumber, email: this.CorporateModel.UserEmail },
      })
      this.OTPdialogRef.afterClosed().subscribe(res => {
        if (res.data === "true") {
          this.SaveCandidateData(this.CorporateModel);
        }
      });
    } else {
      this.SaveCandidateData(this.CorporateModel);
    }


  }

  SaveCandidateData(CandidateM: CorporateRegisterModel) {
    this.CorporateModel.BrowserName = this.deviceService.browser;
    this.CorporateModel.IsMobileDevice = this.deviceService.isMobile();
    this.CorporateModel.IsTabDevice = this.deviceService.isTablet();
    this.CorporateModel.IsDesktopDevice = this.deviceService.isDesktop();

    this._userSvc.CorporateAuthencation(CandidateM.TestId, '')
      .subscribe((data: any) => {
        localStorage.setItem('TestId', CandidateM.TestId.toString());
        localStorage.setItem('userToken', data.access_token);
        this.SaveCandidateDetail(CandidateM);
      });

  }

  SaveCandidateDetail(CandidateM: CorporateRegisterModel) {
    this._userSvc.SaveCorporateDetails(CandidateM).
      subscribe((res: any) => {
        if (res.isSuccess) {
          this._router.navigate(['/QuestionSeries', res.ExamId]);
        } else {
          this._userSvc.RemoveLocalStorage();
          this.MessageLog = res.Error;
        }
      })
  }



 // get f() {
//    return this.CorporateRegisterForm.controls;
 // }

  onChangeGender(GenderId: number) {
    if (GenderId !== 3) {
      this.CandidateFirstStage.controls['GenderTxt'].reset();
    }
  }

  /** Start Multi select searchable dropdown */

  private _filter(name: string): string[] {
    debugger
    const filterValue = name.toLowerCase();
    // Set selected values to retain the selected checkbox state 
    this.setSelectedValues();
    this.CandidateThirdStage.controls["Industry"].patchValue(this.selectedValues);
    let filteredList = this.Industry.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    return filteredList;
  }
  selectionChange(event) {
    if (event.isUserInput && event.source.selected == false) {
      let index = this.selectedValues.indexOf(event.source.value);
      this.selectedValues.splice(index, 1)
    }
  }
  openedChange(e) {
    // Set search textbox value as empty while opening selectbox 
    this.searchTextboxControl.patchValue('');
    // Focus to search textbox while clicking on selectbox
    if (e == true) {
      this.searchTextBox.nativeElement.focus();
    }
  }
  clearSearch(event) {
    event.stopPropagation();
    this.searchTextboxControl.patchValue('');
  }
  setSelectedValues() {
    // console.log('selectFormControl',  this.candidateregisterForm.controls["Qualification"].value);
    if (this.CandidateThirdStage.controls["Industry"].value && this.CandidateThirdStage.controls["Industry"].value.length > 0) {
      this.CandidateThirdStage.controls["Industry"].value.forEach((e) => {
        let IndustryId = e;
        if (this.selectedValues.indexOf(IndustryId) == -1) {
          this.selectedValues.push(e);
        }
      });
    }
  }
  GetFirstpostionValue(Data: string[]): string {
    if (Data === null || Data === undefined) {
      return;
    } else {
      var length = Data.length;
      if (length > 0) {
        let IndustryName = Data[0].toString();
        return IndustryName
      }
    }
    return '';
  }
  GetLengthIndustry(Data: string[]): boolean {
    if (Data === null || Data === undefined) {
      return;
    } else {
      var length = Data.length;
      if (length > 1) {
        return true
      }
    }

    return false
  }
  CountIndustryValue(Data: string[]): string {
    if (Data !== null) {
      var length = Data.length;
      var IndustryDisplay;
      if (length > 1) {
        IndustryDisplay = length - 1
        IndustryDisplay = IndustryDisplay + (length === 2 ? 'other' : 'others');
        return IndustryDisplay
      }
    }

    return '';
  }
  FilterIndustryCount(FilterIndustryData: any) {
    if (FilterIndustryData !== null) {
      var length = FilterIndustryData.length;
      if (length === 0) {
        return true
      }
    }

    return false
  }

  moveToSelectedTab(tabName: string) {
    for (let i = 0; i < document.querySelectorAll('.mat-tab-label-content').length; i++) {
      if ((<HTMLElement>document.querySelectorAll('.mat-tab-label-content')[i]).innerText == tabName) {
        (<HTMLElement>document.querySelectorAll('.mat-tab-label')[i]).click();
      }
    }
  }
  /**End */

}
