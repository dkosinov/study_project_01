Vue.component('cart', {
    props: ['cartType'],
    data(){
      return {
          // cartUrl: `/getBasket.json`,
          cartItems: [],
          countGoods: 0,
          couponDiscount: 0,
          showCart: false,
          // imgCart: `https://placehold.it/50x100`
      }
    },
    methods: {
        addOneProduct(product, quantity=1){ //изменить название на addProduct
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if(find){
                this.$root.putJson(`/api/cart/${find.id_product}`, {quantity: quantity})
                    .then(data => {
                        if(data.result){
                            find.quantity += quantity;
                        }
                    });
            } else {
                let prod = Object.assign({quantity: quantity}, product);
                console.log(prod.quantity);
                console.log(quantity);
                this.$root.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result){
                            this.cartItems.push(prod);
                        }
                    })
            }
        },
        changeProductQuantity(product, quantity){
            const quantityDeviation = quantity - product.quantity;
            console.log('Изменяем количество товара на ' + quantityDeviation);
            this.$root.putJson(`/api/cart/${product.id_product}`, {quantity: quantityDeviation})
                .then(data => {
                    if(data.result){
                        product.quantity += quantityDeviation;
                    }
                })
        },
        removeOneProduct(product){
            if(product.quantity > 1){
                this.$root.putJson(`/api/cart/${product.id_product}`, {quantity: -1})
                    .then(data => {
                        if(data.result){
                            product.quantity--;
                        }
                    })
            } else {
                this.removeProductFromCart(product);
            }
        },
        removeProductFromCart(product){
            this.$root.deleteJson(`/api/cart/${product.id_product}`)
            // this.$root.deleteJson(`/api/cart/${product.id_product}`, {quantity: -1})
                .then(data => {
                    if(data.result){
                        this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        return 1;
                    }
                });
        },
        removeAllProductsFromCart(){
            this.$root.deleteJson(`/api/cart/`)
                .then(data => {
                    if(data.result){
                        this.cartItems = [];
                    }
                })
        },

        getCartTotalSum () {
            let totalSum = 0;
            for (var i = 0; i < this.cartItems.length; i++) {
                totalSum += this.cartItems[i].price * this.cartItems[i].quantity;
            }
            return totalSum;
        },
        getGrandTotal () {
            //вычитаем скидку если есть и grandTotal не становится отрицательным
            let grandTotal = 0;
            if (this.cartItems.length > 0)
                grandTotal = this.getCartTotalSum();

            if (this.couponDiscount > 0)
                grandTotal = grandTotal - this.couponDiscount;

            if (grandTotal < 0)
                grandTotal = 0;

            return grandTotal;
        },
    },
    computed : {
        getCartTotalQuantity: function () {
            let total = 0;
            // for (var i = 0; i < this.cartItems.length; i++) {
            for (let item of this.cartItems) {
                total += +item.quantity;
            }
            return total;
        },
    },

    mounted(){
        this.$root.getJson(`/api/cart`)
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
                this.countGoods = data.countGoods;
                this.amount = data.amount;
            });
    },
    template: `<span>  
                    <!--отображаем первый вариант отрисовки корзины если получено cartType = 1-->
                    <cart-type-small  v-if="cartType === 1"></cart-type-small>
                    <!--отображаем второй вариант отрисовки корзины если получено cartType = 2-->
                    <cart-type-large v-if="cartType === 2"></cart-type-large>                    
               </span>`
});
Vue.component('cart-type-small', {
    template: `<div class="header__content-right">
                    <img class="header__cart-img" src="img/cart.svg" alt="cart">
                    <div class="header__cart-amount">{{$parent.getCartTotalQuantity}}</div>
                    <button class="header__button-link" type="button" @click="$parent.showCart = !$parent.showCart">My Account</button>    
                    <div class="header__drop-cart drop-cart" v-show="$parent.showCart">
                        <p v-if="!$parent.cartItems.length">Cart is empty</p>
                        <cart-item-small
                            v-for="item of $parent.cartItems" 
                            :key="item.id_product"
                            :cart-item="item">
<!--                                @remove="remove">-->
                        </cart-item-small>
                        <div class="drop-cart__total">
                            <p class="drop-cart__total-caption">TOTAL</p>
                            <p class="drop-cart__total-summ">$ {{$parent.getCartTotalSum()}}</p>
                        </div>
                        <span v-if="$parent.cartItems.length">
                            <a href="checkout.html" class="drop-cart__button">Checkout</a>
                            <a href="shopping_cart.html" class="drop-cart__button">Go to cart</a>
                        </span>
                    </div>
                </div>`
});
Vue.component('cart-type-large', {
    template: `<main class="cart">
                    <div class="container cart__container">
                        <div class="cart__content">
                            <div class="cart__head">
                                <div class="cart__column-1 cart__head-text">Product Details</div>
                                <div class="cart__column-2 cart__head-text">unite Price</div>
                                <div class="cart__column-3 cart__head-text">Quantity</div>
                                <div class="cart__column-4 cart__head-text">shipping</div>
                                <div class="cart__column-5 cart__head-text">Subtotal</div>
                                <div class="cart__column-6 cart__head-text">ACTION</div>
                            </div>
                            <cart-item-large
                                v-for="item of $parent.cartItems" 
                                :key="item.id_product"
                                :cart-item="item">
<!--                                        @remove="remove">-->
                            </cart-item-large>
                        </div>
                        <div class="cart__buttons">
                            <button class="cart__button" @click="$parent.removeAllProductsFromCart()">
                                cLEAR SHOPPING CART</button>
                            <button class="cart__button">cONTINUE sHOPPING</button>
                        </div>
                        <div class="cart__details">
                            <div class="cart__adress">
                                <p href="" class="cart__details-title">Shipping Adress</p>
                                <select name="" id="" class="cart__details-input cart__adress-country">
                                    <option value="Bangladesh">Bangladesh</option>
                                </select>
                                <input type="text" class="cart__details-input cart__adress-state" placeholder="State">
                                <input type="text" class="cart__details-input cart__adress-zip" placeholder="Postcode / Zip">
                            </div>
                            <div class="cart__coupon">
                                <p href="" class="cart__details-title">coupon  discount</p>
                                <div class="cart__coupon-caption">Enter your coupon code if you have one</div>
                                <input type="text" class="cart__details-input cart__coupon-code" placeholder="000000">
                                <a href="" class="cart__button cart__button_small">Apply coupon</a>
                            </div>
                            <div class="cart__total">
                                <p class="cart__total-subtotal">Sub total <span>$ {{$parent.getCartTotalSum()}}</span></p>
                                <p class="cart__total-grandtotal">grand total <span class="_pink-text">$ {{$parent.getGrandTotal()}}</span></p>
                                <a href="checkout.html" class="cart__total-button">proceed to checkout</a>
                            </div>
                        </div>
                        <a href="" class="cart__button cart__button_small">get a quote</a>
                    </div>
                </main>`
});
Vue.component('cart-item-small', {
    props: ['cartItem'],
    methods: {
        getItemTotalSum(){
            //вернём стоимость всех единиц данного товара
            return this.cartItem.price * this.cartItem.quantity;
        },
    },
    template: `<div class="drop-cart__item">
                    <div class="cart__product">
                        <a class="drop-cart__product-img-link" :href="'single_page.html?id_product='+cartItem.id_product">
                            <img :src="cartItem.imgS" alt="cartItem.name" class="drop-cart__product-img cart__product-img">
                        </a>
                        <div class="cart__product-text">
                            <div class="cart__product-name">Rebox Zane</div>
                            <div class="drop-cart__product-stars cart__product-stars stars"
                                v-html="$root.getProductRatingHTML(cartItem.rating)">
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
                            <i class="fas fa-times-circle" @click="$parent.$parent.removeOneProduct(cartItem, 1)"></i>
                        </a>
                    </div>
                </div>`
});

Vue.component('cart-item-large', {
    props: ['cartItem'],
    data(){
        return {
            // inputQuantity: 0,
        }
    },
    methods: {
        getItemTotalSum(){
            //вернём стоимость всех единиц данного товара
            return this.cartItem.price * this.cartItem.quantity;
        },

        checkQuantityOnChange(){
            const inputQuantityPrev = this.cartItem.quantity;
            $inputNode = document.getElementById(this.cartItem.id_product);
            const inputQuantityNew = +$inputNode.value;
            console.log("node.id = " + $inputNode.id);
            console.log("id_product = " + this.cartItem.id_product);
            console.log("Старое значение = " + inputQuantityPrev);
            console.log("Новое значение = " + inputQuantityNew);

            if (!isNaN(inputQuantityNew) && inputQuantityNew > 0 ){
                console.log(inputQuantityNew + ' True');
                console.log("Устанавливаем новое значение = " + inputQuantityNew);
                this.$parent.$parent.changeProductQuantity(this.cartItem, inputQuantityNew);
            } else {
                console.log(inputQuantityNew + ' False');
                $inputNode.value = inputQuantityPrev;
            }
        },
    },
    template: `<div class="cart__item">
                    <div class="cart__column-1 cart__product">
                        <a class="cart__product-link" :href="'single_page.html?id_product='+cartItem.id_product">
                            <img :src="cartItem.imgS" alt="product" class="cart__product-img">
                        </a>
                        <div class="cart__product-text">
                            <div class="cart__product-name">{{cartItem.name}}</div>
                            <div class="cart__product-stars stars" 
                                v-html="$root.getProductRatingHTML(cartItem.rating)"></div>
                            <div class="cart__product-color">
                                Color:
                                <span class="cart__product-color-data">{{cartItem.color}}</span>
                            </div>
                            <div class="cart__product-size">
                                Size:
                                <span class="cart__product-size-data">{{cartItem.size.toUpperCase()}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="cart__column-2 cart__product-price">$ {{cartItem.price}}</div>
                    <div class="cart__column-3 cart__product-quantity">
                        <input type="text" class="cart__product-quantity-input" :id="cartItem.id_product"
                            :value.number="cartItem.quantity"
                            @change="checkQuantityOnChange()">
                            <!--                            v-model.number="tempQuantity"-->

<!--                            @input="checkQuantity(cartItem.quantity)">-->
                    </div>
                    <div class="cart__column-4 cart__product-shipping">FREE</div>
                    <div class="cart__column-5 cart__product-subtotal">$ {{getItemTotalSum()}}</div>
                    <div class="cart__column-6 cart__product-action">
                        <a href="#" @click.prevent class="cart__product-action-link">
                            <i class="fas fa-times-circle" 
                                @click="$parent.$parent.removeOneProduct(cartItem)"></i>
<!--                                логично будет если кнопка в большой корзине будет делать то же что и в маленькой, удалять один товар-->
                        </a>
                    </div>
                </div>`

});