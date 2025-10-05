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


chshop/
├── 📁 src/main/java/com/shop/
│   ├── 📁 config/                            # KONFIGURACIJE
│   │   ├── SecurityConfig.java              🛡️
│   │   ├── WebConfig.java                   🌐
│   │   ├── SwaggerConfig.java               📖
│   │   ├── CorsConfig.java                  🔄
│   │   └── DatabaseConfig.java              🗄️
│   │
│   ├── 📁 controller/                       # REST API CONTROLLERS
│   │   ├── AuthController.java              🔐
│   │   ├── UserController.java              👤
│   │   ├── ProductController.java           📦
│   │   ├── CategoryController.java          🗂️
│   │   ├── CartController.java              🛒
│   │   ├── OrderController.java             📋
│   │   ├── PaymentController.java           💳
│   │   ├── AdminController.java             👑
│   │   └── FileUploadController.java        📤
│   │
│   ├── 📁 service/                          # BUSINESS LOGIC
│   │   ├── 📁 impl/                         # IMPLEMENTACIJE
│   │   │   ├── UserServiceImpl.java         👤
│   │   │   ├── ProductServiceImpl.java      📦
│   │   │   ├── CategoryServiceImpl.java     🗂️
│   │   │   ├── CartServiceImpl.java         🛒
│   │   │   ├── OrderServiceImpl.java        📋
│   │   │   ├── PaymentServiceImpl.java      💳
│   │   │   └── EmailServiceImpl.java        📧
│   │   │
│   │   ├── UserService.java                 👤
│   │   ├── ProductService.java              📦
│   │   ├── CategoryService.java             🗂️
│   │   ├── CartService.java                 🛒
│   │   ├── OrderService.java                📋
│   │   ├── PaymentService.java              💳
│   │   └── EmailService.java                📧
│   │
│   ├── 📁 repository/                       # DATA ACCESS LAYER
│   │   ├── UserRepository.java              👤
│   │   ├── ProductRepository.java           📦
│   │   ├── CategoryRepository.java          🗂️
│   │   ├── CartRepository.java              🛒
│   │   ├── OrderRepository.java             📋
│   │   ├── OrderItemRepository.java         📝
│   │   ├── PaymentRepository.java           💳
│   │   └── AddressRepository.java           🏠
│   │
│   ├── 📁 model/                            # ENTITETI
│   │   ├── User.java                        👤
│   │   ├── Product.java                     📦
│   │   ├── Category.java                    🗂️
│   │   ├── Cart.java                        🛒
│   │   ├── CartItem.java                    🎴
│   │   ├── Order.java                       📋
│   │   ├── OrderItem.java                   📝
│   │   ├── Payment.java                     💳
│   │   ├── Address.java                     🏠
│   │   └── Role.java                        🎭
│   │
│   ├── 📁 dto/                              # DATA TRANSFER OBJECTS
│   │   ├── 📁 request/                      📥
│   │   │   ├── LoginRequest.java            🔐
│   │   │   ├── RegisterRequest.java         📝
│   │   │   ├── ProductRequest.java          📦
│   │   │   ├── OrderRequest.java            📋
│   │   │   └── PaymentRequest.java          💳
│   │   │
│   │   ├── 📁 response/                     📤
│   │   │   ├── AuthResponse.java            🔑
│   │   │   ├── UserResponse.java            👤
│   │   │   ├── ProductResponse.java         📦
│   │   │   ├── OrderResponse.java           📋
│   │   │   └── ApiResponse.java             📡
│   │   │
│   │   └── 📁 mapper/                       🔄
│   │       ├── UserMapper.java              👤
│   │       ├── ProductMapper.java           📦
│   │       └── OrderMapper.java             📋
│   │
│   ├── 📁 security/                         # SECURITY
│   │   ├── JwtUtil.java                     🔑
│   │   ├── JwtRequestFilter.java            🎯
│   │   ├── UserDetailsServiceImpl.java      👤
│   │   ├── AuthEntryPointJwt.java           ⚠️
│   │   └── WebSecurityConfig.java           🛡️
│   │
│   ├── 📁 exception/                        # EXCEPTION HANDLING
│   │   ├── GlobalExceptionHandler.java      🎪
│   │   ├── ResourceNotFoundException.java   ❌
│   │   ├── BadRequestException.java         ⚠️
│   │   └── CustomException.java             💥
│   │
│   └── ShopApplication.java                 🚀
│
├── 📁 src/main/resources/
│   ├── application.properties               ⚙️
│   ├── application-dev.properties           🛠️
│   ├── application-prod.properties          🚀
│   ├── 📁 static/                           🖼️
│   ├── 📁 templates/                        📧
│   └── data.sql                             🗄️
│
├── 📁 src/test/java/                        🧪
├── pom.xml                                  📦
└── 📁 target/                               🏗️
