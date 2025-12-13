import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

 // Podaci za socijalne mreže
  drustveneMreze = [
    { platforma: 'Instagram', ikona: 'fab fa-instagram', link: 'https://instagram.com/agestopsrbija' },
    { platforma: 'TikTok', ikona: 'fab fa-tiktok', link: 'https://tiktok.com/@agestopsrbija' },
    { platforma: 'Facebook', ikona: 'fab fa-facebook-f', link: 'https://facebook.com/agestopsrbija' }
  ];

  // Linkovi za pomoc korisnicima
  pomocLinkovi = [
    { tekst: 'Status porudžbine', ruta: '/status-porudzbine' },
    { tekst: 'Troškovi isporuke', ruta: '/dostava' },
    { tekst: 'Vraćanje proizvoda', ruta: '/povracaj' }
  ];

  // Linkovi za kompaniju
  kompanijaLinkovi = [
    { tekst: 'Naša svrha', ruta: '/o-nama/svrha' },
    { tekst: 'Naše obećanje', ruta: '/o-nama/obecanje' }
  ];

  // Česta pitanja
  cestaPitanja = [
    { tekst: 'Isporuka i rokovi', ruta: '/faq/isporuka' },
    { tekst: 'Saveti za negu', ruta: '/faq/nega' }
  ];

  // Pravni linkovi
  pravniLinkovi = [
    { tekst: 'Uslovi i odredbe', ruta: '/uslovi' },
    { tekst: 'Politika privatnosti', ruta: '/privatnost' },
    { tekst: 'Reklamacije', ruta: '/reklamacije' }
  ];

  // Kontakt informacije
  kontaktInfo = {
    telefon: '+381612916995',
    email: 'info@agestop.rs',
    firma: 'AGE STOP d.o.o. Beograd',
    adresa: 'Takovska 7/8/17',
    maticniBroj: '21719714',
    pib: '112688593'
  };

  // Trenutna godina za copyright
  trenutnaGodina = new Date().getFullYear();

  // Metod za klik na socijalnu mrežu
  otvoriDrustvenuMrezu(link: string): void {
    window.open(link, '_blank');
  }
}
