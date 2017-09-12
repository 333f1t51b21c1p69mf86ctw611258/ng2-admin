import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../theme/validators';
import { NgUploaderOptions } from 'ngx-uploader';
import { QueueBlacklistService } from 'app/_services/queueBlacklist.service';
import { ProfileService } from 'app/_services/profile.service';
import { appConfig } from '../../app.config';
import { AlertService } from 'app/_services';

@Component({
  selector: 'app-add-blacklist',
  templateUrl: './add-blacklist.component.html',
  styleUrls: ['./add-blacklist.component.scss'],
})
export class AddBlacklistComponent implements OnInit {

  json_filename: string;
  json_md5: string;
  json_id: number;

  profileList: any[];
  resultList: any[];

  form: FormGroup;
  deviceId: AbstractControl;
  redirectContent: AbstractControl;
  id: AbstractControl;

  fileUploaderOptions: NgUploaderOptions = {
    // url: 'http://website.com/upload'
    url: appConfig.apiUrl + '/queueBlacklists/uploadBlacklistFile',
  };

  submitted: boolean = false;

  constructor(fb: FormBuilder,
    private alertService: AlertService,
    private queueBlacklistService: QueueBlacklistService,
    private _profileService: ProfileService) {

    this.form = fb.group({
      'deviceId': ['18d071-H646FW-DSNW6a221190', Validators.compose([Validators.required, Validators.minLength(1)])],
      'redirectContent': ['', Validators.compose([])],
      'id': ['', Validators.compose([])],
    });

    this.deviceId = this.form.controls['deviceId'];
    this.id = this.form.controls['id'];
    this.redirectContent = this.form.controls['redirectContent'];

    // this.deviceId.setValue('00d0cb-GPON-DSNW651c10c8');

    this.loadProfileList();
  }

  ngOnInit() {
  }

  onSubmit(values: any): void {
    this.submitted = true;

    this.resultList = [];

    if (this.form.valid) {
      // your code goes here

      let selectedProfileIds: string = '';
      this.profileList.forEach(element => {
        if (element.state) {
          if (selectedProfileIds) {
            selectedProfileIds += ',';
          }
          selectedProfileIds += element._id;
        }
      });

      const formData = {
        deviceId: values.deviceId,
        redirectContent: values.redirectContent,
        selectedProfileIds: selectedProfileIds,
      };

      this.queueBlacklistService.add(formData)
        .subscribe(data => {
          this.json_id = data.id;
          this.id.setValue(data.id);

          console.log('Submit result: ');
          console.log(data);

          this.submitted = false;
        }, error => {
          // this.alertService.error(error);
          // console.log(error);
          this.alertService.error(error);

          this.submitted = false;
        });
    }
  }

  onFileUploadCompleted(data) {
    const responseData = JSON.parse(data.response);

    this.json_filename = responseData.filename;
    this.json_md5 = responseData.md5;
  }

  btnUpdateResult_onClick() {
    this.queueBlacklistService.getAddResult(this.id.value)
      .subscribe(data => {
        console.log('All statuses:');
        console.log(data);

        this.resultList = data;
      }, error => {
        // this.alertService.error(error);
        console.log(error);
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

}
