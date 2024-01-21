let drawer = document.getElementById('drawer');
let auth = localStorage.getItem("isAuth")
let loginLink = document.querySelector('.login-link-div a')
let loginLinkPtag = document.querySelector('.login-link-div p');
console.log(loginLinkPtag);
if(auth=='true')
{
  loginLink.removeAttribute('id');
  loginLinkPtag.innerText="Logout";
  loginLink.classList.add('logout');
     document.querySelector('.logout').addEventListener('click',function(){
      
      handleLogout();
    })
}
  else{

let loginLinkListner = document.getElementById('login-link');
if(loginLinkListner!=null){
loginLinkListner.addEventListener('click', function() {    
    drawer.classList.toggle('hidden');
    
    // If the drawer is visible, move it to the right
    if (!drawer.classList.contains('hidden')) {
      drawer.style.right = '0';
    } else {
      drawer.style.right = '-400px'; // Move the drawer off-screen
    }
  });
}
  document.getElementById('closeDrawerBtn').addEventListener('click', function() {
    var drawer = document.getElementById('drawer');
    drawer.classList.add('hidden');
    drawer.style.right = '-300px'; // Move the drawer off-screen
  });


  
  
  document.getElementById("otp-button").addEventListener('click',function(){
    document.getElementById("loginForm").innerHTML=`    <div>
    <label for="otp">Enter OTP</label>
    <div class="otp-div">
    <input required name="opt-1" id="otp-1" type="number">
    <input required name="opt-1" id="otp-1" type="number">
    <input required name="opt-1" id="otp-1" type="number">
    <input require name="opt-1" id="otp-1" type="number">
    </div>
    <button id="login-button">Login</button>
</div>`;
let otpDigits=Array.from(document.querySelectorAll('.otp-div > input'));
document.querySelector("#login-button").addEventListener('click',function(){
   let otp=""
    otpDigits.forEach(function(digit){
        otp+=digit.value;
    })
    if(otp=="1234"){
        alert("Login Successfully");
        localStorage.setItem("isAuth",true);
        document.getElementById("loginForm").innerHTML=`<div>
        <label for="mobile-number">Quick Login / Register</label>
        <input name="mobile-number" id="mobile-number" type="number" placeholder="Enter Mobile Number">
        <button id="otp-button">Send OTP</button>
    </div>`;
        drawer.style.right = '-400px';
        document.querySelector('#login-link > p').innerText="Logout";
        document.querySelector('#login-link').classList.add('logout')
        document.querySelector('#login-link').removeAttribute('id');
      }
    
    else
    alert("Enter Correct Otp");
    document.querySelector('.logout').addEventListener('click',function(){
      
      handleLogout();
    })
})

});
  }
function handleLogout()
{
  localStorage.setItem("isAuth",false);
      loginLinkPtag.innerText="Hello, Login"
      loginLink.setAttribute('id','login-link');
      loginLink.removeAttribute('class')
      location.reload();
}
  
