from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Car
from database.schemas import car_schema, cars_schema
from database.models import Favorite

class AllReviewsResource(Resource):
    def get(self):
        reviews = Favorite.query.all()
        




    def get(self):
        cars = Car.query.all()
        make = request.args.get('make')
        if make:
            cars = Car.query.filter_by(make=make)
        return cars_schema.dump(cars), 200