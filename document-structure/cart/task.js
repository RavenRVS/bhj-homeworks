const productQuantityControlsList = document.querySelectorAll('.product__quantity-control');
const btnProductList = document.querySelectorAll('.product__btn');
const cart = document.querySelector('.cart');


productQuantityControlsList.forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('product__quantity-control_dec')) {
            let value = e.target.closest('.product__quantity-controls').querySelector('.product__quantity-value')
            if (value.textContent > 1) {
                let newValue = --value.textContent;
                value.textContent = newValue;
            }
        } else if (e.target.classList.contains('product__quantity-control_inc')) {
            let value = e.target.closest('.product__quantity-controls').querySelector('.product__quantity-value');
            let newValue = ++value.textContent;
            value.textContent = newValue;
        }
    })
})

btnProductList.forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        let currentProduct = e.target.closest('.product');
        let param = getParamProduct(currentProduct);
        let allProductsInCart = cart.querySelectorAll('.cart__product');
        let productInCart = findProductInCart(allProductsInCart, param["idProduct"])
        if (productInCart["finded"] == true) {
            if (e.target.classList.contains('product__add')) {
                changeQuantityProductInCart(allProductsInCart, productInCart, param["productQuantity"], false);
            } else if (e.target.classList.contains('product__remove')) {
                changeQuantityProductInCart(allProductsInCart, productInCart, param["productQuantity"], true);
            };
        } else {
            addNewProductInCart(param, e)
        }
    })
})

function getParamProduct (product) {
    let idProduct = product.dataset.id;
    let srcImgProduct = product.querySelector('.product__image').src;
    let productQuantity = product.querySelector('.product__quantity-value').textContent
    return {
        "idProduct": idProduct,
        "srcImgProduct": srcImgProduct,
        "productQuantity": productQuantity,

        valueOf() {
            return this.productQuantity;
          }
    }
}

function findProductInCart (productsList, idProduct) {
    if (productsList != null) {
        for (let i = 0; i < productsList.length; i++) {
            if (productsList[i].dataset.id == idProduct) {
                return {
                    "finded": true,
                    "index": i,
                };
            }
        }
    }
    return {
        "finded": false,
    };;
}

function changeQuantityProductInCart(productsList, product, param, decQuantity) {
    if (product["finded"]) {
        let currentQuantity = productsList[product["index"]].querySelector('.cart__product-count');
        if (decQuantity) {
            if (+currentQuantity.textContent <= +param) {
                removeProductFromCart(productsList, product)
            } else {
                currentQuantity.textContent = +currentQuantity.textContent - +param;
            }
        } else {
            currentQuantity.textContent = +currentQuantity.textContent + +param;
        }
    }
}

function addNewProductInCart (param) {
    cart.classList.add('cart_active')
    let newProductInCart = document.createElement('div');
    newProductInCart.classList.add('cart__product');
    newProductInCart.dataset.id = param["idProduct"];
    cart.querySelector('.cart__products').appendChild(newProductInCart);
    newProductInCart.insertAdjacentHTML('afterBegin',`
        <img class="cart__product-image" src=${param["srcImgProduct"]}>
        <div class="cart__product-count">${ param["productQuantity"]}</div>
    `);
    changeBtnRemoveVisibility(param["idProduct"], true)
}

function removeProductFromCart (productsList, product) {
    let idProduct = productsList[product["index"]].dataset.id
    productsList[product["index"]].remove()
    changeBtnRemoveVisibility(idProduct, false)
    if (productsList.length-1 <= 0) {
        cart.classList.remove('cart_active');
    }
}

function changeBtnRemoveVisibility (idProduct, visibility) {
    allProducts = document.querySelectorAll('.product');
    allProducts.forEach(el => {
        if (el.dataset.id == idProduct) {
            let btnRemove = el.querySelector('.product__remove');
            if (visibility) {
                btnRemove.classList.add('product__remove_active')
            } else {
                btnRemove.classList.remove('product__remove_active')
            }
        }
    })
}