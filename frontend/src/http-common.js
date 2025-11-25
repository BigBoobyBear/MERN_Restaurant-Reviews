const http = {
  baseURL:
    "https://data.mongodb-api.com/app/restaurant-reviews-npunp/endpoint/",
  headers: { "Content-type": "application/json" },

  resParseJSON: (res) => res.json(),
};

export default http;
