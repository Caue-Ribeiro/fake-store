import '../scss/style.scss'

let cartItems = JSON.parse(localStorage.getItem('data')) || []
const STORE_CART = document.querySelector('.store__cartshopping')
const CART_ITEMS = document.querySelector('.cart__items')
const CART_TOTAL_PRICE = document.querySelector('.cart__total-price > span')
let totalPricesArr = []

const loadContent = async () => {
    let response = await fetch('https://fakestoreapi.com/products')
    let data = await response.json()

    displayCartContent(data)
}
loadContent()

const displayCartContent = data => {
    CART_ITEMS.innerHTML = data
        .map(({ id, title, price, image }) => {
            for (let cartitem of cartItems) {
                if (id == cartitem.id) {
                    let sum = Intl.NumberFormat('en-US').format(
                        cartitem.item * price
                    )

                    let search = totalPricesArr.find(x => x.id == id)
                    if (search == undefined) {
                        totalPricesArr.push({
                            id: id,
                            value: price * cartitem.item,
                        })
                    } else search.value = price * cartitem.item

                    CART_TOTAL_PRICE.textContent = `$ ${Intl.NumberFormat(
                        'en-US'
                    ).format(
                        totalPricesArr.reduce(
                            (acc, curr) => acc + curr.value,
                            0
                        )
                    )}`

                    return `<div class="items__card">
            <img
                class="cart__img"
                width="50"
                height="50"
                src="${image}"
            />
            <div class="title__price">
                <h4 class="cart__itens-name">${title}</h4>
                <p class="cart__itens-price">$ ${sum}</p>
            </div>
                <div id="${id}" class="erase__cartItem">X</div>
            <div class="cart__itens-quantity">
                <div id="${id}" class="decrease-itens">-</div>
                <p id="${id}" class="itens-quantity">${cartitem.item}</p>
                <div id="${id}" class="increase-itens">+</div>
            </div>
        </div>`
                }
            }
        })
        .join('')
}

//increase item quantity
document.addEventListener('click', e => {
    if (e.target.classList.contains('increase-itens')) {
        let search = cartItems.find(x => x.id === e.target.id)

        search.item++

        for (let cartitem of cartItems) {
            if (e.target.previousSibling.previousSibling.id == cartitem.id) {
                e.target.previousSibling.previousSibling.textContent =
                    cartitem.item
            }
        }

        localStorage.setItem('data', JSON.stringify(cartItems))
        calcItensQuant()
        loadContent()
    }
})

//decrease item quantity
document.addEventListener('click', e => {
    if (e.target.classList.contains('decrease-itens')) {
        let search = cartItems.find(x => x.id === e.target.id)

        search.item--

        for (let cartitem of cartItems) {
            if (e.target.nextSibling.nextSibling.id == cartitem.id)
                e.target.nextSibling.nextSibling.textContent = cartitem.item
        }

        if (e.target.nextSibling.nextSibling.textContent == '0')
            e.target.parentElement.parentElement.remove()
        cartItems = cartItems.filter(x => x.item != 0)
        localStorage.setItem('data', JSON.stringify(cartItems))

        calcItensQuant()
        loadContent()
    }
})

//erase cart item
document.addEventListener('click', e => {
    if (e.target.classList.contains('erase__cartItem')) {
        e.target.parentElement.remove()

        cartItems = cartItems.filter(x => x.id != e.target.id)
        localStorage.setItem('data', JSON.stringify(cartItems))

        calcItensQuant()

        totalPricesArr.forEach((item, idx) => {
            if (e.target.id == item.id) totalPricesArr.splice(idx, 1)

            CART_TOTAL_PRICE.textContent = `$ ${Intl.NumberFormat(
                'en-US'
            ).format(
                totalPricesArr.reduce((acc, curr) => acc + curr.value, 0)
            )}`
        })
    }
})

const calcItensQuant = () => {
    let sum = cartItems.reduce((acc, curr) => acc + curr.item, 0)
    STORE_CART.dataset.content = sum
}

calcItensQuant()
