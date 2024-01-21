let cartData = JSON.parse(localStorage.getItem('cart')) || [];
console.log(cartData)
// Get the container element
const cartContainer = document.querySelector('.cart-item-container');
document.querySelector('.cart-left-container > div >h2').innerText = `${cartData.length} item in your cart`;

// Loop through the cart data and create HTML structure
function displayData(data){
    cartContainer.innerHTML="";
    data.forEach(item => {
    
    // Create cart item div
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';

    // Create image container
    const imageContainer = document.createElement('div');
    const image = document.createElement('img');
    image.src = item.images[0]; // Assuming the first image is used
    image.alt = 'Product Image';
    imageContainer.appendChild(image);

    // Create details container
    const detailsContainer = document.createElement('div');
    const productName = document.createElement('p');
    productName.className = 'name-of-product';
    productName.textContent = item.name;

    const brandName = document.createElement('p');
    brandName.className = 'brand-name';
    brandName.textContent = `${item.brand}`;

    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = `₹${item.price.toFixed(2)}`;

    const deliveryInfo = document.createElement('p');
    deliveryInfo.className = 'delivery-by';
    deliveryInfo.textContent = 'Delivery by 22 Jan - 25 Jan';

    detailsContainer.appendChild(productName);
    detailsContainer.appendChild(brandName);
    detailsContainer.appendChild(price);
    detailsContainer.appendChild(deliveryInfo);

    // Create action container
    const actionContainer = document.createElement('div');
    const deleteButton = document.createElement('img');
    deleteButton.src = 'https://assets.pharmeasy.in/web-assets/images/icDelete.svg';
    deleteButton.alt = 'Delete Item';
    deleteButton.className = 'delete-item-button';
    deleteButton.addEventListener('click',function(){
        handDeleteButton(item);
    })

    const quantitySelect = document.createElement('select');
    quantitySelect.name = 'item-quantatiy';
    quantitySelect.id = 'item-quantatiy';
    for (let i = 1; i <= 20; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.text = i;
        if(item.quantity==i)
            option.selected=true;
        quantitySelect.appendChild(option);
    }

    actionContainer.appendChild(deleteButton);
    actionContainer.appendChild(quantitySelect);

    // Append containers to the cart item
    cartItem.appendChild(imageContainer);
    cartItem.appendChild(detailsContainer);
    cartItem.appendChild(actionContainer);

    // Append cart item to the container
    cartContainer.appendChild(cartItem);
    
});
generateCartSummary(cartData);
}
function generateCartSummary(cartData) {
    // Container for the cart summary
    let summaryContainer = document.querySelector('.cart-right-container');
    summaryContainer.innerHTML=""
    // Offer Section
    let offerSection = document.createElement('div');
    offerSection.className = 'offer';
    let offerImage = document.createElement('img');
    offerImage.src = 'https://assets.pharmeasy.in/web-assets/images/cartCoupon.svg';
    offerImage.alt = 'Offer Image';
    let offerText = document.createElement('p');
    offerText.textContent = 'Flat 27% OFF on first 3 medicine orders | Use code PHTC27';
    offerSection.appendChild(offerImage);
    offerSection.appendChild(offerText);

    // Cart Total Section
    let cartTotalSection = document.createElement('div');
    cartTotalSection.className = 'cart-total';
    let cartTotalText = document.createElement('p');
    cartTotalText.innerHTML = 'Cart total: <span>₹' + getTotalCartValue(cartData).toFixed(2) + '</span>';
    let continueButton = document.createElement('button');
    if(cartData.length==0)
        continueButton.disabled=true;
    else
        continueButton.disabled=false;

    continueButton.addEventListener('click',function(){
        if(localStorage.getItem("isAuth")=='true')
        location.href="./payment.html";
        else
        alert("Please login first")
    })


    continueButton.className = 'continue-button';``
    continueButton.textContent = 'Continue';
    
    let applyCouponSection = document.createElement('div');
    let applyCouponImage = document.createElement('img');
    applyCouponImage.src = 'https://assets.pharmeasy.in/web-assets/images/cartCoupon.svg';
    applyCouponImage.alt = 'Apply Coupon Image';
    let applyCouponText = document.createElement('p');
    applyCouponText.textContent = 'Apply coupon';
    applyCouponSection.appendChild(applyCouponImage);
    applyCouponSection.appendChild(applyCouponText);

    cartTotalSection.appendChild(cartTotalText);
    cartTotalSection.appendChild(continueButton);
    cartTotalSection.appendChild(applyCouponSection);

    // Bill Summary Section
    let billSummarySection = document.createElement('div');
    billSummarySection.className = 'bill-summary';
    let billSummaryHeading = document.createElement('h3');
    billSummaryHeading.textContent = 'Bill Summary';
    billSummarySection.appendChild(billSummaryHeading)
    // Create divs for each item in the bill summary
    let items = ['Total MRP', 'Delivery charges', 'Cart Value'];
    items.forEach(function(item) {
        let div = document.createElement('div');
        let itemName = document.createElement('p');
        itemName.textContent = item;
        let itemValue = document.createElement('p');
        itemValue.textContent = '₹' + getBillItemValue(item, cartData).toFixed(2);
        div.appendChild(itemName);
        div.appendChild(itemValue);
        billSummarySection.appendChild(div);
    });

    // Amount to be Paid
    let amountToBePaid = document.createElement('div');
    amountToBePaid.className = 'amount-to-be-paid';
    let amountToBePaidHeading = document.createElement('p');
    amountToBePaidHeading.textContent = 'Amount to be paid';
    let amountValue = document.createElement('p');
    amountValue.textContent = '₹' + (getTotalCartValue(cartData)+getBillItemValue('Delivery charges')).toFixed(2);
    amountToBePaid.appendChild(amountToBePaidHeading);
    amountToBePaid.appendChild(amountValue);
    billSummarySection.appendChild(amountToBePaid)
    // Append all sections to the summary container
    summaryContainer.appendChild(offerSection);
    summaryContainer.appendChild(cartTotalSection);
    // summaryContainer.appendChild(billSummaryHeading);
    summaryContainer.appendChild(billSummarySection);
    // summaryContainer.appendChild(amountToBePaid);

    // Append the summary container to the body
    document.querySelector('.cart-main-container').appendChild(summaryContainer)
    let obj = {cartValue:getTotalCartValue(cartData),deliveryCharges:80,handlingCharges:3.00};
    localStorage.setItem("totalBill",JSON.stringify(obj));
}

// Function to calculate the total cart value
function getTotalCartValue(cartData) {
    return cartData.reduce((total, item) => total + Number(item.price), 0);
}

// Function to get the value of a specific item in the bill summary
function getBillItemValue(itemName, cartData) {
    switch (itemName) {
        case 'Total MRP':
            return getTotalCartValue(cartData);
        case 'Delivery charges':
            return 80; 
        case 'Cart Value':
            return getTotalCartValue(cartData);
        default:
            return 0;
    }
}

function handDeleteButton(dataToBeDeleted)
{
    cartData = cartData.filter((data)=> data.name!= dataToBeDeleted.name);
    localStorage.setItem("cart",JSON.stringify(cartData));
    displayData(cartData);
}
displayData(cartData)
// Retrieve cart data from local storage

// Call the function to generate cart summary
