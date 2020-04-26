var Atores = module.exports
const axios = require('axios')

function myNormalize(r){
    return r.results.bindings.map(o => {
        var novo = {}
        for (let [k, v] of Object.entries(o)) {
            novo[k] = v.value
          }
        return novo  
    })
}

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX c: <http://www.di.uminho.pt/prc2020/2020/2/cinema#>
`

var getLink = "http://localhost:7200/repositories/cinema2020" + "?query=" 


Atores.getLista = async function(){
    var query = `select ?a ?idAtor ?anome ?sexo where{
        ?a a c:Ator.
        ?a c:nome ?anome.
		optional{ ?a c:sexo ?sexo}.
		bind(strafter(str(?a), 'cinema#') as ?idAtor) .
    }
    order by ?anome ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

Atores.getFilmes = async function(idAtor){
    var query = `select ?idFilme ?filme where{
        c:${idAtor} a c:Ator.
        c:${idAtor} c:atuou ?f.
		?f c:título ?filme.
		bind(strafter(str(?f), 'cinema#') as ?idFilme) .
    }`   
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    }
}


Atores.getPersonagens = async function(idAtor){
    var query = `select ?p ?idPersonagem ?pnome where{
        c:${idAtor} a c:Ator.
        c:${idAtor} c:representa ?p.
		?p c:nome ?pnome.
		bind(strafter(str(?p), 'cinema#') as ?idPersonagem) .
    }` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    }
}

async function getAtorAtomica(idAtor){
    var query = `select ?anome ?sexo where {
        c:${idAtor} a c:Ator .
        c:${idAtor} c:nome ?anome .
        optional{ c:${idAtor} c:sexo ?sexo . }
    } ` 
    var encoded = encodeURIComponent(prefixes + query)
    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}
  
Atores.getAtor = async function(idAtor){
    try{
        var atomica = await getAtorAtomica(idAtor)
        var filmes = await Atores.getFilmes(idAtor)
        var personagens = await Atores.getPersonagens(idAtor)

        var ator = {
            info : atomica[0],          //campo: variavel
            filmes : filmes,
            personagens : personagens
        }
        return ator
    }
    catch(e){
        throw(e)
    }
}

