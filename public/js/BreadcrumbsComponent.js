Vue.component('breadcrumbs',{
    template: `<div class="breadcrumb">
                    <div class="container breadcrumb__content">
                        <h1 class="breadcrumb__product-group-name">New Arrivals </h1>
                        <nav class="breadcrumb__menu">
                            <a href="index.html" class="breadcrumb__link">Home/</a>
                            <a href="catalog.html" class="breadcrumb__link">MAN/</a>
                            <a href="catalog.html" class="breadcrumb__active" @click.prevent>New Arrivals</a>
                        </nav>
                    </div>
                </div>`
})