Vue.component('cart', {
    data(){
      return {
          cartUrl: `/getBasket.json`,
          cartItems: [],
          showCart: false,
          imgCart: `https://placehold.it/50x100`
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
                            :img="imgCart"
                            :cart-item="item">
<!--                            @remove="remove">-->
                            </cart-item>
                        <div class="drop-cart__total">
                            <p class="drop-cart__total-caption">TOTAL</p>
                            <p class="drop-cart__total-summ">$500.00</p>
                        </div>
                        <a href="#" class="drop-cart__button">Checkout</a>
                        <a href="shopping_cart.html" class="drop-cart__button">Go to cart</a>
                    </div>
                </div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `<div class="drop-cart__item">
                    <div class="cart__product">
                        <a href="single_page.html" class="drop-cart__product-img-link">
                            <img src="img/product/product-10.jpg" alt="product" class="drop-cart__product-img cart__product-img">
                        </a>
                        <div class="cart__product-text">
                            <div class="cart__product-name">Rebox Zane</div>
                            <div class="drop-cart__product-stars cart__product-stars stars">
                                <div class="stars__star stars__star_active"><i class="fas fa-star"></i></div>
                                <div class="stars__star stars__star_active"><i class="fas fa-star"></i></div>
                                <div class="stars__star stars__star_active"><i class="fas fa-star"></i></div>
                                <div class="stars__star stars__star_active"><i class="fas fa-star"></i></div>
                                <div class="stars__star stars__star_active"><i class="fas fa-star"></i></div>
                            </div>
                            <div class="drop-cart__product-quantity-price">
                                1
                                <span class="cart__product-quantity-price_x"> x </span>
                                $250
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
})