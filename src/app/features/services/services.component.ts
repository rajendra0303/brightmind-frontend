import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface ServiceDetail {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  pricing: {
    basic: number;
    premium: number;
    enterprise: string;
  };
  process: string[];
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  services: ServiceDetail[] = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Create stunning, responsive websites that deliver exceptional user experiences',
      icon: '🌐',
      features: [
        'Modern React/Angular Applications',
        'Responsive Design for All Devices',
        'SEO Optimization',
        'Performance Optimization',
        'Content Management Systems',
        'E-commerce Solutions'
      ],
      pricing: {
        basic: 2500,
        premium: 5000,
        enterprise: 'Custom'
      },
      process: [
        'Discovery & Planning',
        'Design & Prototyping',
        'Development & Testing',
        'Deployment & Launch',
        'Maintenance & Support'
      ]
    },
    {
      id: 2,
      title: 'Mobile App Development',
      description: 'Build native and cross-platform mobile applications for iOS and Android',
      icon: '📱',
      features: [
        'Native iOS & Android Apps',
        'Cross-platform Solutions',
        'UI/UX Design',
        'App Store Optimization',
        'Push Notifications',
        'Offline Functionality'
      ],
      pricing: {
        basic: 5000,
        premium: 10000,
        enterprise: 'Custom'
      },
      process: [
        'Requirements Analysis',
        'UI/UX Design',
        'Development & Testing',
        'App Store Submission',
        'Post-launch Support'
      ]
    },
    {
      id: 3,
      title: 'Consulting Services',
      description: 'Expert guidance for your digital transformation and technology strategy',
      icon: '💡',
      features: [
        'Technology Strategy',
        'Architecture Review',
        'Performance Optimization',
        'Security Assessment',
        'Team Training',
        'Best Practices Implementation'
      ],
      pricing: {
        basic: 150,
        premium: 250,
        enterprise: 'Custom'
      },
      process: [
        'Initial Assessment',
        'Strategy Development',
        'Implementation Planning',
        'Execution Support',
        'Review & Optimization'
      ]
    }
  ];

  selectedService: ServiceDetail | null = null;

  ngOnInit(): void {
    // Component initialization
  }

  selectService(service: ServiceDetail): void {
    this.selectedService = service;
  }

  closeModal(): void {
    this.selectedService = null;
  }

  scrollToContact(): void {
    const element = document.getElementById('contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getStepDescription(step: string): string {
    const descriptions: { [key: string]: string } = {
      'Discovery': 'We understand your requirements and goals',
      'Design': 'We create wireframes and visual designs',
      'Development': 'We build your solution with clean code',
      'Testing': 'We ensure quality through rigorous testing',
      'Launch': 'We deploy and monitor your application'
    };
    return descriptions[step] || 'Step description';
  }
}