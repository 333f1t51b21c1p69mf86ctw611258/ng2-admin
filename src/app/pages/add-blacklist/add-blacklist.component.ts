import { Component, OnInit } from '@angular/core';

//
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../theme/validators';
import { NgUploaderOptions } from 'ngx-uploader';

//
import { QueueBlacklistService } from 'app/_services/queueBlacklist.service';

//
import { appConfig } from '../../app.config';

@Component({
  selector: 'app-add-blacklist',
  templateUrl: './add-blacklist.component.html',
  styleUrls: ['./add-blacklist.component.scss'],
})
export class AddBlacklistComponent implements OnInit {

  json_filename: string;
  json_md5: string;
  json_id: number;

  form: FormGroup;
  deviceId: AbstractControl;
  id: AbstractControl;

  submitted: boolean = false;

  constructor(fb: FormBuilder,
    private queueBlacklistService: QueueBlacklistService) {

    this.form = fb.group({
      'deviceId': ['18d071-H646FW-DSNW6a290900', Validators.compose([Validators.required, Validators.minLength(4)])],
      'id': ['', Validators.compose([])]
    });

    this.deviceId = this.form.controls['deviceId'];
    this.id = this.form.controls['id'];

    // this.deviceId.setValue('00d0cb-GPON-DSNW651c10c8');
  }

  ngOnInit() {
  }

  onSubmit(values: any): void {
    this.submitted = true;

    if (this.form.valid) {
      // your code goes here

      this.queueBlacklistService.add(values.deviceId, this.json_filename, this.json_md5)
        .subscribe(data => {
          this.json_id = data.id;
          this.id.setValue(data.id);

          console.log('Submit result: ');
          console.log(data);

          this.submitted = false;
        },
        error => {
          // this.alertService.error(error);
          console.log(error);

          this.submitted = false;
        });
    }
  }

  fileUploaderOptions: NgUploaderOptions = {
    // url: 'http://website.com/upload'
    url: appConfig.apiUrl + '/queueBlacklists/uploadBlacklistFile',
  };

  onFileUploadCompleted(data) {
    const responseData = JSON.parse(data.response)[0];

    this.json_filename = responseData.filename;
    this.json_md5 = responseData.md5;
  }

  btnUpdateResult_onClick() {
    this.queueBlacklistService.getAddResult(this.id.value)
      .subscribe(data => {
        console.log('All statuses:');
        console.log(data);
      }, error => {
        // this.alertService.error(error);
        console.log(error);
      });
  }

}
