Vue.component('pageHeader', {
    props: ['isCartInHeader'],
    // data(){
    //     return {
    //
    //     }
    // },
    template: `<div class="header">
                    <div class="container header-container">
                        <div class="header__content-left">
                            <a class="logo" href="index.html">
                                <img class="logo__img" src="img/logo.png" alt="logo">
                                BRAN<span class="logo__span _pink-text">D</span>
                            </a>
                            <form class="header__search-form" action="#" @submit.prevent>
                                <button class="header__button-browse">Browse
                                    <div class="header__drop-megamenu drop-megamenu">
                                        <div class="drop-megamenu__box">
                                            <h3 class="drop-megamenu__header">Home</h3>
                                            <ul class="drop-megamenu__menu">
                                                <li><a class="drop-megamenu__link" href="#">Dresses</a></li>
                                                <li><a class="drop-megamenu__link" href="#">Tops</a></li>
                                                <li><a class="drop-megamenu__link" href="#">Sweaters/Knits</a></li>
                                                <li><a class="drop-megamenu__link" href="#">Jackets/Coats</a></li>
                                                <li><a class="drop-megamenu__link" href="#">Blazers</a></li>
                                                <li><a class="drop-megamenu__link" href="#">Denim</a></li>
                                                <li><a class="drop-megamenu__link" href="#">Leggings/Pants</a></li>
                                                <li><a class="drop-megamenu__link" href="#">Skirts/Shorts</a></li>
                                                <li><a class="drop-megamenu__link" href="#">Accessories</a></li>
                                            </ul>
                                        </div>
                                        <div class="drop-megamenu__box">
                                            <h3 class="drop-megamenu__header">Women</h3>
                                            <ul class="drop-megamenu__menu">
                                                <li><a class="drop-megamenu__link" href="#">Dresses</a></li>
                                                <li><a class="drop-megamenu__link" href="#">Tops</a></li>
                                                <li><a class="drop-megamenu__link" href="#">Sweaters/Knits</a></li>
                                                <li><a class="drop-megamenu__link" href="#">Jackets/Coats</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </button>
                                <input class="header__search-text" type="text" placeholder="Search for Item...">
                                <button type="submit" class="header__button-submit">
                                    <i class="fas fa-search"></i>
                                </button>
                            </form>
                        </div>
                        <!--Отрисовываем компонент карзины Тип 1: маленькая выпадающая корзина-->
                        <cart ref="cart" :cart-type="1" v-if="isCartInHeader"></cart>
                    </div>
                </div>`
})