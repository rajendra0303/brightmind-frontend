import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

interface ContactInfoItem {
  icon: string;
  title: string;
  description: string;
  value: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;
  submitMessage = '';

  contactInfo: ContactInfoItem[] = [
    { icon: '📍', title: 'Our Office', description: 'Visit our headquarters', value: 'Wakad Pune' },
    { icon: '📞', title: 'Phone', description: 'Call us anytime', value: '+91 7058346967' },
    { icon: '✉️', title: 'Email', description: 'Send us an email', value: 'hr@brightmind.dev' },
    { icon: '⏰', title: 'Hours', description: 'We are available', value: 'Mon - Fri, 9:00 - 18:00' }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(7)]],
      company: [''],
      service: ['', [Validators.required]],
      budget: [''],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {}

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors && (field.touched || field.dirty)) {
      if (field.errors['required']) {
        return `${this.pretty(fieldName)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        return `${this.pretty(fieldName)} is too short`;
      }
    }
    return '';
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      Object.values(this.contactForm.controls).forEach(control => control.markAsTouched());
      return;
    }
    this.isSubmitting = true;
    this.submitMessage = '';

    // Simulate submit
    setTimeout(() => {
      this.isSubmitting = false;
      this.submitMessage = 'Thank you! Your message has been sent.';
      this.contactForm.reset();
    }, 800);
  }

  private pretty(key: string): string {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase());
  }
}


