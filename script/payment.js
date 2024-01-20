let billObj = JSON.parse(localStorage.getItem("totalBill")) || {};
document.getElementById("cart-value").innerText=billObj.cartValue.toFixed(2);
document.getElementById("delivery-charge").innerText=billObj.deliveryCharges.toFixed(2);
document.getElementById("handling-charges").innerText=billObj.handlingCharges.toFixed(2);
document.getElementById("amount-to-be-paid").innerText=(billObj.cartValue+billObj.deliveryCharges+billObj.handlingCharges).toFixed(2)
let buttons=document.getElementsByTagName("button")
buttons = Array.from(buttons);
buttons.forEach(element => {
    element.innerText ="Place Order & Pay "+ (billObj.cartValue+billObj.deliveryCharges+billObj.handlingCharges).toFixed(2);
});
