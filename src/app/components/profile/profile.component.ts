import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ImagesService } from 'src/app/services/images.service';
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
  constructor(private imageService: ImagesService, public dialogRef: MatDialogRef<ProfileComponent>, private tipService: TipService) {
    this.profileForm = new FormGroup({
      email: new FormControl(window.localStorage.getItem('email'), [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'), Validators.required]),
      username: new FormControl(window.localStorage.getItem('username'), [Validators.pattern('^.{4,}$'), Validators.required]),
      password: new FormControl('', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/), Validators.required]),
    })
  }
  ngOnInit(): void {
    this.imageService.image$.subscribe((value: string) => {
      this.profilePicture = value
    })
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.profilePicture = reader.result as string;
      window.localStorage.setItem('profilePicture', this.profilePicture);
      this.imageService.image$.next(this.profilePicture)
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
