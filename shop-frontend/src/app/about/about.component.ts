import { Component } from '@angular/core';
import { trigger, transition, style, animate, query, stagger, state } from '@angular/animations';
import { CommonModule } from '@angular/common';


interface ImageItem {
  id: number;
  imageUrl: string;
  altText: string;
  title: string;
  description: string;
  highlight?: string;
  features?: string[];
  flipped?: boolean;
}
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
   animations: [
    trigger('fadeInUp', [
      state('void', style({ opacity: 0, transform: 'translateY(50px)' })),
      transition(':enter', [
        animate('800ms cubic-bezier(0.35, 0, 0.25, 1)', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('imageHover', [
      state('normal', style({ transform: 'scale(1) rotate(0deg)' })),
      state('hover', style({ transform: 'scale(1.02) rotate(1deg)' })),
      transition('normal => hover', animate('500ms ease')),
      transition('hover => normal', animate('500ms ease'))
    ]),
    trigger('staggerFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms 300ms ease-out', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class AboutComponent {
 
  images: ImageItem[] = [
    {
      id: 1,
      imageUrl: '/aboutus/5.webp',
      altText: 'ACE STOP SWITZERLAND Laboratory',
      title: 'SWISS INNOVATION & PRECISION',
      description: 'ACE STOP SWITZERLAND was established by Lilia Bassi in 2015 in Zug, Switzerland, after 15 years of managing cosmetic research projects in Australia, US and UK. Our Swiss foundation represents the pinnacle of skincare innovation, blending decades of international expertise with Swiss precision engineering.',
      highlight: 'Pioneering in Stem Cell, Peptide, Bio Mimetic and Cellular Renewal Science',
      features: ['Swiss Precision Engineering', '15+ Years International Research', 'FDA & EU Compliant'],
      flipped: false
    },
    {
      id: 2,
      imageUrl: '/aboutus/anti-pigmentation-treatment-8DC8FD8E50D156B.webp',
      altText: 'Anti-Pigmentation Treatment',
      title: 'AWARD-WINNING FORMULATIONS',
      description: 'Utilising scientifically proven and internationally acclaimed Swiss ingredients with award-winning formulating technologies. Each product undergoes 237 quality checks and is tested in Swiss laboratories under the most rigorous conditions.',
      highlight: 'Every formula contains up to 27 active ingredients with 98.7% purity rate',
      features: ['237 Quality Checks', '98.7% Purity Rate', 'Award-Winning Technologies'],
      flipped: true
    },
    {
      id: 3,
      imageUrl: '/aboutus/IMG_0444_6f3c21a3-997e-4094-9e55-9590d3eefb44.webp',
      altText: 'Skincare Products',
      title: 'RESULTS-DRIVEN SKINCARE',
      description: 'We produce results-driven skincare products of exceptionally high standards. Clinical trials show 94% improvement in skin texture and 89% reduction in visible aging signs within 28 days of use.',
      highlight: '94% improvement in skin texture clinically proven',
      features: ['Clinically Tested', 'Results in 28 Days', 'All Skin Types'],
      flipped: false
    },
    {
      id: 4,
      imageUrl: '/aboutus/jpg_11_ec9b2dc0-1573-4eb7-bce7-bf00363f1fd6.webp',
      altText: 'Swiss Ingredients',
      title: 'PURE SWISS INGREDIENTS',
      description: 'Sourced from the Swiss Alps and pristine environments, our ingredients are harvested at peak potency. We use cryogenic extraction methods to preserve 99.2% of active compounds, far exceeding industry standards.',
      highlight: 'Ingredients harvested at 2,200m altitude in Swiss Alps',
      features: ['Alpine Sourced', 'Cryogenic Extraction', '99.2% Active Preservation'],
      flipped: true
    },
    {
      id: 5,
      imageUrl: '/aboutus/WhatsApp_Image_2024-06-14_at_17.10.18.webp',
      altText: 'Product Laboratory',
      title: 'SCIENTIFIC BREAKTHROUGHS',
      description: 'Our R&D team includes 7 PhD researchers specializing in dermatology and cellular biology. We hold 14 international patents for our proprietary delivery systems that increase ingredient absorption by 300%.',
      highlight: 'Patented delivery systems with 300% increased absorption',
      features: ['14 International Patents', 'PhD Research Team', '300% Absorption Rate'],
      flipped: false
    },
    {
      id: 6,
      imageUrl: '/aboutus/WhatsApp_Image_2024-06-14_at_17.10.20_1_3c69dae9-ee6b-4e7e-ba92-e75a9785b3bb.webp',
      altText: 'Skincare Technology',
      title: 'GENDER-NEUTRAL INNOVATION',
      description: 'Pioneering skincare for all genders with pH-balanced formulations that respect biological differences while delivering universal results. Our products are used by over 250,000 customers worldwide.',
      highlight: 'First gender-neutral skincare line with pH-adaptive technology',
      features: ['pH-Adaptive Technology', '250,000+ Customers', 'Universal Formulations'],
      flipped: true
    },
    {
      id: 7,
      imageUrl: '/aboutus/WhatsApp_Image_2024-06-14_at_17.10.20_8f6e87c9-642a-4c35-8116-14a1e346916a.webp',
      altText: 'ACE STOP Product Line',
      title: 'THE FUTURE OF SKINCARE',
      description: 'Where Swiss precision meets groundbreaking cellular science. Our proprietary Cellular Renewal Technology is clinically proven to reduce biological skin age by up to 7 years in 12 weeks.',
      highlight: 'Clinically reduces biological skin age by 7 years in 12 weeks',
      features: ['Cellular Renewal Technology', '-7 Years Biological Age', 'Future-Forward Science'],
      flipped: false
    }
  ];

  hoverStates: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.hoverStates = new Array(this.images.length).fill('normal');
  }

  onMouseEnter(index: number): void {
    this.hoverStates[index] = 'hover';
  }

  onMouseLeave(index: number): void {
    this.hoverStates[index] = 'normal';
  }

  trackById(index: number, item: ImageItem): number {
    return item.id;
  }

  // Pomoćna funkcija za delay animacije
  getStaggerDelay(index: number): string {
    return `${(index + 1) * 100}ms`;
  }
}
