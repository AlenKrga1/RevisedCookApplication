
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

    ingredientRow.append(ingredientDiv);
    ingredientRow.append(ammountDiv);
    ingredientRow.append(deleteDiv);

    $('#ingredients').append(ingredientRow);
}