import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TipService } from 'src/app/services/tip.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup
  profilePicture: any
  submitted = false;
  constructor(public dialogRef: MatDialogRef<ProfileComponent>, private tipService: TipService) {
    this.profileForm = new FormGroup({
      email: new FormControl(window.localStorage.getItem('email'), [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'), Validators.required]),
      username: new FormControl(window.localStorage.getItem('username'), [Validators.pattern('^.{4,}$'),Validators.required]),
      password: new FormControl('', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/), Validators.required]),
    })
  }
  ngOnInit(): void {
    const imageDataUrl = localStorage.getItem('profilePicture');
    if (imageDataUrl) {
      this.profilePicture = imageDataUrl;
    } else {
      this.profilePicture = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    }
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.profilePicture = reader.result as string;
      localStorage.setItem('profilePicture', this.profilePicture);
    };
    reader.readAsDataURL(file);
  }
  get f() { return this.profileForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.profileForm.valid) {
      this.tipService.updateUser(window.localStorage.getItem('auth'), this.profileForm.value)
    }
  }
}
