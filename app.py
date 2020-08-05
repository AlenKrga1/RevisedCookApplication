from flask import Flask, render_template, request, redirect, url_for
from bson.objectid import ObjectId
from flask_pymongo import PyMongo
import os
try:
	import env
except:
	pass

app = Flask(__name__)

app.config["MONGO_URI"] = os.environ.get('MONGO_URI')

mongo = PyMongo(app)

if __name__ == '__main__':
	app.debug = os.environ.get('DEBUG') == 'TRUE'
	app.run(host=os.environ.get('IP'),
            port=int(os.environ.get('PORT'))
        	)