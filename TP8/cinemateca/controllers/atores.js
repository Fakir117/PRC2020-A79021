var Atores = module.exports
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


Atores.getLista = async function(req){
    var query = `select ?a ?anome ?sexo where{
        ?a a c:Ator.
        ?a c:nome ?anome.
        ?a c:sexo ?sexo.
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

Atores.info = async (id) =>{
    var query = `select distinct ?f ?filme where{
        c:${id} c:nome ?nome;
                c:sexo ?sexo;
                c:atuou ?f.
        ?f c:título ?filme.
    }
    order by ?f
    ` 
   var encoded = encodeURIComponent(prefixes + query)
    try{
        var response = await axios.get(getLink + encoded)
        return (response.data)
    }
    catch(e){
        throw(e)
    } 
}


/*
    select distinct ?f ?filme where{
        ?a a c:Ator.
        ?a c:nome "${id}".
        ?a c:sexo ?sexo.
        ?a c:atuou ?f.
        ?f c:título ?filme.
    }
    select distinct ?a ?f ?filme ?p where{
    ?a a c:Ator.
    ?a c:nome "Jason Statham".
    ?a c:sexo ?sexo.
    ?a c:atuou ?f.
    ?f c:título ?filme.
    optional{
    	?p a c:Personagem.
    	?p c:éRepresentadoPor ?a.
    }
    }
    select ?a ?sexo (group_concat(?f;separator=" ; ") as ?fid) (group_concat(?filme;separator=" | ") as ?filmes) where{
    ?a a c:Ator.
    ?a c:nome "Jason Statham".
    ?a c:sexo ?sexo.
    ?a c:atuou ?f.
    ?f c:título ?filme.
    }

    group by ?a ?anome ?sexo
    */
