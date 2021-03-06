
// send email
function sendMail(contactForm) {

    emailjs.send("gmail", "cooktemplate", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.email.value,
        "message": contactForm.message.value
    })
        .then(
            function (response) {
                console.log("SUCCESS", response);
                contactForm.reset();
            },
            function (error) {
                console.log("FAILED", error);
            }
        );
    return false;
}


// Scroll to top
scrollBtn = document.getElementById("scroll-to-top");

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
}

function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


// Delete the ingredient with the id
function deleteIngredient(e) {
    var id = event.target.id.split('-')[1];
    console.log(id);

    $('#ingredient-' + id).remove();
}

function addRecipeIngredient() {
    // Ingredient row, stores two inputs and a button, all inside their own divs
    ingredientRow = document.createElement("div");
    ingredientRow.classList.add("row");
    ingredientRow.classList.add("mb-2");
    ingredientRow.id = "ingredient-" + (++ingredientCount).toString();

    // Div for the ingredient name input
    ingredientDiv = document.createElement("div");
    ingredientDiv.classList.add("col");

    // Ingredient name
    ingredientInput = document.createElement("input");
    ingredientInput.type = "text";
    ingredientInput.placeholder = "Ingredient name";
    ingredientInput.required = true;
    ingredientInput.classList.add("form-control");
    ingredientInput.name = "ingredient-name-" + ingredientCount.toString();

    ingredientDiv.append(ingredientInput);

    // Div for the ammount input
    ammountDiv = document.createElement("div");
    ammountDiv.classList.add("col");

    ammountInput = document.createElement("input");
    ammountInput.type = "text";
    ammountInput.placeholder = "Ammount (example: 420 grams)";
    ammountInput.required = true;
    ammountInput.classList.add("form-control");
    ammountInput.name = "ingredient-ammount-" + ingredientCount.toString();

    ammountDiv.append(ammountInput);

    // Div for delete button
    deleteDiv = document.createElement("div");
    deleteDiv.classList.add("col-xs-1");
    deleteDiv.classList.add("mr-2");

    deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("btn");
    deleteBtn.classList.add("btn-danger");
    deleteBtn.id = "delete-" + ingredientCount.toString();
    deleteBtn.addEventListener("click", deleteIngredient);

    deleteDiv.append(deleteBtn);

    // Append everything to the main Row div
    ingredientRow.append(ingredientDiv);
    ingredientRow.append(ammountDiv);
    ingredientRow.append(deleteDiv);

    $('#ingredients').append(ingredientRow);
}