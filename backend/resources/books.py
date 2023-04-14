
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db
from database.schemas import review_schema
from database.schemas import favorties_schema, favorite_schema
from database.models import Favorite, Review, User


class UserReviewsResource(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        review = review_schema.load(form_data)
        review.user_id = user_id
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
        favorite = favorite_schema.load(form_data)
        favorite.user_id = user_id
        db.session.add(favorite)
        db.session.commit()
        return favorite_schema.dump(new_favorite), 201



class GetBookInformationResource(Resource):
    def get(self, book_id):
        custom_response = {}
        all_ratings = 0
        favorited = False

        #check for logged in user and favorite
        if verify_jwt_in_request():
            user_id = get_jwt_identity()
            favorite = Favorite.query.filter_by(user_id = user_id)
            if favorite.book_id == book_id:
                favorited = True

        #get all reviews and calculate avg rating
        all_book_reviews = Review.query.filter_by(book_id = book_id)
        for review in all_book_reviews:
            all_ratings += review.rating          
        avg_rating = all_ratings/ all_book_reviews.length()

        custom_response = {
            "reviews": review_schema.dump(all_book_reviews), 
            "average rating": avg_rating,
            "favorited": favorited
        }

        return custom_response, 200

