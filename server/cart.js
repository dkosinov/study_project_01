let add = (cart, req) => {
    cart.contents.push(req.body);
    cart.amount += req.body.price;
    cart.countGoods++;
    return JSON.stringify(cart, null, 4);
};
let change = (cart, req) => {
    // console.log("req.params.id " + req.params.id);
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    cart.countGoods += req.body.quantity;
    cart.amount += req.body.quantity * find.price;

    return JSON.stringify(cart, null, 4);
};
let removeOne = (cart, req) => {
    console.log("req.params.id " + req.params.id);
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    console.log(find);
    // console.log(find.price);
    // cart.amount -= find.price;
    // cart.countGoods--;
    cart.contents.splice(cart.contents.indexOf(find),1);

    return JSON.stringify(cart, null, 4);
};
let removeAll = (cart, req) => {
    // console.log("req.params.id " + req.params.id);
    cart.amount = 0;
    cart.countGoods = 0;
    cart.contents = [];
    return JSON.stringify(cart, null, 4);
};

module.exports = {
    add,
    change,
    removeOne,
    removeAll
}