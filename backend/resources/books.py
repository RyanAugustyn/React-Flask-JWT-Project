
# Accepts a body object from the request in the form of a Review model. 
# Responds with the newly created Review object.  
# Returns a 201 status code.
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db
from database.schemas import review_schema


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

