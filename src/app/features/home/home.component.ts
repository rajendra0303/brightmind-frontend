import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroComponent } from '../../shared/components/hero/hero.component';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  services: Service[] = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Modern, responsive websites built with cutting-edge technologies',
      icon: '🌐',
      features: ['React/Angular', 'Responsive Design', 'SEO Optimized', 'Fast Loading']
    },
    {
      id: 2,
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications',
      icon: '📱',
      features: ['iOS & Android', 'Cross-platform', 'Native Performance', 'App Store Ready']
    },
    {
      id: 3,
      title: 'Consulting',
      description: 'Expert guidance for your digital transformation journey',
      icon: '💡',
      features: ['Strategy Planning', 'Technical Review', 'Best Practices', 'Team Training']
    }
  ];

  features: Feature[] = [
    {
      id: 1,
      title: 'Innovation First',
      description: 'We stay ahead of technology trends to deliver cutting-edge solutions',
      icon: '🚀'
    },
    {
      id: 2,
      title: 'Quality Assured',
      description: 'Rigorous testing and quality assurance processes ensure reliable products',
      icon: '✅'
    },
    {
      id: 3,
      title: '24/7 Support',
      description: 'Round-the-clock support to keep your business running smoothly',
      icon: '🛠️'
    },
    {
      id: 4,
      title: 'Scalable Solutions',
      description: 'Built to grow with your business needs and requirements',
      icon: '📈'
    }
  ];

  stats = [
    { number: '500+', label: 'Projects Completed' },
    { number: '50+', label: 'Happy Clients' },
    { number: '5+', label: 'Years Experience' },
    { number: '99%', label: 'Client Satisfaction' }
  ];

  ngOnInit(): void {
    // Component initialization
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}