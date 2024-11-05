/*
    app.js

*/

const products = productService.getProducts();
function getDescription(id){
  const message= document.querySelector('.messageBox');
  message.innerText = products[id-1].description;
  message.removeAttribute('hidden');
  setTimeout(() => {
    message.setAttribute('hidden', 'hidden');
  }, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
  getProducts(products);
  const search = document.querySelector('input');
  search.addEventListener('keyup', () => {
    const searchTerm = search.value;
    const listProducts = document.getElementById('product-cards');
    const filteredProducts = productService.searchProducts(searchTerm);
    if(filteredProducts.length > 0){
      listProducts.innerHTML = '';
      getProducts(filteredProducts);
      
    }
    else{
      listProducts.innerHTML = '';
      getProducts(products);
    }
  });
  
    
  const productClick = document.querySelectorAll('.product-name');
  for(const product of productClick){
  product.addEventListener('click', () => getDescription(product.getAttribute('data-id')));
  }

  const cartClick = document.querySelectorAll('.cart');
  for(const cartItem of cartClick){
    cartItem.addEventListener('click', () => {
    const message= document.querySelector('.messageBox');
    message.innerText = 'item added to cart';    
    message.removeAttribute('hidden');
    setTimeout(() => {
      message.setAttribute('hidden', 'hidden');
    }, 5000);
    });
  }
  
 

});
  function getProducts(products){
    products.forEach((item) => {
      const newProduct = document.createElement('article');
      newProduct.classList.add('product-card');
  
      const sku = document.createElement('div');
      sku.classList.add('sku');
      sku.innerText = item.productSku;
      newProduct.appendChild(sku);
  
      const price = document.createElement('div');
      price.classList.add('price');
      price.textContent = Intl.NumberFormat('en-US', {
        currency: 'USD',
        style: 'currency',
      }).format(item.price);
      newProduct.appendChild(price);
  
      const productName = document.createElement('div');
      productName.classList.add('product-name', 'action');
      productName.setAttribute("data-id", item.productId);
      productName.textContent = item.name;
      newProduct.appendChild(productName);
  
      const image = document.createElement('div');
      image.classList.add('product-image');
      const actualImage = document.createElement('img');
      actualImage.src = item.imageName;
      image.appendChild(actualImage);
      newProduct.appendChild(image);
  
      const cart = document.createElement('div');
      cart.classList.add('cart');
      const pic = document.createElement('i');
      pic.classList.add("fa-solid", "fa-cart-plus", "icon", "action");
      pic.setAttribute("title", "Add item to cart");
      cart.appendChild(pic);
      newProduct.appendChild(cart);
     
      document.querySelector('#product-cards').appendChild(newProduct);
    });
 
};


