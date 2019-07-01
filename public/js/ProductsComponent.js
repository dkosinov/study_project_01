Vue.component('products', {
    props: ['filterRange'],
    data(){
      return {
          // catalogUrl: `/catalogData.json`,
          products: [],
          filtered: [],
          // imgCatalog: `https://placehold.it/200x150`,
      }
    },
    methods: {
        // filter(value){
        //     let regexp = new RegExp(value, 'i');
        //     this.filtered = this.products.filter(el => regexp.test(el.product_name));
        // }
        setFilterRange(_filterRange, start=0){
            this.filtered = this.products.slice(start, _filterRange);
        }

    },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    // this.filtered.push(el);
                }
                this.setFilterRange(this.filterRange);
            });
    },
    template: `<span><product
                    v-for="product of filtered"
                    :key="product.id_product"
                    :product="product"></product></span>`

});

Vue.component('product', {
    props: ['product'],
    // methods: {
    //     getProductRatingHTML(rating) {
    //         let ratingHTML = '';
    //         const maxRating = 5;
    //         for (var j = 0; j < maxRating; j++) {
    //             if (j < rating) {
    //                 ratingHTML += '<div class="stars__star stars__star_active"><i class="fas fa-star"></i></div>\n'
    //                 //если пустые звёздочки должны отображатьса, то раскоментить
    //             } else {
    //                 ratingHTML += '<div class="stars__star"><i class="fas fa-star"></i></div>\n'
    //             }
    //         }
    //         return ratingHTML;
    //     },
    // },
    template: `<div class="product-mini">
                    <a class="product-mini__link" href="#">
                        <img class="product-mini__img" :src="product.imgM" :alt="'img'+product.name">
                    </a>
                    <div class="product-mini__text"><a class="product-mini__link" href="#">
                        {{product.name}}
                    </a>
                        <p class="product-mini__price"> $ {{product.price.toFixed(2)}} </p>
                        <div class="product-mini__stars stars" v-html="$root.getProductRatingHTML(product.rating)"></div>
                    </div>
                    <a href="#" class="add-to-cart-1 add-to-cart" @click="$root.$refs.cart.addProduct(product)">
                        <img class="add-to-cart__img" src="img/cart-2.svg" alt="cart">
                        Add to Cart
                    </a>
                </div>`
        // `<div class="product-item" >
        //     <img :src="img" :alt="product.product_name">
        //     <div class="desc">
        //         <h3>{{product.product_name}}</h3>
        //         <p>{{product.price}}</p>
        //         <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
        //     </div>
        // </div>`
});