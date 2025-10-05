shop-frontend/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 core/                           # OSNOVNI SERVISI
│   │   │   ├── 📁 auth/
│   │   │   │   ├── auth.service.ts           🔐
│   │   │   │   ├── auth.guard.ts             🛡️
│   │   │   │   └── admin.guard.ts            👑
│   │   │   ├── 📁 interceptors/
│   │   │   │   ├── jwt.interceptor.ts        🔑
│   │   │   │   └── error.interceptor.ts      ⚠️
│   │   │   └── 📁 services/
│   │   │       ├── api.service.ts            🌐
│   │   │       └── storage.service.ts        💾
│   │   │
│   │   ├── 📁 shared/                         # DELJENE KOMPONENTE
│   │   │   ├── 📁 components/
│   │   │   │   ├── header/                   🏠
│   │   │   │   ├── footer/                   📄
│   │   │   │   ├── loading-spinner/          ⏳
│   │   │   │   ├── product-card/             🎴
│   │   │   │   └── search-bar/               🔍
│   │   │   ├── 📁 models/                     📊
│   │   │   │   ├── user.model.ts             👤
│   │   │   │   ├── product.model.ts          📦
│   │   │   │   ├── category.model.ts         🗂️
│   │   │   │   ├── cart.model.ts             🛒
│   │   │   │   └── order.model.ts            📋
│   │   │   ├── 📁 pipes/
│   │   │   │   ├── price.pipe.ts             💰
│   │   │   │   └── safe-url.pipe.ts          🔗
│   │   │   └── 📁 directives/
│   │   │       └── click-outside.directive.ts🎯
│   │   │
│   │   ├── 📁 modules/                        # FUNKCIONALNI MODULI
│   │   │   ├── 📁 auth/                       🔐
│   │   │   │   ├── login/                     👤
│   │   │   │   ├── register/                  📝
│   │   │   │   └── profile/                   👨‍💼
│   │   │   │
│   │   │   ├── 📁 admin/                      👑
│   │   │   │   ├── dashboard/                 📊
│   │   │   │   ├── products/                  📦
│   │   │   │   ├── categories/                🗂️
│   │   │   │   ├── orders/                    📋
│   │   │   │   └── users/                     👥
│   │   │   │
│   │   │   ├── 📁 products/                   🛍️
│   │   │   │   ├── product-list/              📃
│   │   │   │   ├── product-details/           🔍
│   │   │   │   ├── category-list/             🏷️
│   │   │   │   └── search/                    🔎
│   │   │   │
│   │   │   ├── 📁 cart/                       🛒
│   │   │   │   ├── cart-view/                 👀
│   │   │   │   ├── cart-summary/              📝
│   │   │   │   └── wishlist/                  ❤️
│   │   │   │
│   │   │   ├── 📁 checkout/                   💳
│   │   │   │   ├── checkout/                  🧾
│   │   │   │   ├── payment/                   🏦
│   │   │   │   └── order-confirmation/        ✅
│   │   │   │
│   │   │   └── 📁 orders/                     📦
│   │   │       ├── order-list/                📄
│   │   │       └── order-details/             🔍
│   │   │
│   │   ├── app-routing.module.ts              🗺️  
│   │   ├── app.component.ts                   🎪
│   │   └── app.module.ts                      📦
│   │
│   ├── 📁 assets/
│   │   ├── 📁 images/
│   │   │   ├── 📁 products/                   🖼️
│   │   │   ├── 📁 icons/                      🎨
│   │   │   └── logo.png                       🏪
│   │   └── 📁 styles/                         🎨
│   │
│   ├── index.html                             🏠
│   └── styles.css                             🎨
├── angular.json                               ⚙️
├── package.json                               📦
└── tsconfig.json                              ⚙️
