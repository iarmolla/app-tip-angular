import { Component, OnInit } from '@angular/core';
import { getIdToken } from '@angular/fire/auth';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
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
  hidePassword: boolean = true;
  hidePasswordTwo: boolean = true;
  error: string = ''
  constructor(private authService: AuthService, private router: Router, private imageService: ImageService, public dialogRef: MatDialogRef<ProfileComponent>, private tipService: TipService) {
    this.profileForm = new FormGroup({
      email: new FormControl(window.localStorage.getItem('email'), [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'), Validators.required]),
      newPassword: new FormControl('', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/), Validators.required]),
    })
  }
  ngOnInit(): void {
    const id = window.localStorage.getItem('auth')
    if (id) {
      this.tipService.getUserById(id).subscribe((user: any) => {
        this.profilePicture = user.profileImage || this.imageService.getImage
      })
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.profilePicture = reader.result as string;
      const id = window.localStorage.getItem('auth')
      this.tipService.changeProfileImage(this.profilePicture, id)
    };
    reader.readAsDataURL(file);
  }
  get f() { return this.profileForm.controls; }
  async onSubmit() {
    this.submitted = true;
    if (this.profileForm.valid) {
      const { newPassword } = this.profileForm.value
      const res = await this.authService.updatePassword(newPassword)
      if (res) {
        this.error = res
      } else {
        window.localStorage.clear()
        this.router.navigate(['/login']).then(() => window.location.reload())
      }
    }
  }

}
