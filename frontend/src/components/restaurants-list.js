import RestaurantDataService from "../services/restaurant.js";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function RestaurantsList() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);

  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  const retrieveRestaurants = async () => {
    await RestaurantDataService.getAll((data) => {
      console.log(data);
      setRestaurants(data.restaurants);
    });
  };

  const retrieveCuisines = async () => {
    await RestaurantDataService.getCuisines((data) => {
      console.log(data);
      setCuisines(["All Cuisines"].concat(data));
    });
  };

  const refreshList = () => retrieveRestaurants();

  const find = async (query, by) => {
    await RestaurantDataService.find(
      query,
      (data) => {
        console.log(data);
        setRestaurants(data.restaurants);
      },
      by
    );
  };

  const findByName = () => {
    setSearchZip("");
    setSearchCuisine("");
    retrieveCuisines();

    find(searchName, "name");
  };
  const findByZip = () => {
    setSearchName("");
    setSearchCuisine("");
    retrieveCuisines();

    find(searchZip, "zipcode");
  };
  const findByCuisine = () => {
    setSearchName("");
    setSearchZip("");

    if (searchCuisine === "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine");
    }
  };

  const onChangeSearchName = (e) => setSearchName(e.target.value);
  const onChangeSearchZip = (e) => setSearchZip(e.target.value);
  const onChangeSearchCuisine = (e) => setSearchCuisine(e.target.value);

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by zip"
            value={searchZip}
            onChange={onChangeSearchZip}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByZip}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">
          <select onChange={onChangeSearchCuisine}>
            {cuisines.map((cuisine, idx) => {
              return (
                <option key={idx} value={cuisine}>
                  {cuisine.substr(0, 20)}
                </option>
              );
            })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCuisine}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        {restaurants.map((restaurant, idx) => {
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (
            <div key={idx} className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine: </strong>
                    {restaurant.cuisine}
                    <br />
                    <strong>Address: </strong>
                    {address}
                  </p>
                  <div className="row">
                    <Link
                      to={"/restaurants/" + restaurant._id}
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                    >
                      View Reviews
                    </Link>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={"https://www.google.com/maps/place/" + address}
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                    >
                      View Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RestaurantsList;
