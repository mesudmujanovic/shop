import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { Product, ProductService } from '../service/product.service';
import { CommonModule } from '@angular/common';
import { CartItem, CartService } from '../service/cart.service';
import { Router, RouterModule } from '@angular/router';
import { CategorySliderComponent } from '../category-slider/category-slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CategorySliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
 bestsellers: any[] = [];
  currentSlide = 0;
  isAnimating = false;
  slidesPerView = 3;
  maxSlides = 0;
  categories: any[] = [
    {
      image: '/categoryimg/eye-care-615395.webp',
      alt: 'Eye Care',
      title: 'Nega Očiju',
      description: 'Specjalizovani proizvodi za njegu osetljive kože oko očiju, redukciju bora i podmlađivanje.',
      url: '/categories/eye-care'
    },
    {
      image: '/categoryimg/serums-269049.webp',
      alt: 'Serums',
      title: 'Serumi',
      description: 'Koncentrovane formule sa aktivnim sastojcima za ciljano rešavanje specifičnih kožnih problema.',
      url: '/categories/serums'
    },
    {
      image: '/categoryimg/scrub-peeling-221741.webp',
      alt: 'Scrub & Peeling',
      title: 'Peeling',
      description: 'Proizvodi za dubinsko čišćenje, uklanjanje mrtvih ćelija i obnavljanje prirodnog sjaja kože.',
      url: '/categories/scrub-peeling'
    },
    {
      image: '/categoryimg/night-treatments-423459.webp',
      alt: 'Night Treatments',
      title: 'Noćna Nega',
      description: 'Intenzivni tretmani za regeneraciju kože tokom noći i buđenje sveže, odmorne kože.',
      url: '/categories/night-treatments'
    },
    {
      image: '/categoryimg/face-creams-165019.webp',
      alt: 'Face Creams',
      title: 'Kreme za Lice',
      description: 'Bogate hidratantne kreme za svakodnevnu zaštitu i negu svih tipova kože.',
      url: '/categories/face-creams'
    },
    {
      image: '/categoryimg/eye-care-615395.webp',
      alt: 'Premium Eye Care',
      title: 'Premium Nega',
      description: 'Ekskluzivna kolekcija sa najkvalitetnijim sastojcima za vrhunski tretman.',
      url: '/categories/premium'
    }
  ];
  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadBestsellers();
    this.calculateSlidesPerView();
  }


  @ViewChild('sliderContainer') sliderContainer!: ElementRef;
  
  // Touch/swipe variables
  touchStartX = 0;
  touchEndX = 0;
  isDragging = false;
  dragStartX = 0;
  dragCurrentX = 0;
  minSwipeDistance = 50; // Minimalna distanca za swipe
  
  // ... ostale varijable (bestsellers, currentSlide, itd.)
  
  // TOUCH HANDLERS
  onTouchStart(event: TouchEvent): void {
    if (window.innerWidth > 768) return; // Samo za mobile
    
    this.touchStartX = event.touches[0].clientX;
    this.isDragging = true;
    this.dragStartX = -this.currentSlide * 100; // Početna pozicija u %
    this.dragCurrentX = this.dragStartX;
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging || window.innerWidth > 768) return;
    
    event.preventDefault(); // Sprečavamo scroll dok vučemo slider
    
    const touchX = event.touches[0].clientX;
    const diff = this.touchStartX - touchX;
    
    // Računamo novu poziciju
    const slideWidth = 100; // 100% po slide-u
    this.dragCurrentX = this.dragStartX - (diff / window.innerWidth) * 100;
    
    // Ažuriramo transform u realnom vremenu
    const track = document.querySelector('.slider-track') as HTMLElement;
    if (track) {
      track.style.transition = 'none'; // Bez animacije dok vučemo
      track.style.transform = `translateX(${this.dragCurrentX}%)`;
    }
  }

  onTouchEnd(event: TouchEvent): void {
    if (!this.isDragging || window.innerWidth > 768) return;
    
    this.isDragging = false;
    this.touchEndX = event.changedTouches[0].clientX;
    
    const swipeDistance = this.touchStartX - this.touchEndX;
    const swipeThreshold = window.innerWidth * 0.1; // 10% širine ekrana
    
    // Resetujemo poziciju slidera
    const track = document.querySelector('.slider-track') as HTMLElement;
    if (track) {
      track.style.transition = 'transform 0.3s ease';
    }
    
    // Proveravamo da li je swipe dovoljno dug za promenu slajda
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0 && this.currentSlide < this.maxSlides) {
        // Swipe levo → next slide
        this.nextSlide();
      } else if (swipeDistance < 0 && this.currentSlide > 0) {
        // Swipe desno → prev slide
        this.prevSlide();
      } else {
        // Vrati se na trenutni slide
        this.goToSlide(this.currentSlide);
      }
    } else {
      // Swipe je prekratak, vrati se na trenutni slide
      this.goToSlide(this.currentSlide);
    }
  }

  // Mouse drag za desktop testing (opcionalno)
  onMouseDown(event: MouseEvent): void {
    if (window.innerWidth > 768) return;
    
    this.touchStartX = event.clientX;
    this.isDragging = true;
    this.dragStartX = -this.currentSlide * 100;
    this.dragCurrentX = this.dragStartX;
    
    // Dodaj event listenere za mouse move i up
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging || window.innerWidth > 768) return;
    
    const mouseX = event.clientX;
    const diff = this.touchStartX - mouseX;
    
    const slideWidth = 100;
    this.dragCurrentX = this.dragStartX - (diff / window.innerWidth) * 100;
    
    const track = document.querySelector('.slider-track') as HTMLElement;
    if (track) {
      track.style.transition = 'none';
      track.style.transform = `translateX(${this.dragCurrentX}%)`;
    }
  }

  onMouseUp(event: MouseEvent): void {
    if (!this.isDragging || window.innerWidth > 768) return;
    
    this.isDragging = false;
    this.touchEndX = event.clientX;
    
    const swipeDistance = this.touchStartX - this.touchEndX;
    const swipeThreshold = window.innerWidth * 0.1;
    
    const track = document.querySelector('.slider-track') as HTMLElement;
    if (track) {
      track.style.transition = 'transform 0.3s ease';
    }
    
    // Ukloni event listenere
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    document.removeEventListener('mouseup', this.onMouseUp.bind(this));
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0 && this.currentSlide < this.maxSlides) {
        this.nextSlide();
      } else if (swipeDistance < 0 && this.currentSlide > 0) {
        this.prevSlide();
      } else {
        this.goToSlide(this.currentSlide);
      }
    } else {
      this.goToSlide(this.currentSlide);
    }
  }


  loadBestsellers() {
    this.productService.getBestsellers().subscribe({
      next: (products) => {
        this.bestsellers = products;
        this.calculateMaxSlides();
        console.log('Bestsellers loaded:', this.bestsellers.length);
      },
      error: (error) => {
        console.error('Error loading bestsellers:', error);
      }
    });
  }

  getProductImage(product: any): string {
    if (product.images && product.images.length > 0) {
      const firstImage = product.images[0];
      return `data:${firstImage.imageType};base64,${firstImage.imageBase64}`;
    }
    return 'assets/images/default-product.jpg';
  }

  handleImageError(event: any) {
    event.target.src = 'assets/images/default-product.jpg';
  }

  getShortDescription(product: any): string {
    if (product.kljucnePrednosti) {
      const lines = product.kljucnePrednosti.split('\n');
      return lines[0] || product.kljucnePrednosti.substring(0, 100) + '...';
    }
    if (product.opis1) {
      return product.opis1.length > 120 
        ? product.opis1.substring(0, 120) + '...' 
        : product.opis1;
    }
    if (product.description) {
      return product.description.length > 120 
        ? product.description.substring(0, 120) + '...' 
        : product.description;
    }
    return 'Premium proizvod za negu kože';
  }

  // SLIDER CONTROLS
  calculateSlidesPerView() {
    const width = window.innerWidth;
    if (width < 576) {
      this.slidesPerView = 1;
    } else if (width < 992) {
      this.slidesPerView = 2;
    } else {
      this.slidesPerView = 3;
    }
    this.calculateMaxSlides();
  }

  calculateMaxSlides() {
    this.maxSlides = Math.max(0, Math.ceil(this.bestsellers.length / this.slidesPerView) - 1);
    // Reset current slide if out of bounds
    if (this.currentSlide > this.maxSlides) {
      this.currentSlide = this.maxSlides;
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.calculateSlidesPerView();
  }

  nextSlide() {
    if (this.isAnimating || this.currentSlide >= this.maxSlides) return;
    
    this.isAnimating = true;
    this.currentSlide++;
    
    setTimeout(() => {
      this.isAnimating = false;
    }, 500);
  }

  prevSlide() {
    if (this.isAnimating || this.currentSlide <= 0) return;
    
    this.isAnimating = true;
    this.currentSlide--;
    
    setTimeout(() => {
      this.isAnimating = false;
    }, 500);
  }

  goToSlide(index: number) {
    if (this.isAnimating || index < 0 || index > this.maxSlides) return;
    
    this.isAnimating = true;
    this.currentSlide = index;
    
    setTimeout(() => {
      this.isAnimating = false;
    }, 500);
  }

  getDotsArray(): number[] {
    const dotsCount = Math.ceil(this.bestsellers.length / this.slidesPerView);
    return Array(dotsCount).fill(0).map((_, i) => i);
  }

  private cartItems: CartItem[] = [];

  message = '';

  addToCart(product: Product): void {
    // Add loading state to button
    const button = event?.target as HTMLButtonElement;
    if (button) {
      button.classList.add('loading');
    }

    this.cartService.addToCart(product.id, 1).subscribe({
      next: (cart) => {
        this.message = `🎉 Dodat ${product.name} u korpu!`;
        this.cartService.refreshCartCount();``
        
        // Remove loading state
        if (button) {
          button.classList.remove('loading');
        }
        console.log("A")
        setTimeout(() => this.message = '', 3000);
      },
      error: (error) => {
        this.message = `❌ Greška pri dodavanju u korpu: ${error.error?.message || error.message}`;
        
        // Remove loading state
        if (button) {
          button.classList.remove('loading');
        }
      }
    });
  }

  
}
