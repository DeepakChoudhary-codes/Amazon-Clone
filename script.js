const page = location.pathname;

const date = new Date();
date.setDate(date.getDate() + 4);

const delivery = date.toLocaleDateString("en-IN",{
    weekday: "long",
    day: "numeric",
    month: "long"
});

// function addToCart(id){
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     let item = cart.find(p => p.id == id);

//     if(item){
//         item.qty++;
//     }
//     else{
//         cart.push({id:id,qty:1});
//     }
        
//     localStorage.setItem("cart",JSON.stringify(cart));
// }

function addToCart(id){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if(!cart.includes(id)){
        cart.push(id);
        localStorage.setItem("cart",JSON.stringify(cart));
    }
}

function removeFromCart(id){
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart = cart.filter(item=>item != id);
        localStorage.setItem("cart",JSON.stringify(cart));
        location.reload();
    }

function increase(id){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function decrease(id){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.indexOf(id);
    if(index > -1){
        cart.splice(index,1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

//index page
if(page.includes("index.html") || page.endsWith("/")){
    const slides = document.querySelectorAll(".slide");
    let i = 0;

    function show(n){
    slides[i].classList.remove("active");
    i = (n + slides.length) % slides.length;
    slides[i].classList.add("active");
    }

    document.getElementById("next").onclick = ()=> show(i+1);
    document.getElementById("prev").onclick = ()=> show(i-1);

    document.getElementById("jump").onchange = function(){
        location.href = this.value;
    }

}

//login page
if(page.includes("login.html")){
    const form = document.getElementById("loginForm");
    form.addEventListener("submit",function(e){
        e.preventDefault();

        const userInput = document.querySelector(".loginInput").value.trim();
        const password = document.querySelector(".passwordInput").value.trim();

        const inputError = document.getElementById("inputError");
        const passwordError = document.getElementById("passwordError");

        //clear old errors
        inputError.textContent = "";
        passwordError.textContent = "";

        let valid = true;

        if(userInput === ""){
            inputError.textContent = "Field is required";
            valid = false;
        }
        else if(userInput.includes("@")){
            if(!userInput.includes(".")){
                inputError.textContent = "Enter correct credentials";
                valid = false;
            }
        }
        else{
            if(!/^\d{10}$/.test(userInput)){
            inputError.textContent = "Enter correct credentials";
            valid = false;
            }
        }

        if(password === ""){
            passwordError.textContent = "Field is required"
            valid = false;
        }
        else if(password.length < 6){
            passwordError.textContent = "Password must be at least 6 characters";
            valid = false;
        }

        if(valid){
            const users = JSON.parse(localStorage.getItem("users")) || [];
        
            // userInput and password are already string values, so we use them directly
            const user = users.find(u => u.id === userInput && u.password === password);
        
            if(user){
                alert("Login Successful!!!");
                location.href = "index.html";
            }
            else{
                alert("Login Failed!!! Try Again");
            }
        }
    });
}

//register page
if(page.includes("register.html")){
    const form = document.getElementById("signup-form");
    form.addEventListener("submit", function(e){
        e.preventDefault();

        const idInput = document.querySelector(".idInput").value.trim();
        const nameInput = document.querySelector(".nameInput").value.trim();
        const passwordInput = document.querySelector(".passwordInput").value.trim();
        const reEnterInput = document.querySelector(".reEnterInput").value.trim();

        const inputError = document.getElementById("inputError");
        const nameError = document.getElementById("nameError");
        const passwordError = document.getElementById("passwordError");
        const reEnterError = document.getElementById("reEnterError");

        inputError.textContent = "";
        nameError.textContent = "";
        passwordError.textContent = "";
        reEnterError.textContent = "";

        let valid = true;

        if(idInput === ""){
            inputError.textContent = "Field is required";
            valid = false;
        }
        else if(idInput.includes("@")){
            if(!idInput.includes(".")){
                inputError.textContent = "Enter correct credentials";
                valid = false;
            }
        }
        else{
            if(!/^\d{10}$/.test(idInput)){
            inputError.textContent = "Enter correct credentials";
            valid = false;
            }
        }
        if(nameInput === ""){
            nameError.textContent = "Field is required";
            valid = false;
        }
        
        if(passwordInput === ""){
            passwordError.textContent = "Field is required";
            valid = false;
        }
        else if(passwordInput.length < 6){
            passwordError.textContent = "Password must be at least 6 characters";
            valid = false;
        }
        
        if(reEnterInput === ""){
            reEnterError.textContent = "Field is required";
            valid =  false;
        }
        else if(passwordInput !== reEnterInput){
            reEnterError.textContent = "Passwords do not match";
            valid = false;
        }

        if(valid){
            const users = JSON.parse(localStorage.getItem("users")) || [];

            // Check if user already exists
            if(users.some(u => u.id === idInput)){
                alert("User already exists! Sign in instead.");
                return;
            }

            users.push({
                id : idInput,
                name: nameInput,
                password : passwordInput
            });
            localStorage.setItem("users",JSON.stringify(users));

            alert("Registered Successfully");
            location.href = "index.html";
        }
});
}

//products page
if(page.includes("products.html")){
    //get category from URL
    const params = new URLSearchParams(location.search);
    const cat = params.get("cat");
    //filter products
    const filtered = products.filter(p => p.cat === cat);
    //display products
    const box = document.getElementById("products");

    if(cat === "beauty" || cat === "furniture" || cat === "home" || cat === "toys" || cat === "fashion"){
        box.classList.add("five");
    }

    document.getElementById("jump").onchange = function(){
        location.href = this.value;
    }

    filtered.forEach(p => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const inCart = cart.includes(p.id);

        const stars = p.rating ? "⭐".repeat(Math.round(p.rating)) : "";
        box.innerHTML += `
        <div class = "card">
            <div class="img-box">    
                <div class="img-card">
                    <a href= "product.html?id=${p.id}">
                        <img src = "${p.image}">
                    </a>
                </div>
            </div>
            <div class="card-body">
                <a href= "product.html?id=${p.id}">
                    <p id="name">${p.name}</p>
                    <small id="rating">Rating: ${p.rating ? p.rating : "No rating"} ${stars}</small>
                    <br>
                    <small>${p.bought}+ bought in past month</small>
                    <p id="price">₹${p.price.toLocaleString("en-IN")}</p>
                    </a>
                    <p id="delivery">FREE delivery by <b>${delivery}</b></p>
                    ${inCart
                    ? `<button id="cart-btn" onclick="location.href='cart.html'">Go to Cart</button>`
                    : `<button id="cart-btn" onclick="addToCart(${p.id}); location.reload()">Add to Cart</button>`
                    }
            </div>
        </div>
        `;
    });
}

//product detail page
if(page.includes("product.html")){
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    
    const product = products.find(p => p.id ==id);
    const box = document.getElementById("details");
    const stars = product.rating ? "⭐".repeat(Math.round(product.rating)) : "";

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const inCart = cart.includes(product.id);
    
    box.innerHTML = `
    <div class="head"></div>
    <div class="product">
        <div class = "product-card">
            <div class = "product-img-box">
                <div class="button">
                    <button id="btn"><img src ="${product.image} " id ="img-btn"></button><br>
                    <button id="btn"><img src ="${product.image2}" id ="img-btn"></button><br>
                    <button id="btn"><img src ="${product.image3}" id ="img-btn"></button><br>
                    <button id="btn"><img src ="${product.image4}" id ="img-btn"></button><br>
                </div>
                <div class="product-img-card">
                    <img src = "${product.image}">
                </div>
            </div>
        </div>
        
        <div class="product-body">
            <div class = "card-details">
                <h1 id="pName">${product.name}</h1>
                <small id="pRating">Rating: ${product.rating ? product.rating : "No rating"} ${stars}</small>
                <br>
                <small style="font-size: 13px">${product.bought}+ bought in past month</small>
                <hr style="margin-bottom : 15px">
                <span id="p-Price">₹${product.price.toLocaleString("en-IN")}</span>
                <br><br>
                <p>Inclusive of all taxes</p><br>
                <p><b>EMI</b> starts at ₹${Math.round(product.price * 0.04)}. No cost EMI available</p><br>
                <div class="product-icons">
                    <div class="icon1">
                        <i class="fa-solid fa-truck-fast fa-xl" style="margin-left: 20px"></i>
                        <p><small>Free Delivery</small></p>
                    </div>
                    <div class="icon2">
                        <i class="fa-solid fa-hand-holding-dollar fa-xl" style="margin-left: 30px"></i>
                        <p><small>Pay on Delivery</small></p>
                    </div>
                    <div class="icon3">
                        <i class="fa-solid fa-lock fa-xl" style="margin-left: 35px"></i>
                        <p><small>Secure Transaction</small></p>
                    </div>
                </div>
            </div>
            <hr><br><hr>
            <div class="aboutSection">
                <h2>About this item</h2>
                <p>${product.about}</p>
            </div>
        </div>

        <div class="purchase">
            <p id="p-Price">₹${product.price.toLocaleString("en-IN")}</p>
            <p id="delivery">FREE delivery by <b>${delivery}</b></p>
            <i class="fa-solid fa-location-dot "></i>
            <a style="font-size: 13px;">Delivering to Mukerian 144211</a>
            <br><br>
            <p style= "color: #0b7b3c ; font-size: 18px">In stock</p>
            <div class="display">
                <span id= "Ldisplay">Ships from</span>
                <span id= "Rdisplay">Amazon</span>
                <br>
                <span id= "Ldisplay">Payment</span>
                <span id= "Rdisplay">Secure transaction</span>
            </div>
            <br><br>
            ${inCart 
                ? `<button class="submit-btn" onclick="location.href='cart.html'">Go to Cart</button>`
                : `<button class="submit-btn" onclick="addToCart(${product.id}); location.reload();">Add to Cart</button>`
                }
            <button class= "submit-btn buy-now">Buy Now</button>
        </div>
    </div>
    <div class="productDetails">
        <hr><br>
        <h2>Product Details</h2>
        <p>${product.details}</p>
    </div>
    <div class="productDescription">
        <hr><br>
        <h2>Product Description</h2>
        <p>${product.description}</p>
    </div>
    `;

    const mainImg = document.querySelector(".product-img-card img");
    const smallImgs = document.querySelectorAll("#img-btn");

    smallImgs.forEach(img => {
        img.addEventListener("mouseover", () => {
            mainImg.src = img.src;
        });
    });
}

// Add to Cart
if(page.includes("cart.html")){
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const check = document.getElementById("cart");

    if(cart.length === 0){
        check.innerHTML = `
            <div class="cart-container">
                <div class="cart-products-outer">
                    <div class="cart-products-inner">
                        <div class="cart-products">
                            <h2>Your Amazon Cart is Empty</h2><br>
                            <p>Your Shopping Cart lives to serve. Give it purpose — fill it with groceries, clothing, household supplies, electronics, and more.</p>
                            <p>Continue shopping on the our homepage <a href="index.html"> Amazon_Clone </a>, learn about today's deals, or visit your Wish List.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    const box = document.querySelector(".cart-product-details");

    let total = 0;

    cart.forEach(id=>{
        const p = products.find(p=>p.id==id);
        total += p.price;
    });

    // document.querySelector(".subtotal span").innerText = 
    // "Subtotal : ₹"+ total.toLocaleString("en-IN");

    const totals = document.querySelectorAll(".total-price");
    totals.forEach(t=>{
        t.innerText = " ₹"+total.toLocaleString("en-IN");
    });

    const unique = [...new Set(cart)];
    
    unique.forEach(id=>{
        const p = products.find(p=>p.id==id);
        const qty = cart.filter(i => i == id).length;

        const stars = p.rating ? "⭐".repeat(Math.round(p.rating)) : "";

        box.innerHTML += `
        <div class="card">
            <div class="img-box">
                <div class="img-card">
                    <a href="product.html?id=${p.id}">
                        <img src="${p.image}">
                    </a>
                </div>
            </div>

            <div class="card-body">
                <a href="product.html?id=${p.id}">
                    <p id="name">${p.name}</p>
                    <br>
                    <small id="rating">Rating: ${p.rating ? p.rating : "No rating"} ${stars}</small>
                    <br><br>
                    <small>${p.bought}+ bought in past month</small>
                </a>

                <div class="cart-btns">
                    <button class="delete-btn" onclick="decrease(${p.id})"><i class="fa-solid fa-minus"></i></button>
                    <span class="quantity">${qty}</span>
                    <button class="plus-btn" onclick="increase(${p.id})"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>

            <div class="price">
                <p id="price">₹${p.price.toLocaleString("en-IN")}</p>
            </div>
        </div>
        <br>
        <hr>
        `;
    });
}