Vue.component('singlePage', {
    data(){
        return {
            product: {},
            // slidesFiles : [],
            currentSlideNumber : 0,
        }
    },
    methods: {
        goToSlide (n) {
            // this.slides[this.currentSlideNumber].className = 'slide';
            this.currentSlideNumber = (this.currentSlideNumber+n+this.product.imgL_arr.length)%this.product.imgL_arr.length;
            // this.slides[this.currentSlideNumber].className = 'slide showing';
        },
        getQueryParam (param) {
            let queries = window.location.search, regex, resRegex, results, response;
            // let regex, resRegex, results, response;
            param = encodeURIComponent(param);
            regex = new RegExp('[\\?&]' + param + '=([^&#]*)', 'g');
            resRegex = new RegExp('(.*)=([^&#]*)');
            results = queries.match(regex);

            if (!results) {
                return '';
            }
            response = results.map(function (result) {
                var parsed = resRegex.exec(result);

                if (!parsed) {
                    return '';
                }

                return parsed[2].match(/(^\d+$)/) ? Number(parsed[2]) : parsed[2];
            })

            return response.length > 1 ? response : response[0];
        }
    },
    mounted(){
        console.log(location.search);
        let id_product = this.getQueryParam('id_product');
        console.log(id_product);
        this.$root.getJson(`/api/products/${id_product}`)
            .then(data => {
                console.log(data);
                // this.product = JSON.parse(data);
                this.product = data;
                console.log(this.product.imgL_arr);
                // this.slidesFiles=data.imgL_arr;
                // for (let file of this.slidesFiles) {
                //     console.log(file);
                // }
            })
            .catch(error => console.log('error'));

    },
    template: `<main class="product">
                    <div class="product__slider">
                        <div class="product__slider-link-box product__slider-left-link" @click="goToSlide(-1)">
                            <i class="fas fa-angle-left"></i>
                        </div>
                        <div class="product__image__center">
                            <ul class="slides">
                                <!--контейнер для для слайдов-->
                                <li class="slide"
                                    v-for="(slide, index) of product.imgL_arr"
                                    :key="index"
                                    v-show="currentSlideNumber === index">
                                    <img :src="slide" alt="product__img" class="product__img">
                                </li>
                            </ul>
                        </div>
                        <div class="product__slider-link-box product__slider-right-link" @click="goToSlide(1)">
                            <i class="fas fa-angle-right"></i>
                        </div>
                    </div>
                    <div class="product__description container">
                        <div class="product__description-content">
                            <div class="product__collection-name">WOMEN COLLECTION</div>
                            <div class="product__collection-line-1"></div>
                            <div class="product__collection-line-2"></div>
                            <div class="product__product-name">{{product.name}}</div>
                            <div class="product-mini__stars stars" v-html="$root.getProductRatingHTML(product.rating)"></div>
                            <div class="product__product-text">Compellingly actualize fully researched processes before proactive
                                outsourcing. Progressively syndicate collaborative architectures before cutting-edge services.
                                Completely visualize parallel core competencies rather than exceptional portals.
                            </div>
                            <div class="product__product-details">
                                <p class="product__product-details-material">MATERIAL: <span>COTTON</span></p>
                                <p class="product__product-details-designer">DESIGNER: <span>BINBURHAN</span></p>
                            </div>
                            <div class="product__product-price">$561</div>
                            <div class="product__price-line"></div>
                            <div class="product__select-group">
                                <div class="product__select-color">
                                    <p class="product__input-title">CHOOSE COLOR</p>
                                    <select name="" id="" class="product__input product__input-color">
                                        <option value="red">Red</option>
                                    </select>
                                </div>
                                <div class="product__select-size">
                                    <p class="product__input-title">CHOOSE SIZE</p>
                                    <select name="" id="" class="product__input product__input-size">
                                        <option value="red">XXL</option>
                                    </select>
                                </div>
                                <div class="product__select-quantity">
                                    <p class="product__input-title">QUANTITY</p>
                                    <input type="text" class="product__input product__input-quantity" placeholder="2">
                                </div>
                            </div>
                            <a href="#" class="product__add-to-cart-button">
                                <div class="product__add-to-cart-img"></div>
                                <p>Add to Cart</p></a>
                        </div>
                    </div>
                </main>`
})