import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { BasicTablesService } from 'app/pages/tables/components/basicTables/basicTables.service';
import { NgUploaderOptions } from 'ngx-uploader/ngx-uploader';
import { appConfig } from '../../app.config';
import { ProfileService } from 'app/_services/profile.service';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.scss'],
})
export class ManageProfileComponent implements OnInit {

  form: FormGroup;
  profileName: AbstractControl;
  description: AbstractControl;
  inputtedBlackIp: AbstractControl;

  profileList: any[];
  blackIpList: any[];

  submitted: boolean = false;

  constructor(fb: FormBuilder,
    private _basicTablesService: BasicTablesService,
    private _profileService: ProfileService) {

    this.blackIpList = [];
    this.loadProfileList();
    // this.profileList = [
    //   {
    //     id: 1,
    //     blackIp: 'Mark',
    //     description: 'Otto',
    //   },
    //   {
    //     id: 2,
    //     blackIp: 'Jacob',
    //     description: 'Thornton',
    //   },
    //   {
    //     id: 3,
    //     blackIp: 'Larry',
    //     description: 'Bird',
    //   },
    //   {
    //     id: 4,
    //     blackIp: 'John',
    //     description: 'Snow',
    //   },
    //   {
    //     id: 5,
    //     blackIp: 'Jack',
    //     description: 'Sparrow',
    //   },
    //   {
    //     id: 6,
    //     blackIp: 'Ann',
    //     description: 'Smith',
    //   },
    // ];

    this.form = fb.group({
      'profileName': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'description': ['', Validators.compose([])],
      'inputtedBlackIp': ['', Validators.compose([])],
    });

    this.profileName = this.form.controls['profileName'];
    this.description = this.form.controls['description'];
    this.inputtedBlackIp = this.form.controls['inputtedBlackIp'];
  }

  ngOnInit() {
  }

  onSubmit(values: any): void {
    this.submitted = true;

    if (this.form.valid) {
      const formData = {
        name: this.profileName.value,
        description: this.description.value,
        blackIps: this.blackIpList,
      };

      this._profileService.add(formData)
        .subscribe(data => {
          console.log('Submit result: ');
          console.log(data);

          this.loadProfileList();

          this.submitted = false;
        }, error => {
          // this.alertService.error(error);
          console.log(error);

          this.submitted = false;
        });
    }
  }

  fileUploaderOptions: NgUploaderOptions = {
    url: `${appConfig.apiUrl}/profile/uploadBlacklistFile`,
  };

  onFileUploadCompleted(data) {
    const response = JSON.parse(data.response);

    response.forEach(element => {
      element.id = this.blackIpList.length + 1;

      this.blackIpList.push(element);
    });
  }

  checkAll(ev) {
    this.profileList.forEach(x => {
      x.state = ev.target.checked;
    });
  }

  isAllChecked() {
    console.log('fired');
    return this.profileList.every(_ => _.state);
  }

  selectedAll: any;
  checkIfAllSelected() {
    this.selectedAll = this.profileList.every(function (item: any) {
      return item.state;
    });
  }

  loadProfileList() {
    this.profileList = [];

    this._profileService.getAll()
      .subscribe(data => {
        this.profileList = data;
      }, error => {
        // this.alertService.error(error);
        console.log(error);

        this.submitted = false;
      });
  }

  btnInput_onClick() {
    let item = {
      id: this.blackIpList.length + 1,
      blackIp: this.inputtedBlackIp.value,
      description: ''
    };

    this.blackIpList.push(item);

    this.inputtedBlackIp.setValue('');
  }

  inputInputtedBlackIp_onEnter() {
    let item = {
      id: this.blackIpList.length + 1,
      blackIp: this.inputtedBlackIp.value,
      description: ''
    };

    this.blackIpList.push(item);

    this.inputtedBlackIp.setValue('');
  }

  btnItemDelete_onClick($event: any) {
    this._profileService.delete($event);
  }

}
