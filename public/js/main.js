import '../scss/style.scss'

const SHOP_CONTAINER = document.querySelector('.shop__container')
const NAV_OPTIONS = document.querySelectorAll('[data-name]')
let cartItems = JSON.parse(localStorage.getItem('data')) || []
const STORE_CART = document.querySelector('.store__cartshopping')

;(async () => {
    let response = await fetch('https://fakestoreapi.com/products')
    let data = await response.json()

    displayContent(data)
})()

let displayContent = data => {
    SHOP_CONTAINER.innerHTML = data
        .map(({ id, image, price, title }) => {
            let storageItem = cartItems.find(x => Number(x.id) === id) || []

            return `
            <div class="shop__itens">
                        <img class="shop__img" width="150" height="200" src="${image}" />
                        <h4 class="shop__itens-name">${title}</h4>
                        <p class="shop__itens-price">$ ${price}</p>
                         <div class="shop__outter-star">
                    <div class="shop__inner-star"></div>
                </div>
                        <div  class="shop__itens-quantity">
                            <div id="${id}" class="decrease-itens">-</div>
                            <p id="${id}" class="itens-quantity">${
                storageItem.item === undefined ? 0 : storageItem.item
            }</p>
                            <div id="${id}" class="increase-itens">+</div>
                        </div>
            </div>
        `
        })
        .join('')

    let shopItemStars = document.querySelectorAll('.shop__inner-star')
    for (const d of data) {
        getStarRating(shopItemStars[d.id - 1], d.rating.rate)
    }

    let shopItem = document.querySelectorAll('.shop__itens')

    NAV_OPTIONS.forEach(navOpt =>
        navOpt.addEventListener('click', () => {
            let filterOptions = {
                men: () => {
                    data.map(item => {
                        item.category != "men's clothing"
                            ? (shopItem[item.id - 1].style.display = 'none')
                            : (shopItem[item.id - 1].style.display = '')
                    })
                },
                women: () => {
                    data.map(item => {
                        item.category != "women's clothing"
                            ? (shopItem[item.id - 1].style.display = 'none')
                            : (shopItem[item.id - 1].style.display = '')
                    })
                },
                eletronic: () => {
                    data.map(item => {
                        item.category != 'electronics'
                            ? (shopItem[item.id - 1].style.display = 'none')
                            : (shopItem[item.id - 1].style.display = '')
                    })
                },
                jewelry: () => {
                    data.map(item => {
                        item.category != 'jewelery'
                            ? (shopItem[item.id - 1].style.display = 'none')
                            : (shopItem[item.id - 1].style.display = '')
                    })
                },
                all: () => {
                    data.map(item => (shopItem[item.id - 1].style.display = ''))
                },
            }

            filterOptions[navOpt.dataset.name]()
        })
    )
}

const getStarRating = (star, number) => {
    let starPercentage = (number / 5) * 100
    let numberRounded = `${Math.round(starPercentage / 10) * 10}%`

    star.style.width = numberRounded
}

//increase item quantity
document.addEventListener('click', e => {
    if (e.target.classList.contains('increase-itens')) {
        let search = cartItems.find(x => x.id === e.target.id)

        if (search === undefined)
            cartItems.push({
                id: e.target.id,
                item: 1,
            })
        else search.item++

        for (let cartitem of cartItems) {
            if (e.target.previousSibling.previousSibling.id == cartitem.id)
                e.target.previousSibling.previousSibling.textContent =
                    cartitem.item
        }

        localStorage.setItem('data', JSON.stringify(cartItems))
        calcItensQuant()
    }
})

//decrease item quantity
document.addEventListener('click', e => {
    if (e.target.classList.contains('decrease-itens')) {
        let search = cartItems.find(x => x.id === e.target.id)

        if (search === undefined) return
        else if (search.item === 0) return
        else search.item--

        for (let cartitem of cartItems) {
            if (e.target.nextSibling.nextSibling.id == cartitem.id)
                e.target.nextSibling.nextSibling.textContent = cartitem.item
        }

        cartItems = cartItems.filter(x => x.item != 0)
        localStorage.setItem('data', JSON.stringify(cartItems))

        calcItensQuant()
    }
})

const calcItensQuant = () => {
    let sum = cartItems.reduce((acc, curr) => acc + curr.item, 0)
    STORE_CART.dataset.content = sum
}

calcItensQuant()
