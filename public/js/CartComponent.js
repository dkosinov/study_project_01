Vue.component('cart', {
    data(){
      return {
          // cartUrl: `/getBasket.json`,
          cartItems: [],
          showCart: false,
          // imgCart: `https://placehold.it/50x100`
      }
    },
    methods: {
        addProduct(product){
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result){
                            find.quantity++
                        }
                    })
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result){
                            this.cartItems.push(prod);
                        }
                    })
            }

        },
        remove(product){
            //
        },
        getCartTotalSum () {
            let totalSum = 0;
            for (var i = 0; i < this.cartItems.length; i++) {
                totalSum += this.cartItems[i].price * this.cartItems[i].quantity;
            }
            return totalSum;
        },
    },
    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
            });
    },
    template: `<div>
                    <button class="header__button-link" type="button" @click="showCart = !showCart">My Account</button>
                    <div class="header__drop-cart drop-cart" v-show="showCart">
                        <p v-if="!cartItems.length">Cart is empty</p>
                        <cart-item 
                            v-for="item of cartItems" 
                            :key="item.id_product"
                            :cart-item="item">
<!--                            @remove="remove">-->
                            </cart-item>
                        <div class="drop-cart__total">
                            <p class="drop-cart__total-caption">TOTAL</p>
                            <p class="drop-cart__total-summ">$ {{getCartTotalSum()}}</p>
                        </div>
                        <a href="#" class="drop-cart__button">Checkout</a>
                        <a href="shopping_cart.html" class="drop-cart__button">Go to cart</a>
                    </div>
                </div>`
});

Vue.component('cart-item', {
    props: ['cartItem'],
    methods: {
        getProductRatingHTML(rating) {
            let ratingHTML = '';
            const maxRating = 5;
            for (var j = 0; j < maxRating; j++) {
                if (j < rating) {
                    ratingHTML += '<div class="stars__star stars__star_active"><i class="fas fa-star"></i></div>\n'
                    //если пустые звёздочки должны отображатьса, то раскоментить
                    } else {
                        ratingHTML += '<div class="stars__star"><i class="fas fa-star"></i></div>\n'
                }
            }
            return ratingHTML;
        },
        getItemTotalSum(){
            //вернём стоимость всех единиц данного товара
            return this.cartItem.price * this.cartItem.quantity;
        },
    },
    template: `<div class="drop-cart__item">
                    <div class="cart__product">
                        <a href="single_page.html" class="drop-cart__product-img-link">
                            <img :src="cartItem.imgS" alt="cartItem.name" class="drop-cart__product-img cart__product-img">
                        </a>
                        <div class="cart__product-text">
                            <div class="cart__product-name">Rebox Zane</div>
                            <div class="drop-cart__product-stars cart__product-stars stars"
                                v-html="getProductRatingHTML(cartItem.rating)">
                            </div>
                            <div class="drop-cart__product-quantity-price">
                                {{cartItem.quantity}}
                                <span class="cart__product-quantity-price_x"> x </span>
                                $ {{cartItem.price.toFixed(2)}}
                            </div>
                        </div>
                    </div>
                    <div class="cart__product-action">
                        <a href="#" class="cart__product-action-link">
                            <i class="fas fa-times-circle"></i>
                        </a>
                    </div>
                </div>`

        // `<div class="cart-item" >
        //         <div class="product-bio">
        //             <img :src="img" alt="Some image">
        //             <div class="product-desc">
        //                 <p class="product-title">{{cartItem.product_name}}</p>
        //                 <p class="product-quantity">Quantity: {{cartItem.quantity}}</p>
        //                 <p class="product-single-price">$ {{cartItem.price}} each</p>
        //             </div>
        //         </div>
        //         <div class="right-block">
        //             <p class="product-price">$ {{cartItem.quantity*cartItem.price}}</p>
        //             <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
        //         </div>
        //     </div>`
});