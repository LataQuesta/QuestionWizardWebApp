import { FormGroup, AbstractControl, FormArray } from "@angular/forms";


export function RequirevalidatorGender(GenderControlName: string,GenderTxtControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[GenderControlName];
        const matchingControl = formGroup.controls[GenderTxtControlName];

        if (control.value === 3 && (matchingControl.value ! === ""|| matchingControl.value === null)) {
            matchingControl.setErrors({ validGendertxt: true });
        } else {
            matchingControl.setErrors(null);
        }
        return null;
    };
}


export function RequirevalidatorQualification(QualificationControlName: string,QualificationTxtControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[QualificationControlName];
        const matchingControl = formGroup.controls[QualificationTxtControlName];

        if (control.value === 8 && (matchingControl.value ! === ""|| matchingControl.value === null)) {
            matchingControl.setErrors({ validQualificationtxt: true });
        } else {
            matchingControl.setErrors(null);
        }
        return null;
    };
}


export function RequirevalidatorForState(CountryControlName: string,stateControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[CountryControlName];
        const matchingControl = formGroup.controls[stateControlName];
        if (control.value === 1 && (matchingControl.value === undefined || matchingControl.value === null || matchingControl.value === "" || matchingControl.value ===0)) {
            matchingControl.setErrors({ validstate: true });
        } else {
            matchingControl.setErrors(null);
        }
        return null;
    };
}



export function AgeCalculator(AgeControlName: string) {
    return (formGroup: FormGroup) => {
        const AgeControl = formGroup.controls[AgeControlName];
       // const matchingControl = formGroup.controls[GenderTxtControlName];
       const convertAge = new Date(AgeControl.value);
       const timeDiff = Math.abs(Date.now() - convertAge.getTime());
       let AgeCount = Math.floor((timeDiff / (1000 * 3600 * 24))/365);

        if(AgeControl.value === undefined || AgeControl.value === null || AgeControl.value === "" || AgeControl.value ===0 || AgeCount <= 17){
            AgeControl.setErrors({ InvalidAgeCount: true });
        }else {
            AgeControl.setErrors(null);
        }

        return null;
    };
}

export function multipleCheckboxRequireOne(fa: FormArray) {
    let valid = false;
    
    for (let x = 0; x < fa.length; ++x) {
      if (fa.at(x).value) {
        valid = true;
        break;
      }
    }
    return valid ? null : {
      multipleCheckboxRequireOne: true
    };
  }