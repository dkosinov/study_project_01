// const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

const app = new Vue({
    el: '#app',
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                // .catch(error => this.$refs.error.setText(error));
        },
        postJson(url, data){
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                // .catch(error => this.$refs.error.setText(error));
        },
        putJson(url, data){
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
            // .catch(error => this.$refs.error.setText(error));
        },
        deleteJson(url){
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(result => result.json())
            // .catch(error => this.$refs.error.setText(error));
        },
        getProductRatingHTML(rating) {
            let ratingHTML = '';
            const maxRating = 5;
            for (var j = 0; j < maxRating; j++) {
                if (j < rating) {
                    ratingHTML += '<div class="stars__star stars__star_active"><i class="fas fa-star"></i></div>\n'
                    //если пустые звёздочки должны отображатьса, то раскоментить (НЕ РАБОТАЕТ!!!)
                } else {
                    ratingHTML += '<div class="stars__star"><i class="fas fa-star"></i></div>\n'
                }
            }
            return ratingHTML;
        },
    }
})