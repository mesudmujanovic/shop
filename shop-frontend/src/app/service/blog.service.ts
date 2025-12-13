import { Injectable } from '@angular/core';
export interface Product {
  id: number;
  title: string;
  image: string;
  mainDescription: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  category: string;
  dateAdded?: Date;
}
@Injectable({
  providedIn: 'root'
})
export class BlogService {
 private products: Product[] = [
    {
      id: 1,
      title: 'AgeStop Switzerland aligns with 7 out of 10 global beauty trends in skincare 2025!',
      image: '/blog/IMG_1222.webp',
      mainDescription: 'AgeStop Switzerland aligns with 7 out of 10 global beauty trends in skincare 2025!',
      shortDescription: 'Peptides are booming in 2024, and as industry experts predict, demand will rise even more in 2025. As the fight against premature aging intensifies, beauty brands are evolving towards an...',
      fullDescription: `
        <p>Peptides are booming in 2024, and as industry experts predict, demand will rise even more in 2025. As the fight against premature aging intensifies, beauty brands are evolving towards an innovative, science-backed approach that delivers visible, lasting results.</p>
        <p>AgeStop Switzerland has positioned itself at the forefront of this movement, with formulations that directly address the growing consumer demand for effective, evidence-based skincare. Our research and development team in Switzerland has meticulously analyzed emerging trends and consumer preferences to create products that not only meet but exceed expectations.</p>
        <p>From DNA-repair technology to sustainable packaging, microbiome-friendly formulations to personalized skincare regimens, AgeStop Switzerland incorporates the most significant advancements in cosmetic science. Our commitment to Swiss precision ensures each product delivers optimal performance while maintaining the highest standards of quality and safety.</p>
        <p>The future of skincare is here, and it's rooted in biotechnology, transparency, and proven results. Join the movement and experience why AgeStop Switzerland is recognized as a leader in next-generation anti-aging solutions.</p>
      `,
      features: ['DNA Repair Technology', 'Sustainable Formulations', 'Science-Backed Results', 'Luxury Experience'],
      category: 'TRENDING'
    },
    {
      id: 2,
      title: 'Unlock Queen-Worthy Skin: Discover the Regenerative Power of Royal P5 Nectar',
      image: '/blog/IMG_2347.webp',
      mainDescription: 'Unlock Queen-Worthy Skin: Discover the Regenerative Power of Royal P5 Nectar',
      shortDescription: 'Did you know that a single protein has the power to 🔸 TRANSFORM AN ORDINARY HONEYBEE INTO A QUEEN 🔸 — dramatically extending her lifespan, enhancing vitality, and unlocking superior...',
      fullDescription: `
        <p>Did you know that a single protein has the power to TRANSFORM AN ORDINARY HONEYBEE INTO A QUEEN — dramatically extending her lifespan, enhancing vitality, and unlocking superior regenerative capabilities? This remarkable biological phenomenon has inspired our Swiss scientists to create Royal P5 Nectar, a breakthrough skincare innovation.</p>
        <p>Royal P5 Nectar harnesses the power of royalactin, the key protein responsible for the queen bee's extraordinary longevity and vitality. Through advanced biotechnology, we've developed a stabilized, bioactive form of this protein that delivers exceptional anti-aging benefits to human skin.</p>
        <p>Our proprietary formulation works at the cellular level to enhance skin's natural repair mechanisms, boost collagen production, and improve overall skin resilience. With regular use, Royal P5 Nectar helps reduce the appearance of fine lines and wrinkles, improves skin texture and elasticity, and imparts a radiant, youthful glow.</p>
        <p>Experience the regal transformation for yourself. This luxurious serum is more than just skincare—it's a testament to the power of nature-inspired science and Swiss precision engineering.</p>
      `,
      features: ['Royalactin Technology', 'Longevity Benefits', 'Regenerative Power', 'Luxurious Texture'],
      category: 'PREMIUM'
    },
    {
      id: 3,
      title: 'Peptide Multiplex DNA-active Concentrate',
      image: '/blog/IMG_2350.webp',
      mainDescription: 'Peptide Multiplex DNA-active Concentrate',
      shortDescription: '🌟 Why our clients Choose Peptide Multiplex 🌟 🟡 Market Differentiation: With DNA-repair skincare among the fastest-growing categories, Peptide Multiplex gives you a competitive advantage in tapping into this trend.🟡 Proven...',
      fullDescription: `
        <p>Introducing our groundbreaking Peptide Multiplex DNA-active Concentrate—a revolutionary formula designed to target skin aging at its source. This advanced concentrate combines multiple peptide complexes with DNA repair enzymes to address the visible signs of aging while helping to protect and repair cellular DNA from environmental damage.</p>
        <p>Why our clients choose Peptide Multiplex: With DNA-repair skincare among the fastest-growing categories, Peptide Multiplex gives you a competitive advantage in tapping into this trend. Our formula features proven, patent-protected ingredients that deliver measurable results backed by clinical studies.</p>
        <p>This powerful concentrate works synergistically to stimulate collagen production, reduce the appearance of wrinkles, improve skin firmness, and enhance overall skin texture. The lightweight yet potent formula absorbs quickly, making it suitable for all skin types and ideal for layering with your favorite skincare products.</p>
        <p>Experience the future of targeted anti-aging skincare with Peptide Multiplex—where cutting-edge science meets visible results.</p>
      `,
      features: ['Multi-Peptide Complex', 'DNA Repair Enzymes', 'Clinically Proven', 'Fast Absorption'],
      category: 'INNOVATION'
    },
    {
      id: 4,
      title: 'Introducing Our Swiss Phyto Cells Face Cream: A Luxurious Autumn-Winter Essential for Radiant Skin',
      image: '/blog/IMG_4806.webp',
      mainDescription: 'Introducing Our Swiss Phyto Cells Face Cream: A Luxurious Autumn-Winter Essential for Radiant Skin',
      shortDescription: 'As the crisp autumn breeze sets in, and the winter chill approaches, it\'s time to nourish and rejuvenate your skin with our luxurious Swiss Phyto Cells Face Cream. This rich...',
      fullDescription: `
        <p>As the seasons change and temperatures drop, your skin requires special attention to maintain its health and radiance. Our Swiss Phyto Cells Face Cream is specifically formulated to provide intense hydration and protection during the harsh autumn and winter months.</p>
        <p>This rich, nourishing cream combines Swiss alpine plant stem cells with a powerful blend of hydrating agents and protective antioxidants. The unique formulation creates a protective barrier that helps prevent moisture loss while shielding skin from environmental stressors like cold winds and dry indoor heating.</p>
        <p>Key benefits include: deep, long-lasting hydration; improved skin elasticity and firmness; reduced appearance of fine lines caused by dehydration; and a healthy, radiant complexion. The luxurious texture melts into skin, providing immediate comfort and a velvety-smooth finish that serves as the perfect canvas for makeup.</p>
        <p>Transform your winter skincare routine with this essential cream that nourishes, protects, and revitalizes your skin during the most challenging seasons.</p>
      `,
      features: ['Alpine Plant Stem Cells', 'Intense Hydration', 'Protective Barrier', 'Seasonal Essential'],
      category: 'SEASONAL'
    },
    {
      id: 5,
      title: 'Introducing our star product, the Royal P5 Nectar Concentrate Serum - a must-have for those seeking intense recovery, deep hydration, and transformative anti-aging benefits.',
      image: '/blog/IMG_5578.webp',
      mainDescription: 'Introducing our star product, the Royal P5 Nectar Concentrate Serum - a must-have for those seeking intense recovery, deep hydration, and transformative anti-aging benefits.',
      shortDescription: 'Crafted in Switzerland and packed with powerful ingredients, this serum is designed to deliver visible results and a luxurious skincare experience.**Benefits for Your Skin** - **Illuminating & Intense Recovery:** Rediscover...',
      fullDescription: `
        <p>Crafted in Switzerland with meticulous attention to detail, our Royal P5 Nectar Concentrate Serum represents the pinnacle of luxury anti-aging skincare. This potent serum is designed to deliver transformative results through its unique combination of bioactive royalactin, hyaluronic acid complexes, and Swiss alpine botanicals.</p>
        <p>Benefits for your skin: Experience illuminating radiance and intense recovery as the serum works to rejuvenate tired, stressed skin. The advanced formula penetrates deeply to provide lasting hydration, plumping the skin from within and reducing the appearance of fine lines and wrinkles.</p>
        <p>With regular use, you'll notice improved skin elasticity, a more even skin tone, and a youthful glow that emanates from within. The lightweight, fast-absorbing texture makes it suitable for both morning and evening use, and it layers beautifully with other skincare products.</p>
        <p>Join thousands of satisfied customers who have made Royal P5 Nectar Concentrate Serum the cornerstone of their skincare regimen. Discover why this serum has earned its reputation as our star product.</p>
      `,
      features: ['Bioactive Royalactin', 'Hyaluronic Acid Complex', 'Swiss Alpine Botanicals', 'Transformative Results'],
      category: 'BESTSELLER'
    },
    {
      id: 6,
      title: 'Revitalize Your Skin Overnight with Our Swiss Oxygen Therapy Sleeping Mask',
      image: '/blog/IMG_5579.webp',
      mainDescription: 'Revitalize Your Skin Overnight with Our Swiss Oxygen Therapy Sleeping Mask',
      shortDescription: 'In a world that places a premium on looking youthful and vibrant, the eyes are a focal point of beauty and attraction. Enhancing their natural beauty is not just about...',
      fullDescription: `
        <p>Maximize your skin's natural repair cycle with our Swiss Oxygen Therapy Sleeping Mask. This innovative overnight treatment works while you sleep, delivering potent oxygenating ingredients that help repair daily damage, boost hydration, and restore your skin's natural vitality.</p>
        <p>The formula features our proprietary Oxygen-Release Technology, which gradually releases active oxygen molecules throughout the night. This process helps stimulate cellular renewal, improve circulation, and enhance the skin's ability to absorb beneficial nutrients.</p>
        <p>Wake up to visibly rejuvenated skin that feels refreshed, plump, and radiant. Fine lines appear diminished, skin texture is smoother, and overall complexion looks more even and luminous. The lightweight gel-cream texture absorbs quickly without leaving a sticky residue, ensuring a comfortable night's sleep.</p>
        <p>Make overnight recovery a part of your skincare ritual and let this advanced sleeping mask transform your skin while you rest. It's the ultimate self-care treat for your skin.</p>
      `,
      features: ['Oxygen-Release Technology', 'Overnight Recovery', 'Cellular Renewal', 'Lightweight Texture'],
      category: 'OVERNIGHT'
    },
    {
      id: 7,
      title: 'Eyes That Sparkle: The Role of Eye Creams in Enhancing Your Natural Beauty',
      image: '/blog/IMG_5580.webp',
      mainDescription: 'Eyes That Sparkle: The Role of Eye Creams in Enhancing Your Natural Beauty',
      shortDescription: 'In a world that places a premium on looking youthful and vibrant, the eyes are a focal point of beauty and attraction. Enhancing their natural beauty is not just about...',
      fullDescription: `
        <p>In a world that places a premium on looking youthful and vibrant, the eyes are a focal point of beauty and attraction. Enhancing their natural beauty is not just about makeup—it's about nurturing the delicate skin around your eyes with targeted care.</p>
        <p>Our advanced eye cream is specifically formulated to address the unique concerns of the eye area, which is thinner and more delicate than the rest of your facial skin. The formula combines potent peptides, caffeine, and light-reflecting particles to reduce the appearance of dark circles, puffiness, and fine lines.</p>
        <p>Key benefits include: diminished appearance of crow's feet and expression lines; reduced puffiness and dark circles; improved skin firmness and elasticity; and an immediate brightening effect that makes eyes appear more awake and youthful.</p>
        <p>Incorporate this essential step into your daily skincare routine to protect and enhance the delicate eye area. With consistent use, you'll notice a visible transformation that brings out the natural sparkle in your eyes.</p>
      `,
      features: ['Targeted Eye Care', 'Dark Circle Reduction', 'Puffiness Relief', 'Immediate Brightening'],
      category: 'EYE CARE'
    }
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }
}
