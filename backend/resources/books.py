
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db
from database.schemas import review_schema
from database.schemas import favorties_schema, favorite_schema, reviews_schema
from database.models import Favorite, Review, User


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
        user_favorites = Favorite.query.filter_by(user_id=user_id)
        return favorties_schema.dump(user_favorites), 200
    
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

class GetBookInformationResource(Resource):
    def get(self, book_id):
        custom_response = {}
        all_ratings = 0
        favorited = False

        #check for logged in user and favorite
        if verify_jwt_in_request(optional=True):
            user_id = get_jwt_identity()
            favorite = Favorite.query.filter_by(user_id = user_id, book_id = book_id)
            favorite_json = favorties_schema.dump(favorite)
            if(len(favorite_json) > 0):
                if favorite_json[0]["book_id"] == book_id:
                    favorited = True

        #get all reviews and calculate avg rating
        all_book_reviews = Review.query.filter_by(book_id = book_id)
        all_book_reviews_json = reviews_schema.dump(all_book_reviews)
        for review in all_book_reviews_json:
            all_ratings += review["rating"]
        if len(all_book_reviews_json) == 0:
            avg_rating = 0
        else:
            avg_rating = all_ratings/ len(all_book_reviews_json)

        custom_response = {
            "reviews": all_book_reviews_json, 
            "average rating": avg_rating,
            "favorited": favorited
        }

        return custom_response, 200

class ReviewDetailResource(Resource):
    @jwt_required()
    def put(self, review_id):
        try:
            verify_jwt_in_request()
            #user_id = get_jwt_identity()
            review = Review.query.get_or_404(review_id)

            if 'book_id' in request.json:
                review.book_id = request.json['book_id']
            if 'text' in request.json:
                review.text = request.json['text']
            if 'rating' in request.json:
                review.rating = request.json['rating']

            db.session.commit()
            return review_schema.dump(review), 200
        except:
            return "Unauthorized", 401

    @jwt_required()
    def delete(self, review_id):
        try:
            verify_jwt_in_request()
            #user_id = get_jwt_identity()
            review_from_db = Review.query.get_or_404(review_id)
            db.session.delete(review_from_db)
            db.session.commit()
            return '', 204    
        except:
            return "Unauthorized", 401