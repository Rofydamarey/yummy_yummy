/// <reference types="../@types/jquery" />
var nameInput=document.getElementById('nameInput');
var emailInput=document.getElementById('emailInput');
var phoneInput=document.getElementById('phoneInput');
var ageInput=document.getElementById('ageInput');
var passwordInput=document.getElementById('passwordInput');
var repasswordInput=document.getElementById('repasswordInput');
let submitBtn;
let rowData= document.getElementById("rowData");
let search = document.getElementById("searchContainer");
var searchName=document.getElementById('searchName')
var searchLetter=document.getElementById('searchLetter')
/*nav*/





$(function () {
    $('.loader').fadeOut(500,function () {
        $('.loading').fadeIn(500,function () {
            $('body').css('overflow','auto')
            $('.loading').remove()
        })
    })
})

$('.toggle').on('click',function () {
    $('.tabs').animate({width:'toggle'},1000)
   
   
 })
changeicon =(icon) => icon.classList.toggle('fa-xmark') 
/*first show */
function showSearch(){
    document.getElementById('searchContainer').classList.remove('d-none');
    document.getElementById('rowData').classList.add('d-none');
}
async function displaymeal(){
    let resopnse= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    var data1 = await resopnse.json();
    var hambozo=``;
    for (let i = 0; i < data1.meals.length; i++) {
        hambozo += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${data1.meals[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${data1.meals[i].strMealThumb}" alt="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${data1.meals[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
   document.getElementById('rowData').innerHTML=hambozo
}
displaymeal();
/*info */
//show  information about one meal
let meal = [];
async function getMealDetails(mealID) {
    rowData.innerHTML = ""
    $(".loading").fadeIn(300)
    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    arr = await respone.json();
    meal = arr.meals
    displayMealDetails();
    $(".loading").fadeOut(300)

}

function displayMealDetails(){
    let ingredients = meal[0];
    let ingredientsContent = ``
    for (let i = 1; i <= 20; i++) {
        if (ingredients[`strIngredient${i}`]) {
            ingredientsContent += `<li class="alert alert-info m-2 p-1">${ingredients[`strMeasure${i}`]} ${ingredients[`strIngredient${i}`]}</li>`
        }
    }
    let tags = meal[0].strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
              <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
 
    let cartona = `
    <div class="col-md-4 text-white" >
                <img class="w-100 rounded-3" src="${meal[0].strMealThumb
                }"
                    alt="">
                    <h2>${meal[0].strMeal}</h2>
                   
                    
            </div>
            <div class="col-md-8 text-white">
                <h2>Instructions</h2>
                <p>${meal[0].strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal[0].strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal[0].strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${ingredientsContent}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${tagsStr}
                </ul>
                    <a target="_blank" href="${meal[0].strSource}">
                        <button class="btn btn-success">
                            Source
                        </button>
                    </a>
                    <a target="_blank" href="${meal[0].strYoutube}" >
                        <button class="btn btn-danger">
                        Youtube
                        </button>
                    </a>
            </div>`

    rowData.innerHTML = cartona

}


/*Area */
async function getArea() {
    rowData.innerHTML = ""
    $(".loading").fadeIn(300)
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    arr = await respone.json()
    area = arr.meals
    displayArea(area)
    $(".loading").fadeOut(300)
   
}


function displayArea(area) {
    searchContainer.innerHTML=''
    let cartona = "";
    for (let i = 0; i < area.length ; i++) {
        cartona += `
        <div class="col-md-3 text-white">
                <div onclick="getAreaMeals('${area[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${area[i].strArea}</h3>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartona
}

async function getAreaMeals(area) {
    rowData.innerHTML = ""
    $(".loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    arr = await response.json();
    areaMeal = arr.meals

    dispalyAreaMeals(areaMeal);
    $(".loading").fadeOut(300)

}
function dispalyAreaMeals(areaMeal){
    let cartona = "";
 
    for (let i = 0; i < areaMeal.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="getMealDetails(${areaMeal[i].idMeal})" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${areaMeal[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-white p-2">
                        <h3>${areaMeal[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
    rowData.innerHTML =  cartona
}
/*category */
async function getCategories() {
    var Categories;
    rowData.innerHTML = ""
    $(".loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    arr = await response.json()
    Categories = arr.meals

    displayCategories(arr.categories)
    $(".loading").fadeOut(300)

}

function displayCategories(Categories) {
    searchContainer.innerHTML=''
    let cartona = "";

    for (let i = 0; i < Categories.length; i++) {
        cartona += `
        <div class="col-md-3 ">
                <div onclick="getCategoryMeals('${Categories[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${Categories[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${Categories[i].strCategory}</h3>
                        <p>${Categories[i].strCategoryDescription.split(" ").slice(0,15).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartona
}

async function getCategoryMeals(Categories) {
    rowData.innerHTML = ""
    $(".loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Categories}`)
    arr = await response.json()
    CategorieMeal = arr.meals

    dispalyCategoryMeals(CategorieMeal)
    $(".loading").fadeOut(300)

}
function dispalyCategoryMeals(CategorieMeal){
    let cartona = "";
  
    for (let i = 0; i < CategorieMeal.length; i++) {
        cartona += `
        
        <div class="col-md-3">
                <div onclick="getMealDetails(${CategorieMeal[i].idMeal})" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${CategorieMeal[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-white p-2">
                        <h3>${CategorieMeal[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
    rowData.innerHTML = cartona
}
/*Ingredients*/

async function getIngredients() {
    rowData.innerHTML = ""
    $(".loading").fadeIn(300)


    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    arr = await respone.json()
    

    displayIngredients(arr.meals.slice(0, 20))
    $(".loading").fadeOut(300)

}


function displayIngredients(arr) {
    searchContainer.innerHTML=''
    let cartona = "";

    for (let i = 0; i < arr.length; i++) {
        cartona += `
        <div class="col-md-3 text-white">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                <img src="https://www.themealdb.com/images/ingredients/${arr[i].strIngredient}.png" class="w-100">
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,15).join(" ")}</p>
                </div>
        </div>
        `
    }

    document.getElementById('rowData').innerHTML=cartona
}

async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = ""
    $(".loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    arr = await response.json()
    ingredientsmeal = arr.meals

    dispalyingredientsMeals(arr.meals.slice(0, 20))
    $(".loading").fadeOut(300)

}

function dispalyingredientsMeals(ingredientsmeal){
    let cartona = "";
    for (let i = 0; i < ingredientsmeal.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="getMealDetails(${ingredientsmeal[i].idMeal})" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${ingredientsmeal[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-white p-2">
                        <h3>${ingredientsmeal[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
    document.getElementById('rowData').innerHTML=cartona
   
}
/*search */
// function showSearchInputs() {
//     searchContainer.innerHTML = `
//     <div class="row py-4 ">
//         <div class="col-md-6 ">
//             <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
//         </div>
//         <div class="col-md-6">
//             <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
//         </div>
//     </div>`

//     rowData.innerHTML = ""
// }

// async function searchByName(i) {
    
//     rowData.innerHTML = ""
//     $(".loading").fadeIn(300)

//     let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${i}`)
//     response = await response.json()

//     response.meals ? displaymeal(response.meals) : displaymeal([])
//     $(".loading").fadeOut(300)

// }

// async function searchByFLetter(i) {
    
//     rowData.innerHTML = ""
//     $(".loading").fadeIn(300)

//     i == "" ? i = "a" : "";
//     let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${i}`)
//     response = await response.json()

//     response.meals ? displaymeal(response.meals) : displaymeal([])
//     $(".loading").fadeOut(300)

// }


function showSearchInputs() {
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" id="searchName" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" id="searchLetter" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    rowData.innerHTML = ""
 }



async function searchByName(){
    rowData.innerHTML = ""
    $(".loading").fadeIn(300)
    let searchInput = document.getElementById("searchName").value

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    arr = await respone.json()
    searchMeal = arr.meals
    console.log(searchMeal)

    dispalySearch(searchMeal)
    $(".loading").fadeOut(300)
}
async function searchByFLetter(){
    rowData.innerHTML = ""
    $(".loading").fadeIn(300)
    let searchLetter = document.getElementById("searchletter").value

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchLetter}`)
    arr = await respone.json()
    searchMeal = arr.meals
    console.log(searchMeal)

    dispalySearch(searchMeal)
    $(".loading").fadeOut(300)
}
function dispalySearch(){
    let cartona = "";

    for (let i = 0; i < searchMeal.length ; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="getMealDetails(${searchMeal[i].idMeal})" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${searchMeal[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${searchMeal[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
    rowData.innerHTML = cartona
}


/*contact*/
function showContacts() {
    searchContainer.innerHTML=''
    rowData.innerHTML = `
    <div class="container  w-75 text-center mt-5">
        <div class="row g-4 ">
            <div class="col-md-6">
                <input id="name" name="name" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100  d-none">
                    Special characters and numbers not allowed
                       </div>
            </div>
            <div class="col-md-6">
                <input id="email" name="email" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100  d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phone" name="phone" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100  d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="age" name="age" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100  d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="password" name="password" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100  d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repassword" name="repassword" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100  d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-warning px-2 mt-3">Submit</button>
    </div>
</div> `
const containsSpecialCharactersOrNumbers = (value) => {
    const pattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const containsSpecialChars = pattern.test(value);
    const containsNumbers = /\d/.test(value);
    return containsSpecialChars || containsNumbers;
};

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^\d{11}$/;
    return phoneRegex.test(phone);
};

const isValidAge = (age) => {
    return age >= 18 && age <= 70;
};

const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
};

const passwordsMatch = (password, repassword) => {
    return password === repassword;
};

$("#name").keyup(function () {
    const value = $(this).val();
    const containsSpecialCharsOrNumbers =
        containsSpecialCharactersOrNumbers(value);
    $("#nameAlert").toggleClass(
        "d-none",
        !containsSpecialCharsOrNumbers
    );
});

$("#email").keyup(function () {
    const value = $(this).val();
    const validEmail = isValidEmail(value);
    $("#emailAlert").toggleClass("d-none", validEmail);
});

$("#phone").keyup(function () {
    const value = $(this).val();
    const validPhoneNumber = isValidPhoneNumber(value);
    $("#phoneAlert").toggleClass("d-none", validPhoneNumber);
});

$("#age").keyup(function () {
    const value = $(this).val();
    const validAge = isValidAge(value);
    $("#ageAlert").toggleClass("d-none", validAge);
});

$("#password").keyup(function () {
    const value = $(this).val();
    const validPassword = isValidPassword(value);
    $("#passwordAlert").toggleClass("d-none", validPassword);
});

$("#repassword").keyup(function () {
    const passwordsMatch = $("#password").val() === $(this).val()

    $("#repasswordAlert").toggleClass("d-none", passwordsMatch);
});

const areAllFieldsValid = () => {
    const nameValid = !containsSpecialCharactersOrNumbers(
        $("#name").val()
    );
    const emailValid = isValidEmail($("#email").val());
    const phoneValid = isValidPhoneNumber($("#phone").val());
    const ageValid = isValidAge($("#age").val());
    const passwordValid = isValidPassword($("#password").val());
    const repasswordValid = passwordsMatch(
        $("#password").val(),
        $("#repassword").val()
    );

    return (
        nameValid &&
        emailValid &&
        phoneValid &&
        ageValid &&
        passwordValid &&
        repasswordValid
    );
};

const toggleSubmitButton = () => {
    $("#submitBtn").prop("disabled", !areAllFieldsValid());
};

$("#name, #email, #phone, #age, #password, #repassword").keyup(
    function () {
        toggleSubmitButton();
    }
);

$('.loading').fadeOut(300);
};

$("#contact-us").on("click", function () {
adContactForm();
});


