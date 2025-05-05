
const desserts = [
    {
        id: 1,
        name: 'Waffle with Berries',
        price: 8.50,
        image: 'https://images.unsplash.com/photo-1568051243851-f9b136146e97?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        category: 'Waffles'
    },
    {
        id: 2,
        name: 'Vanilla Bean Crème Brûlée',
        price: 7.00,
        image: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        category: 'Crème Brûlée'
    },
    {
        id: 3,
        name: 'Macaron Mix of Five',
        price: 8.00,
        image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        category: 'Macarons'
    },
    {
        id: 4,
        name: 'Classic Tiramisu',
        price: 9.50,
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        category: 'Tiramisu'
    },
    {
        id: 5,
        name: 'Pistachio Baklava',
        price: 4.00,
        image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        category: 'Baklava'
    },
    {
        id: 6,
        name: 'Lemon Meringue Pie',
        price: 5.00,
        image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        category: 'Pies'
    },
    {
        id: 7,
        name: 'Red Velvet Cake',
        price: 6.50,
        image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        category: 'Cakes'
    },
    {
        id: 8,
        name: 'Salted Caramel Brownie',
        price: 5.00,
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        category: 'Brownies'
    },
    {
        id: 9,
        name: 'Vanilla Panna Cotta',
        price: 6.50,
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        category: 'Panna Cotta'
    }
];


let cart = [];


const dessertGrid = document.getElementById('dessertGrid');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const orderTotal = document.getElementById('orderTotal');
const confirmOrderBtn = document.getElementById('confirmOrder');

function renderDesserts() {
    dessertGrid.innerHTML = desserts.map(dessert => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="${dessert.image}" alt="${dessert.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <div class="text-sm text-gray-500 mb-1">${dessert.category}</div>
                <h3 class="font-semibold mb-2">${dessert.name}</h3>
                <div class="flex justify-between items-center">
                    <span class="text-orange-600 font-bold">$${dessert.price.toFixed(2)}</span>
                    <button 
                        onclick="addToCart(${dessert.id})"
                        class="flex items-center bg-white border border-orange-600 text-orange-600 px-3 py-1 rounded-lg hover:bg-orange-50 transition-colors"
                    >
                        <i class="fas fa-cart-plus mr-2"></i>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function addToCart(dessertId) {
    const dessert = desserts.find(d => d.id === dessertId);
    const existingItem = cart.find(item => item.id === dessertId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...dessert,
            quantity: 1
        });
    }

    updateCart();
}


function removeFromCart(dessertId) {
    cart = cart.filter(item => item.id !== dessertId);
    updateCart();
}

function updateQuantity(dessertId, delta) {
    const item = cart.find(item => item.id === dessertId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(dessertId);
        } else {
            updateCart();
        }
    }
}

function updateCart() {
  
    cartItems.innerHTML = cart.map(item => `
        <div class="flex justify-between items-center">
            <div class="flex-1">
                <h4 class="font-medium">${item.name}</h4>
                <div class="text-sm text-gray-600">$${item.price.toFixed(2)}</div>
            </div>
            <div class="flex items-center space-x-2">
                <button 
                    onclick="updateQuantity(${item.id}, -1)"
                    class="text-gray-500 hover:text-orange-600"
                >
                    <i class="fas fa-minus-circle"></i>
                </button>
                <span class="w-8 text-center">${item.quantity}</span>
                <button 
                    onclick="updateQuantity(${item.id}, 1)"
                    class="text-gray-500 hover:text-orange-600"
                >
                    <i class="fas fa-plus-circle"></i>
                </button>
                <button 
                    onclick="removeFromCart(${item.id})"
                    class="text-red-500 hover:text-red-600 ml-2"
                >
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('') || '<p class="text-gray-500 text-center">Your cart is empty</p>';

   
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = `(${totalItems})`;


    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    orderTotal.textContent = `$${total.toFixed(2)}`;
}


confirmOrderBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Please add items to your cart first');
        return;
    }
    
    alert('Thank you for your order!');
    cart = [];
    updateCart();
});


renderDesserts();
updateCart(); 