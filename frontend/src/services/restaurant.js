import http from "../http-common.js";

export default class RestaurantDataService {
  static async getAll(next = () => {}, page = 0) {
    return await fetch(`${http.baseURL}restaurants?page=${page}`)
      .then(http.resParseJSON)
      .then(next)
      .catch((e) => console.log(e));
  }

  static async get(id, next = () => {}) {
    return await fetch(`${http.baseURL}restaurant?id=${id}`)
      .then(http.resParseJSON)
      .then(next)
      .catch((e) => console.log(e));
  }

  static async find(query, next = () => {}, by = "name", page = 0) {
    return await fetch(`${http.baseURL}restaurants?${by}=${query}&page=${page}`)
      .then(http.resParseJSON)
      .then(next)
      .catch((e) => console.log(e));
  }

  static async createReview(data, next = () => {}) {
    return await fetch(`${http.baseURL}review/new`, {
      method: "POST",
      headers: http.headers,
      body: JSON.stringify(data),
    })
      .then(http.resParseJSON)
      .then(next)
      .catch((e) => console.log(e));
  }

  static async updateReview(data, next = () => {}) {
    return await fetch(`${http.baseURL}review/edit`, {
      method: "PUT",
      headers: http.headers,
      body: JSON.stringify(data),
    })
      .then(http.resParseJSON)
      .then(next)
      .catch((e) => console.log(e));
  }

  static async deleteReview(id, userId, next = () => {}) {
    return await fetch(`${http.baseURL}review/delete?id=${id}`, {
      method: "DELETE",
      headers: http.headers,
      body: JSON.stringify({ user_id: userId }),
    })
      .then(http.resParseJSON)
      .then(next)
      .catch((e) => console.log(e));
  }

  static async getCuisines(next = () => {}) {
    return await fetch(`${http.baseURL}cuisines`)
      .then(http.resParseJSON)
      .then(next)
      .catch((e) => console.log(e));
  }
}
