Vue.component('checkout', {
    template: `    <main class="checkout">
        <div class="container checkout__container">
            <details open class="checkout__details">
                <summary class="checkout__details-title">01. Shipping Adress</summary>
                <div class="checkout__details-box">
                    <form action="#" class="checkout__details-form">
                        <p class="checkout__details-note">Check as a guest or register</p>
                        <p class="checkout__details-note_s">Register with us for future convenience</p>
                        <div class="checkout__details-radio-box">
                            <input name="details-radio" type="radio" class="checkout__details-radio" id="checkout__details-radio-as-gest">
                            <label class="checkout__details-radio-label" for="checkout__details-radio-as-gest">checkout as guest</label>
                        </div>
                        <div class="checkout__details-radio-box">
                            <input name="details-radio" checked type="radio" class="checkout__details-radio" id="checkout__details-radio-register">
                            <label class="checkout__details-radio-label" for="checkout__details-radio-register">register</label>
                        </div>
                        <p class="checkout__details-note">register and save time!</p>
                        <p class="checkout__details-note_s">Register with us for future convenience</p>
                        <a href="#" class="checkout__details-link">>> Fast and easy checkout</a>
                        <a href="#" class="checkout__details-link">>> Easy access to your order history and status</a>
                        <button type="submit" class="checkout__details-btn">Continue</button>
                    </form>
                    <form action="#" class="checkout__details-form">
                        <p class="checkout__details-note">Already registed?0</p>
                        <p class="checkout__details-note_s">Please log in below</p>
                        <p class="checkout__details-input-label">EMAIL ADDRESS<span class="_red-text"> *</span></p>
                        <input type="email" class="checkout__details-input">
                        <p class="checkout__details-input-label">PASSWORD<span class="_red-text"> *</span></p>
                        <input type="password" class="checkout__details-input">
                        <p class="checkout__details-note_s"><span class="_red-text">* Required Fileds</span></p>
                        <button type="submit" class="checkout__details-btn checkout__details-btn_right">Log in</button>
                        <a href="#" class="checkout__details-forgot-password-link">Forgot Password ?</a>
                    </form>
                </div>
            </details>
            <details class="checkout__details">
                <summary class="checkout__details-title">02. BILLING INFORMATION</summary>
                <p>BILLING INFORMATION</p>
            </details>
            <details class="checkout__details">
                <summary class="checkout__details-title">03. SHIPPING INFORMATION</summary>
                <p>SHIPPING INFORMATION</p>
            </details>
            <details class="checkout__details">
                <summary class="checkout__details-title">04. SHIPPING METHOD</summary>
                <p>SHIPPING METHOD</p>
            </details>
            <details class="checkout__details">
                <summary class="checkout__details-title">05. PAYMENT METHOD</summary>
                <p>PAYMENT METHOD</p>
            </details>
            <details class="checkout__details">
                <summary class="checkout__details-title">06. ORDER REVIEW</summary>
                <p>ORDER REVIEW</p>
            </details>
        </div>
    </main>`
})