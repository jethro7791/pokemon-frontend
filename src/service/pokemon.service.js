import http from "../http-common";

class PokemonDataService {
  getAll() {
    return http.get("/pokemons");
  }

  get(id) {
    return http.get(`/pokemons/${id}`);
  }

  create(data) {
    return http.post("/pokemons", data);
  }

  update(id, data) {
    return http.put(`/pokemons/${id}`, data);
  }

  delete(id) {
    return http.delete(`/pokemons/${id}`);
  }

  deleteAll() {
    return http.delete(`/pokemons`);
  }

}

export default new PokemonDataService();