var express = require('express');
var router = express.Router();
var axios = require('axios')

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInference: <http://www.ontotext.com/explicit#>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX amd: <http://www.semanticweb.org/diogosilva117/ontologies/2020/1/amd#>
`

var getLink = "http://localhost:7200/repositories/amd" + "?query="

var getObra = "http://localhost:7200/repositories/amd" + "?query1="

/* GET home page. */
router.get('/', function(req, res, next) {
  var query = `select ?tit (count(?part) as ?nparts) ?id where{
    ?id rdf:type amd:Obra.
    ?id amd:título ?tit.
    ?id amd:temPartitura ?part.
  }
  group by ?tit ?id
  order by ?tit`
  var encoded = encodeURIComponent(prefixes + query)
  axios.get(getLink + encoded)
    .then(dados => {
      //console.log(JSON.stringify(dados.data))
      var mydata = []
      mydata = dados.data.results.bindings.map(obra => {return {id: obra.id.value.split('#')[1],
                                                                tit: obra.tit.value,
                                                                nparts: obra.nparts.value}})
      //console.log(JSON.stringify(mydata))                                                      
      res.render('index', { obras: mydata})
    })
    .catch(erro => res.render('error', {error: erro}))
  
});

router.get('/obras/:id', (req, res) => {
  /*
  var query1 = `select * where{
    ?id rdf:type amd:Obra.
    ?id amd:éCompostaPor ?comp.
    ?id amd:temPartitura ?part.
    }`
  */
  //axios.get(req.params.id)
  //axios.get('http://localhost:7024/routes' + req.params.id)
  var encoded = encodeURIComponent(prefixes + query1)
  axios.get(getObra + encoded)
       .then(dados => {
        console.log(JSON.stringify(dados.data)) 
        var mydata = []
        mydata = dados.data.results.bindings.map(obra => {return {id: obra.id.value.split('#')[1],
                                                                  tit: obra.tit.value,
                                                                  comp: obra.comp.value,
                                                                  part: obra.part.value.split('#')[1]}})
        res.render('obras', {amd: mydata})})
       .catch(erro => {
           console.log('Erro na consulta do objecto: ' + erro)
           res.render('error', {error: erro, message: "Meu erro..."})
       })
});


module.exports = router;
