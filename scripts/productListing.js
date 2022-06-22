import { createHtmlELement, setElementAttribute } from './helper.js'


const backCountryUrl = 'https://www.backcountry.com/api/products/categories/bc-mens-shirts?categoryId=bc-mens-shirts&p=Brand%253A100000062&page=0&plpType=default&q=&sort='
const cart = 'Cart'


const getBcData = () => {
    fetch(backCountryUrl, {
        mode: 'cors',
        method: 'GET'
    })
        .then((response) => {
            return response.json();
        }).then((data) => {

            console.log(data.products);

            const fetchProducts = (product) => {

                const gridRow = document.getElementById('grid-row');

                product.forEach((productData) => {
                    const gridColumnDiv = createHtmlELement('div');
                    setElementAttribute(gridColumnDiv, 'class', 'col col-lg-3 col-md-4 col-sm-12  pt-2 px-1');

                    gridColumnDiv.setAttribute('class', 'col col-lg-3 col-md-4 col-sm-12  py-1 px-1');
                    const cardDiv = createHtmlELement('div')
                    setElementAttribute(cardDiv, 'class', 'card list-card')
                    const cardImgTag = createHtmlELement('img')
                    setElementAttribute(cardImgTag, 'class', 'card-img-top list-card')
                    cardImgTag.src = `https://www.backcountry.com${productData.productMainImage.mediumImg}`;

                    cardDiv.appendChild(cardImgTag);

                    const cardBodyDiv = createHtmlELement('div')
                    setElementAttribute(cardBodyDiv, 'class', 'card-body text-hider')

                    const cardTitleDiv = createHtmlELement('h6');
                    setElementAttribute(cardTitleDiv, 'class', 'card-title')
                    cardTitleDiv.innerHTML = productData.brand.name;

                    const cardBodyPara = createHtmlELement('p')
                    setElementAttribute(cardBodyPara, 'class', 'card-text pb-5 ')
                    cardBodyPara.innerHTML = productData.title;

                    const cardPrice = createHtmlELement('h6')
                    cardPrice.innerText = `$${productData.activePrice.maxListPrice}`

                    const ratingDiv = createHtmlELement('div')
                    setElementAttribute(ratingDiv, 'class', 'reviews')

                    const cardAddToCartBtnDiv = createHtmlELement('div')
                    const cardAddToCartBtn = createHtmlELement('a')

                    setElementAttribute(cardAddToCartBtn, 'class', 'btn btn-dark  mt-2')
                    setElementAttribute(cardAddToCartBtn, 'href', '#')
                    setElementAttribute(cardAddToCartBtn, 'id', `'${productData.id}'`)
                    cardAddToCartBtn.addEventListener("click", (e) => addToCart(productData.id, productData.activePrice.maxListPrice, e));
                    cardAddToCartBtn.innerHTML = "Add To Cart";

                    const cartId = localStorage.getItem(cart) || '[]'
                    const parsedCartId = JSON.parse(cartId)

                    const isAddedToCart = parsedCartId.find((btnId) => btnId.id === productData.id);

                    if (isAddedToCart) {
                        setElementAttribute(cardAddToCartBtn, 'class', 'btn btn-danger mt-2')
                        cardAddToCartBtn.innerHTML = 'Remove From Cart';
                    }

                    cardAddToCartBtnDiv.appendChild(cardAddToCartBtn);

                    cardBodyDiv.appendChild(cardTitleDiv);
                    cardBodyDiv.appendChild(cardBodyPara);
                    cardBodyDiv.appendChild(cardPrice);
                    cardBodyDiv.appendChild(ratingDiv);

                    Array.apply(null, { length: productData.customerReviews.average }).forEach((review) => {
                        const cardRating = createHtmlELement('i')
                        setElementAttribute(cardRating, 'class', "fa fa-star")
                        setElementAttribute(cardRating, 'aria-hidden', 'true')
                        ratingDiv.appendChild(cardRating);
                    });

                    cardBodyDiv.appendChild(cardAddToCartBtnDiv);
                    cardDiv.appendChild(cardBodyDiv);
                    gridColumnDiv.appendChild(cardDiv);
                    gridRow.appendChild(gridColumnDiv);

                })

            };

            fetchProducts(data.products)

            const searchBar = document.getElementById('searchBar')
            searchBar.addEventListener('keyup', () => searchProducts())

            const searchProducts = (value) => {

                const gridRow = document.getElementById('grid-row');
                gridRow.textContent = '';
                const searchValue = document.getElementById('searchBar').value.toLowerCase();

                const filteredProducts = data.products.filter((product) => {
                    return (
                        product.brand.name.toLowerCase().includes(searchValue) || product.title.toLowerCase().includes(searchValue)
                    );
                })

                fetchProducts(filteredProducts)

            }

        })

}
getBcData()



const addToCart = (productId, productPrice, e) => {
    e.preventDefault();

    const LocalStorageCartItems = {
        id: productId,
        price: productPrice,
        quantity: 1
    }

    const cartBtn = document.getElementById(`'${productId}'`);
    const cartItem = localStorage.getItem(cart) || '[]';
    const parsedCartItem = JSON.parse(cartItem);

    if (cartBtn.innerHTML === 'Add To Cart') {
        parsedCartItem.push(LocalStorageCartItems);
        cartBtn.innerHTML = 'Remove From Cart'
        setElementAttribute(cartBtn, 'class', 'btn btn-danger mt-2')
    }

    else if (cartBtn.innerHTML === 'Remove From Cart') {

        const cartItemIndex = parsedCartItem.find((cartProductId) => cartProductId.id === productId);
        const cartIdIndex = parsedCartItem.indexOf(cartItemIndex);
        parsedCartItem.splice(cartIdIndex, 1)
        cartBtn.innerHTML = 'Add To Cart'
        setElementAttribute(cartBtn, 'class', 'btn btn-dark mt-2')
    }

    localStorage.setItem(cart, JSON.stringify(parsedCartItem));


}