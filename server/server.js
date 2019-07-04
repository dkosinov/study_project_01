const express = require('express');
const fs = require('fs');
const cartRouter = require('./cartRouter');
const app = express();


app.use(express.json());
app.use('/', express.static('public'));
// app.use('/checkout.html', express.static('public/checkout.html'));
app.use('/api/cart', cartRouter);

app.get('/api/products', (req, res) => {
    fs.readFile('server/db/products.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    })
});

app.get('/api/products/:id_product', (req, res) => {
    // console.log(req.params["id_product"]);
    // console.log(req.params.id_product);
    // res.send({"id_product " : req.params["id_product"]});
    fs.readFile('server/db/products.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            let products = JSON.parse(data);
            let find = products.find(el => el.id_product === +req.params.id_product);
            if (find){
                res.send(find);
            }
        }
    });
});

// app.get('/api/single_page', (req, res) => {
//     console.log('single_page');
//
//     // fs.readFile('server/db/products.json', 'utf-8', (err, data) => {
//     //     if (err) {
//     //         res.sendStatus(404, JSON.stringify({result: 0, text: err}));
//     //     } else {
//     //         res.send(data);
//     //     }
//
// });



// app.get()
// app.post()
// app.put()
// app.delete()

// app.get('/', (req, res) => {
//    res.send('Hello World!');
// });
// app.get('/api/users/:id', (req, res) => {
//     // res.send(req.params.id);
//     res.send(req.query);
// });



app.listen(3000, () => console.log('Listen on port 3000...'))