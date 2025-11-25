import RestaurantDataService from "../services/restaurant.js";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Restaurant({ user }) {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(initialRestaurantState);

  useEffect(() => {
    getRestaurant(id);
  }, [id]);

  const getRestaurant = async (id) => {
    await RestaurantDataService.get(id, (data) => {
      setRestaurant(data);
      console.log(data);
    });
  };

  const deleteReview = (reviewId, idx) => {
    RestaurantDataService.deleteReview(reviewId, user.id, (data) => {
      setRestaurant((prev) => {
        prev.reviews.splice(idx, 1);
        return { ...prev };
      });
    });
  };

  return (
    <div>
      {restaurant ? (
        <div>
          <h5>{restaurant.name}</h5>
          <p>
            <strong>Cuisine: </strong>
            {restaurant.cuisine}
            <br />
            <strong>Address: </strong>
            {restaurant.address.building} {restaurant.address.street},{" "}
            {restaurant.address.zipcode}
          </p>
          <Link
            to={"/restaurants/" + id + "/review"}
            className="btn btn-primary mb-3"
          >
            Add Review
          </Link>
          <h4> Reviews </h4>
          <div className="row">
            {restaurant.reviews.length > 0 ? (
              restaurant.reviews.map((review, index) => {
                return (
                  <div className="col-lg-4 pb-1" key={index}>
                    <div className="card">
                      <div className="card-body">
                        <p className="card-text">
                          {review.text}
                          <br />
                          <strong>User: </strong>
                          {review.name}
                          <br />
                          <strong>Date: </strong>
                          {review.date}
                        </p>
                        {user && user.id === review.user_id && (
                          <div className="row">
                            <button
                              onClick={() => deleteReview(review._id, index)}
                              className="btn btn-primary col-lg-5 mx-1 mb-1"
                            >
                              Delete
                            </button>
                            <Link
                              to={"/restaurants/" + id + "/review"}
                              state={{
                                currentReview: review,
                              }}
                              className="btn btn-primary col-lg-5 mx-1 mb-1"
                            >
                              Edit
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-sm-4">
                <p>No reviews yet.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <br />
          <p>No restaurant selected.</p>
        </div>
      )}
    </div>
  );
}

export default Restaurant;

const initialRestaurantState = {
  id: null,
  name: "",
  address: {},
  cuisine: "",
  reviews: [],
};
