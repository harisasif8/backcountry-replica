import { createHtmlELement, setElementAttribute } from './helper.js'

const backCountryUrl = 'https://www.backcountry.com/api/products/categories/bc-mens-shirts?categoryId=bc-mens-shirts&p=Brand%253A100000062&page=0&plpType=default&q=&sort='
const localStorageCart = 'Cart'

const getBcData = () => {
    fetch(backCountryUrl, {
        mode: 'cors',
        method: 'GET'
    })
        .then((response) => {
            return response.json();
        }).then((data) => {
            // console.log(data.products);
            const showCartProducts = (cartProduct) => {

                const emptyCart = document.getElementById('emptyCart')
            
                const cartIds = localStorage.getItem(localStorageCart) || '[]';
                const parsedCartId = JSON.parse(cartIds)
            
                if (parsedCartId.length) {
                    emptyCart.textContent = ''
                }
            
                parsedCartId.map((parsedId) => {
                    const filteredId = cartProduct.find((product) => product.id === parsedId.id);
                    const { productMainImage, title: productTitle, id: productId, selectedSize, activePrice } = filteredId;
            
                    const cartRow = document.getElementById('cartRow');
            
                    const cartFirstColDiv = createHtmlELement('div')
                    setElementAttribute(cartFirstColDiv, 'class', 'col-lg-8 col-sm-12 col-md-8 mt-4')
            
                    const cartFlexDiv = createHtmlELement('div')
                    setElementAttribute(cartFlexDiv, 'class', 'd-flex')
            
                    const cartFirstFlexColDiv = createHtmlELement('div')
                    setElementAttribute(cartFirstFlexColDiv, 'class', 'col-lg-4 col-md-4')
                    cartFlexDiv.appendChild(cartFirstFlexColDiv)
            
                    const cartImg = createHtmlELement('img')
                    setElementAttribute(cartImg, 'class', 'cart-image img-fluid')
                    cartImg.src = `https://www.backcountry.com${productMainImage.mediumImg}`;
            
            
                    const cartSecondFlexColDiv = createHtmlELement('div')
                    setElementAttribute(cartSecondFlexColDiv, 'class', 'col-lg-7 col-md-9')
                    cartFlexDiv.appendChild(cartSecondFlexColDiv)
            
                    const cartTextDiv = createHtmlELement('div')
                    setElementAttribute(cartTextDiv, 'class', 'cart-text')
            
                    const cartTitle = createHtmlELement('h4')
                    cartTitle.innerHTML = productTitle;
            
                    const cartTextId = createHtmlELement('p')
                    setElementAttribute(cartTextId, 'class', 'text-secondary')
                    cartTextId.innerHTML = productId;
            
                    const cartParaText = createHtmlELement('div')
                    setElementAttribute(cartParaText, 'class', 'cart-para-text text-dark')
            
                    const cartColorPara = createHtmlELement('p')
                    cartColorPara.innerHTML = `Color: ${productMainImage.name}`
            
                    const cartSizePara = createHtmlELement('p')
                    cartSizePara.innerHTML = `Size: ${selectedSize}`
            
            
            
                    const cartSecondColDiv = createHtmlELement('div')
                    setElementAttribute(cartSecondColDiv, 'class', 'col-lg-2  col-sm-4 col-md-3 text-lg-right text-md-right mt-4')
            
                    const cartQuantityDiv = createHtmlELement('div')
                    setElementAttribute(cartQuantityDiv, 'class', 'cart-quantity')
            
                    const quantityFirstDiv = createHtmlELement('div')
                    setElementAttribute(quantityFirstDiv,'class','quantity-first-div')
            
                    const decrementButton = createHtmlELement('button')
                    setElementAttribute(decrementButton, 'class', 'btn btn-outline-dark')
                    setElementAttribute(decrementButton, 'id', `decBtn'${productId}'`)
                    setElementAttribute(decrementButton, 'value', 'minus')
                    if (parsedId.quantity === 1) { setElementAttribute(decrementButton, 'disabled', 'true') }
                    decrementButton.innerHTML = '-'
                    decrementButton.addEventListener("click", (event) => quantityHandler(event, productId))
            
                    const inputQuantity = createHtmlELement('input')
                    setElementAttribute(inputQuantity, 'class', 'btn text-center shadow-none pattern')
                    setElementAttribute(inputQuantity, 'value', `${parsedId.quantity}`)
                    setElementAttribute(inputQuantity,'pattern','[0-9]+')
                    setElementAttribute(inputQuantity, 'id', `'${productId}'`)
            
                    const incrementButton = createHtmlELement('button')
                    setElementAttribute(incrementButton, 'class', 'btn btn-outline-dark')
                    setElementAttribute(incrementButton, 'id', `incBtn'${productId}'`)
                    setElementAttribute(incrementButton, 'value', 'plus')
                    incrementButton.innerHTML = '+'
                    incrementButton.addEventListener("click", (event) => quantityHandler(event, productId))
            
                    const quantitySecondDiv = createHtmlELement('div')
                    setElementAttribute(quantitySecondDiv,'class','quantity-second-div')
            
            
                    const productPrice = createHtmlELement('h6')
                    setElementAttribute(productPrice, 'class', 'mt-lg-4 ml-lg-5 mt-md-4 ml-md-5 price bold-text mr-3')
                    setElementAttribute(productPrice, 'id', `price'${productId}'`)
            
                    productPrice.innerHTML = `${parsedId.price}`
            
                    const removeCart = createHtmlELement('h5')
            
                    const removeCartBtn = createHtmlELement('button')
                    setElementAttribute(removeCartBtn, 'class', 'btn shadow-none text-muted mt-lg-3 underline')
                    removeCartBtn.innerHTML = 'Remove'
                    removeCartBtn.addEventListener("click", () => removeCartItem(productId));
            
                    cartRow.appendChild(cartFirstColDiv)
                    cartFirstColDiv.appendChild(cartFlexDiv)
                    cartFirstFlexColDiv.appendChild(cartImg)
                    cartSecondFlexColDiv.appendChild(cartTextDiv)
                    cartTextDiv.appendChild(cartTitle)
                    cartTextDiv.appendChild(cartTextId)
                    cartTextDiv.appendChild(cartParaText)
                    cartParaText.appendChild(cartColorPara)
                    cartParaText.appendChild(cartSizePara)
                    cartRow.appendChild(cartSecondColDiv)
                    cartSecondColDiv.appendChild(cartQuantityDiv)
                    cartQuantityDiv.appendChild(quantityFirstDiv)
                    quantityFirstDiv.appendChild(decrementButton)
                    quantityFirstDiv.appendChild(inputQuantity)
                    quantityFirstDiv.appendChild(incrementButton)
                    cartQuantityDiv.appendChild(quantitySecondDiv)
                    quantitySecondDiv.appendChild(productPrice)
                    quantitySecondDiv.appendChild(removeCart)
                    removeCart.appendChild(removeCartBtn)
                })
            }

            showCartProducts(data.products)

            const quantityHandler = (e, productId) => {
                const decItemQuantityId = document.getElementById(`decBtn'${productId}'`);
                const localStorageCartItems = localStorage.getItem(localStorageCart) || '[]';
                const localStorageParsedCartItems = JSON.parse(localStorageCartItems);
                const cartItem = localStorageParsedCartItems.find((cartProductId) => cartProductId.id === productId);
                // const backCountryProductPrice = backCountryProducts.find((cartProductPriceId) => cartProductPriceId.id === productId)
                const backCountryProductPrice = data.products.find((cartProductPriceId) => cartProductPriceId.id === productId)
                const quantity = document.getElementById(`'${productId}'`).value;
            
            
                if (e.target.value === 'minus') {
                    const itemQuantityValue = parseInt(quantity) - 1 || 0;
                    cartItem.quantity = itemQuantityValue;
                    document.getElementById(`'${productId}'`).value = itemQuantityValue;
                }
            
                else {
                    const itemQuantityValue = parseInt(quantity) + 1 || 0;
                    cartItem.quantity = itemQuantityValue;
                    document.getElementById(`'${productId}'`).value = itemQuantityValue;
                }
            
                const totalProductPrice = cartItem.quantity * backCountryProductPrice.activePrice.maxListPrice;
                cartItem.price = parseFloat(totalProductPrice.toFixed(2));
            
            
                if (cartItem.quantity === 1 || cartItem.quantity<=0) {
                    setElementAttribute(decItemQuantityId, 'disabled', 'true')
                }
            
                else {
                    decItemQuantityId.removeAttribute('disabled')
                }
            
                document.getElementById(`price'${productId}'`).innerHTML = parseFloat(totalProductPrice).toFixed(2);
            
                localStorage.setItem(localStorageCart, JSON.stringify(localStorageParsedCartItems))
            
            
            }

        })

}
getBcData()


const removeCartItem = (productId) => {
    const localStorageCartItems = localStorage.getItem(localStorageCart) || '[]';
    const localStorageParsedCartItems = JSON.parse(localStorageCartItems)
    const cartItem = localStorageParsedCartItems.find((cartProductId) => cartProductId.id === productId);
    const cartIdIndex = localStorageParsedCartItems.indexOf(cartItem)
    localStorageParsedCartItems.splice(cartIdIndex, 1)

    localStorage.setItem(localStorageCart, JSON.stringify(localStorageParsedCartItems))

}


