from flask import Flask, render_template, request, redirect, url_for
from bson.objectid import ObjectId
from flask_pymongo import PyMongo
from datetime import datetime
import pymongo
import os

# Import local environment vars
try:
	import env
except:
	pass

app = Flask(__name__)

# Configure MongoDB
app.config["MONGO_URI"] = os.environ.get('MONGO_URI')
mongo = PyMongo(app)

@app.route('/')
def index():
	# Gets the search param if it exists
	search = request.args.get('search')
	search = search if search != None else ''
	# Queries the recipes with the search param and sorts them by the date
	recipes = mongo.db.recipes.find({'name': {'$regex': search, '$options': 'i'}}).sort('date', pymongo.DESCENDING)
	return render_template('home.html', recipes = recipes)

@app.route('/contact-us/')
def contact_us():
	return render_template('contactus.html')


@app.route("/uploads/<path:filename>")
def get_file(filename):
	return mongo.send_file(filename)


# Get a specific recipe and its details
@app.route("/recipes/<recipe_id>")
def recipe_details(recipe_id):
	recipe = mongo.db.recipes.find_one({'_id': ObjectId(recipe_id)})
	return render_template('recipedetails.html', recipe = recipe)


# Add a new recipe
@app.route('/recipes/addrecipe/', methods=['GET', 'POST'])
def addrecipe():
	if request.method == 'POST':
		# Get all ingredient fields
		ingredient_names = [ v for k,v in request.values.items() if 'ingredient-name' in k]
		ingredient_ammounts = [ v for k,v in request.values.items() if 'ingredient-ammount' in k]

		ingredients = []
		for i in range(len(ingredient_names)):
			# Forms the 'ingredients' array, removing empty ones
			if ingredient_names[i] != '' and ingredient_ammounts[i] != '':
				ingredients.append({'name': ingredient_names[i], 'ammount': ingredient_ammounts[i]})

		# saves the image
		filename = request.files['image'].filename
		image = mongo.save_file(filename, request.files['image'])
		# Inserts the recipe
		mongo.db.recipes.insert_one({
			'name': request.values.get('name'),
			'description': request.values.get('description'),
			'ingredients': ingredients,
			'instructions': request.values.get('instructions'),
			'image': filename,
			'date': datetime.now()
		})

		# redirect to homepage
		return redirect(url_for('index'))

	# Used for rendering an empty form for adding a new recipe
	recipe = {
		'name': '',
		'description': '',
		'ingredients': [],
		'instructions': '',
		'image': ''
	}

	return render_template('addeditrecipe.html', recipe = recipe, edit = False)


@app.route("/recipes/editrecipe/<recipe_id>", methods=['GET', 'POST'])
def edit_recipe(recipe_id):
	if request.method == 'POST':
		# Get all ingredient fields
		ingredient_names = [ v for k,v in request.values.items() if 'ingredient-name' in k]
		ingredient_ammounts = [ v for k,v in request.values.items() if 'ingredient-ammount' in k]

		ingredients = []
		for i in range(len(ingredient_names)):
			# Forms the 'ingredients' array, removing empty ones
			if ingredient_names[i] != '' and ingredient_ammounts[i] != '':
				ingredients.append({'name': ingredient_names[i], 'ammount': ingredient_ammounts[i]})

		update = {
			'name': request.values.get('name'),
			'description': request.values.get('description'),
			'ingredients': ingredients,
			'instructions': request.values.get('instructions'),
		}

		
		# Checks if the image was edited
		if request.files['image'].filename != '':
			filename = request.files['image'].filename
			image = mongo.save_file(filename, request.files['image'])
			update['image'] = filename


		# updates the document
		mongo.db.recipes.update_one({'_id': ObjectId(recipe_id)}, { "$set": update })

		return redirect(url_for('recipe_details', recipe_id=recipe_id))

	# recipe to edit (used to fill in the edit form)
	recipe = mongo.db.recipes.find_one({'_id': ObjectId(recipe_id)})
	return render_template('addeditrecipe.html', recipe = recipe, edit = True)


# Deletes the recipe with the specified id
@app.route("/recipes/deleterecipe/<recipe_id>")
def delete_recipe(recipe_id):
	mongo.db.recipes.delete_one({'_id': ObjectId(recipe_id)})
	return redirect(url_for('index'))


if __name__ == '__main__':
	# App config
	app.debug = os.environ.get('DEBUG') == 'TRUE'
	app.run(
		host=os.environ.get('IP'),
		port=int(os.environ.get('PORT'))
	)