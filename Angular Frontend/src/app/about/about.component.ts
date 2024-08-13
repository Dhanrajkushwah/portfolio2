import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('2s ease-in-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class AboutComponent implements OnInit {
  contactForm!: FormGroup;
  ckDep: boolean = false;
  contactdata: any = [];
  constructor(private fb: FormBuilder,private router: Router,private service: ContactService) { }

  ngOnInit(): void {
    this.getNotes();
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      yourmessage: ['', Validators.required],
      });
  }
  getNotes() {
    this.service.getContact().subscribe(res => {
      this.contactdata = res.data;
      console.log("Contactdata", this.contactdata);
    });
  }
  onContact(): void {
    if (this.contactForm.invalid) {
      this.ckDep = true;
      return;
    }

    console.log("formData", this.contactForm.value);
    this.service.addContact(this.contactForm.value).subscribe(
      (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Contact Us successful!',
          text: 'Contact data added successfully',
          confirmButtonText: 'OK'
        });
        this.contactForm.reset();
        this.router.navigate(["/about"]);
        console.log(res);
      },
      (err: any) => {
        if (err.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Contact Failed!',
            text: 'User already exists',
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Contact Failed!',
            text: 'Something went wrong. Please try again later.',
            confirmButtonText: 'OK'
          });
        }
        console.error('Error:', err);
      }
    );
  }

}
