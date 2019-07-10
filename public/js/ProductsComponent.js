Vue.component('products', {
    props: ['filterRange','catalogType'],
    data(){
      return {
          products: [],
          filtered: [],
          productsViewInContainer: [],
          lowPrice: 0,
          highPrice: 100,
          // imgCatalog: `https://placehold.it/200x150`,
      }
    },

    methods: {
        // filter(value){
        //     let regexp = new RegExp(value, 'i');
        //     this.filtered = this.products.filter(el => regexp.test(el.product_name));
        // }
        //Устанавливаем диапазон товаров для выдачи в каталог По умолчанию выдаём все
        getPriceRange () {
            let $multirange = document.querySelector('.original');
            this.lowPrice = $multirange.valueLow;
            this.highPrice = $multirange.valueHigh;
            // console.log($multirange.value);
            // console.log($multirange.valueLow);
            // console.log($multirange.valueHigh);
        },
        setCatalogViewFilters (poductsNumberToView) {
            // Ограничиваем количество отображаемых товаров
            this.filtered = this.getProductsRange(poductsNumberToView);
            //добавляем на странице фильтр по цене и устанавливаем максимальное и минимальное значения передваемого диапазона товаров
            this.createPriceRangeFilter(this.products);
        },
        createPriceRangeFilter (products){
            // находим минимльное и максимальное значение цен товаров каталога products
            let minPrice = products[0].price;
            let maxPrice = 0;
            for(let el of products){
                if (el.price < minPrice){
                    minPrice = el.price;
                }
                if (el.price > maxPrice){
                    maxPrice = el.price;
                }
            }
            let $priceRangeContainer = document.getElementById('price-range-container');
            let $priceRangeInput = document.createElement("input");
            let multiple = document.createAttribute("multiple");
            $priceRangeInput.setAttributeNode(multiple);
            $priceRangeInput.type = "range";

            $priceRangeInput.min = minPrice;
            $priceRangeInput.max = maxPrice;

            let multiValue = document.createAttribute("value");
            multiValue.value = minPrice+","+maxPrice;
            // multiValue.value = "25,75";
            $priceRangeInput.setAttributeNode(multiValue);

            // $priceRangeContainer.insertBefore($priceRangeInput, $priceRangeContainer.firstChild);
            $priceRangeContainer.appendChild($priceRangeInput);

            //передаём управление фильтром по цене внешнему модулю
            const priceFilter = multirange($priceRangeInput);

            this.lowPrice = minPrice;
            this.highPrice = maxPrice;
        },
        getProductsRange(_filterRange=this.products.length, start=0){
            return this.products.slice(start, _filterRange);
        },
        viewAllProductsInContainer(){
            this.filtered = this.getProductsRange();
        }
    },
    // computed: {
    //     minPrice: function () {
    //         return this.priceRange;
    //     }
    // },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    // this.filtered.push(el);
                }
                this.setCatalogViewFilters(this.filterRange);
            });
    },
    template: `<span>
                    <!--отображаем первый вариант отрисовки каталога-->
                    <span v-if="catalogType === 1">
                        <section class="container fetured-items">
                            <div class="fetured-items__head">
                                <p class="fetured-items__head-text-1">Fetured Items</p>
                                <p class="fetured-items__head-text-2">Shop for items based on what we featured in this week</p>
                            </div>
                            <div class="fetured-items__content">
                                 <product
                                     v-for="product of filtered"
                                     :key="product.id_product"
                                     :product="product"
                                     :product-type=1></product>    
                                     <a href="catalog.html" class="fetured-items__button-browse-all"> Browse All Product &rarr;</a>
                            </div>
                        </section>
                    </span>
                    
                    <!--отображаем второй вариант отрисовки каталога-->
                    <span v-if="catalogType === 2">
                        <main class="container catalog">
                            <nav class="catalog__spoiler-nav spoiler-nav">
                                <details class="spoiler-nav__box">
                                    <summary class="spoiler-nav__title">
                                        <p>Category</p>
                                    </summary>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Accessories</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Bags</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Denim</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Hoodies & Sweatshirts</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Jackets & Coats</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Pants</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Polos</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Shirts</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Shoes</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Shorts</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Sweaters & Knits</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">T-Shirts</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Tanks</a></p>
                                </details>
                                <details class="spoiler-nav__box">
                                    <summary class="spoiler-nav__title">
                                        <p>BRAND</p>
                                    </summary>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Accessories</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Bags</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Denim</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Hoodies & Sweatshirts</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Jackets & Coats</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Pants</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Polos</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Shirts</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Shoes</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Shorts</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Sweaters & Knits</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">T-Shirts</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Tanks</a></p>
                                </details>
                                <details class="spoiler-nav__box">
                                    <summary class="spoiler-nav__title">
                                        <p>DESIGNER</p>
                                    </summary>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Accessories</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Bags</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Denim</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Hoodies & Sweatshirts</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Jackets & Coats</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Pants</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Polos</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Shirts</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Shoes</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Shorts</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Sweaters & Knits</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">T-Shirts</a></p>
                                    <p class="spoiler-nav__item"><a href="#" class="spoiler-nav__link">Tanks</a></p>
                                </details>
                            </nav>
                            <div class="catalog__container">
                                <div class="catalog__filter">
                                    <div class="catalog__filter-box">
                                        <div class="catalog__filter-title">Trending now</div>
                                        <div class="catalog__filter-group-links">
                                            <a href="#" class="catalog__filter-link">Bohemian</a>
                                            <a href="#" class="catalog__filter-link catalog__filter-link_center">Floral</a>
                                            <a href="#" class="catalog__filter-link">Lace</a><br>
                                            <a href="#" class="catalog__filter-link">Floral</a>
                                            <a href="#" class="catalog__filter-link catalog__filter-link_center">Lace</a>
                                            <a href="#" class="catalog__filter-link">Bohemian</a>
                    
                                        </div>
                                    </div>
                                    <div class="catalog__filter-box">
                                        <div class="catalog__filter-title">Size</div>
                                        <div class="catalog__filter-group-check-box">
                                        <span class="catalog__filter-group-check-box-item"><input
                                                class="catalog__filter-group-check-box-input" type="checkbox" name="" id="XXS"><label
                                                for="XXS" class="catalog__filter-group-check-box-label">XXS</label></span>
                                            <span class="catalog__filter-group-check-box-item"><input
                                                    class="catalog__filter-group-check-box-input" type="checkbox" name="" id="XS"><label
                                                    for="XS" class="catalog__filter-group-check-box-label">XS</label></span>
                                            <span class="catalog__filter-group-check-box-item"><input
                                                    class="catalog__filter-group-check-box-input" type="checkbox" name="" id="S"><label for="S"
                                                                                                                                        class="catalog__filter-group-check-box-label">S</label></span>
                                            <span class="catalog__filter-group-check-box-item"><input
                                                    class="catalog__filter-group-check-box-input" type="checkbox" name="" id="M"><label for="M"
                                                                                                                                        class="catalog__filter-group-check-box-label">M</label></span>
                                            <span class="catalog__filter-group-check-box-item"><input
                                                    class="catalog__filter-group-check-box-input" type="checkbox" name="" id="L"><label for="L"
                                                                                                                                        class="catalog__filter-group-check-box-label">L</label></span>
                                            <span class="catalog__filter-group-check-box-item"><input
                                                    class="catalog__filter-group-check-box-input" type="checkbox" name="" id="XL"><label
                                                    for="XL" class="catalog__filter-group-check-box-label">XL</label></span>
                                            <span class="catalog__filter-group-check-box-item"><input
                                                    class="catalog__filter-group-check-box-input" type="checkbox" name="" id="XXL"><label
                                                    for="XXL" class="catalog__filter-group-check-box-label">XXL</label></span>
                                        </div>
                                    </div>
                                    <div class="catalog__filter-box">
                                        <div class="catalog__filter-title">PRICE</div>
                                        <div class="price-filter" @click="getPriceRange()">
                                            <div id="price-range-container" class="price-filter__input">
                                                <!--сюда монтируется input multirange -->
                                            </div>
                                            <div class="price-filter__lables-group">
                                                <div class="price-filter__lable">{{lowPrice}}</div>
                                                <div class="price-filter__lable">{{highPrice}}</div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="catalog__view">
                                    <span class="catalog__view-select-box">
                                        <span class="catalog__view-select-caption">Sort By</span>
                                        <select name="" id="" class="catalog__view-select" caption>
                                            <option value="" name="">Name</option>
                                        </select>
                                    </span>
                                    <span class="catalog__view-select-box">
                                            <span class="catalog__view-select-caption">Show</span>
                                            <select name="" id="" class="catalog__view-select" caption>
                                                <option value="" name="">09</option>
                                            </select>
                                        </span>
                                </div>
                                  <div class="catalog__content">
                                      <product
                                         v-for="product of filtered"
                                         :key="product.id_product"
                                         :product="product"
                                         :product-type=2></product>
                                  </div>
                                <div class="catalog__bottom">
                                    <div class="catalog__pagination">
                                        <a href="#" class="catalog__pagination-link" @click.prevent>
                                            <i class="fas fa-angle-left"></i>
                                        </a>
                                        <a href="#" class="catalog__pagination-link" @click.prevent>
                                            <p class="_pink-text">1</p>
                                        </a>
                                        <a href="#" class="catalog__pagination-link" @click.prevent>2</a>
                                        <a href="#" class="catalog__pagination-link" @click.prevent>3</a>
                                        <a href="#" class="catalog__pagination-link" @click.prevent>4</a>
                                        <a href="#" class="catalog__pagination-link" @click.prevent>5</a>
                                        <div class="_flex-box">                                        
                                            <a href="#" class="catalog__pagination-link" @click.prevent>6</a>
                                            <p>.....</p>
                                            <a href="#" class="catalog__pagination-link" @click.prevent>20</a>
                                        </div>
                                        <a href="#" class="catalog__pagination-link _pink-text" @click.prevent>
                                            <i class="fas fa-angle-right _pink-text"></i>
                                        </a>
                                    </div>
                                    <button class="catalog__button-view-all"
                                            @click="viewAllProductsInContainer()">
                                            View All
                                    </button>                                
                                </div>
                            </div>
                        </main>
                    </span>
                    
                    <!--отображаем третий вариант отрисовки каталога-->
                    <span v-if="catalogType === 3">
                        <div class="also-like container">
                            <p class="also-like__head">you may like also</p>
                            <div class="also-like__products">

                              <product
                                 v-for="product of filtered"
                                 :key="product.id_product"
                                 :product="product"
                                 :product-type=1></product>                   
                            </div>
                        </div>

                    </span>
               </span>`
});

Vue.component('product', {
    props: ['product', 'productType'],

    template: `<div class="product-mini">
                    <a class="product-mini__link" :href="'single_page.html?id_product='+product.id_product">
                        <img class="product-mini__img" :src="product.imgM" :alt="'img'+product.name">
                    </a>
                    <div class="product-mini__text">
                        <a class="product-mini__link" :href="'single_page.html?id_product='+product.id_product">
                            {{product.name}}
                        </a>
                        <p class="product-mini__price">
                            $ {{product.price.toFixed(2)}}
                        </p>
                        <div class="product-mini__stars stars" v-html="$root.getProductRatingHTML(product.rating)"></div>
                    </div>
                    
                    <!--отображаем первый вариант отрисовки кнопок товара-->
                    <span v-if="productType === 1">
                        <button class="add-to-cart" @click="$root.$refs.pageHeader.$refs.cart.addOneProduct(product)">
                            <img class="add-to-cart__img" src="img/cart-2.svg" alt="cart">
                            Add to Cart
                        </button>
                    </span>
                    
                    <!--отображаем второй вариант отрисовки кнопок товара-->
                    <span v-if="productType === 2">
                        <div class="add-to-cart add-to-cart_mod-3">
                            <button class="add-to-cart_mod-3__button add-to-cart_mod-3__button_big" @click="$root.$refs.pageHeader.$refs.cart.addOneProduct(product)"><img
                                    class="add-to-cart_mod-3__img" src="img/cart-2.svg" alt="catr">Add to Cart</button>
                            <button class="add-to-cart_mod-3__button"><img class="add-to-cart_mod-3__img"
                                                                               src="img/recicle.svg" alt="recicle"></button>
                            <button class="add-to-cart_mod-3__button"><img class="add-to-cart_mod-3__img" src="img/hard.svg"
                                                                               alt="hard"></button>
                        </div>
                    </span>
                </div>`
});