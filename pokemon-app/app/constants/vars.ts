export const API_URLS: {
    [x: string]: string;
} = {
   GET_POKEMON :"pokemon?page=:page",
   GET_TYPES : "type",
   GET_POKEMON_BY_TYPE : "type/:typeName?page=:page",
   GET_DETAILS: "pokemon/:id"
}