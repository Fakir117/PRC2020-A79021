var Personagens = module.exports
const axios = require('axios')

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX c: <http://www.di.uminho.pt/prc2020/2020/2/cinema#>
`

var getLink = "http://localhost:7200/repositories/cinema2020" + "?query=" 


Personagens.getLista = async function(req){
    var query = `select ?a ?nome where{
        ?a a c:Personagem.
        ?a c:nome ?nome.
    }
    `
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return response.data
    }
    catch(e){
        throw(e)
    } 
}

Personagens.info = async (id) =>{
    var query = `
    select distinct ?f ?filme ?a ?ator where{
        c:${id} c:nome ?nome;
                c:éPersonagemDe ?f;
                c:éRepresentadoPor ?a.
                ?a c:nome ?ator.
        ?f c:título ?filme.
    }
    order by ?f
    ` 
   var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return response.data
    }
    catch(e){
        throw(e)
    } 
}




/*var query = `select distinct ?p ?nome (GROUP_CONCAT(?a;separator=" ; ") as ?aid) 
    (GROUP_CONCAT(?ator;separator=" ; ") as ?atores) 
    (GROUP_CONCAT(?f;separator=" ; ") as ?fid) 
    (GROUP_CONCAT(?filme;separator=" ; ") as ?filmes) where {
        ?p rdf:type c:Personagem.
        ?p c:nome ?nome.
        ?p c:éPersonagemDe ?f.
        ?f c:título ?filme.
        ?p c:éRepresentadoPor ?a.
        ?a c:nome ?ator.
    }
    group by ?p ?nome`

   var query = `select distinct ?p ?nome ?a ?ator ?f ?filme where {
    ?p rdf:type c:Personagem.
    ?p c:nome ?nome.
    ?p c:éPersonagemDe ?f.
    ?f c:título ?filme.
    ?p c:éRepresentadoPor ?a.
    ?a c:nome ?ator.
}
`
*/