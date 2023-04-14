
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db
from database.schemas import review_schema
from database.schemas import favorties_schema, favorite_schema
from database.models import Favorite


class UserReviewsResource(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        form_data["user_id"] = int(user_id)
        review = review_schema.load(form_data)
        
        db.session.add(review)
        db.session.commit()
        return review_schema.dump(review), 201


  
class FavoriteResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user_reviews = Favorite.query.filter_by(user_id=user_id)
        return favorties_schema.dump(user_reviews), 200
    
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        form_data["user_id"] = user_id
        favorite = favorite_schema.load(form_data)
        favorite.user_id = user_id
        db.session.add(favorite)
        db.session.commit()
        return favorite_schema.dump(favorite), 201
