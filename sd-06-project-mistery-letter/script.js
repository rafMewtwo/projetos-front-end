let estilo = ["newspaper", "magazine1", "magazine2"];
let tamanho = ["medium", "big", "reallybig"];
let rotacao = ["rotateleft", "rotateright"];
let inclinacao = ["sskewleft", "skewright"];
//recupera o texto de input
let textBox = document.getElementById("carta-texto")
//testar vazio
function nullTest(arrayString){
    let msg = ""
    if(arrayString[0]==""){
        return 0;
    }else{
        return 1;
    }
}
//esta função cria o texto paragrafo em baixo do input
function creatSpan(){
    let arrayString = textBox.value.split(" ") // cria uma array com as palavras do input
    //teste para saber se a array esta vazia ou nao
    if(nullTest(arrayString)===1){
    let paragraph = document.getElementById("carta-gerada") // recupera botao
    //laço for para criar uma span, atribuir ela um index da array e dps add como filho do paragrfo
        for (let i in arrayString){ 
            spanText = document.createElement("span")
            spanText.innerHTML = arrayString[i]
            classAdd(spanText);
            spanText = paragraph.appendChild(spanText)
        }
    }else{
        console.log(nullTest(arrayString));
    }
    contSpan(arrayString)
}
//funcao para randomizar as class e add
function classAdd(spanText){
    //randomiza as arrays das classes
    var currentEstilo = estilo[Math.floor(Math.random() * estilo.length)];
    var currentTamanho = tamanho[Math.floor(Math.random() * tamanho.length)];
    var currentRotacao = rotacao[Math.floor(Math.random() * rotacao.length)];
    var currentInclinacao = inclinacao[Math.floor(Math.random() * inclinacao.length)];
    //add as classes na span
    spanText.classList.add(currentEstilo)
    spanText.classList.add(currentTamanho)
    spanText.classList.add(currentRotacao)
    spanText.classList.add(currentInclinacao)
    return spanText;
}
//removedor de classes
function classDel(spanText){
    //nao consegui remover a classe com elemento.className = ""
        for(let i in estilo){
            spanText.classList.remove(estilo[i])
        }
        for(let i in tamanho){
            spanText.classList.remove(tamanho[i])
        }
        for(let i in rotacao){
            spanText.classList.remove(rotacao[i])
        }
        for(let i in inclinacao){
            spanText.classList.remove(inclinacao[i])
        }
    console.log("CLASSES REMOVIDAS") //baby steps
}
function eventClickSpan(event){
   // let currentSelectText = document.getElementById("rgb-color")
    let currentClickSpan = event.target;
    classDel(currentClickSpan);
    classAdd(currentClickSpan);
    console.log("OBJETO REESTILIZADO"); //baby steps
}
//contar palavras e preencher no paragrafo
function contSpan(arrayString) {
    let contador = document.getElementById("carta-contador")
    if(nullTest(arrayString)===1){
        return contador.innerHTML =  "Seu texto possui : "+arrayString.length+" palavras!";
    }else{
        return contador.innerHTML =  "Por favor, digite o conteúdo da carta";
    }
}
//recupera botao
let buttonLetter = document.getElementById("criar-carta")
//add evento no botao de gerar carta
buttonLetter.addEventListener("click", creatSpan)
//evento target para o click nas palavras
let buttonSpan = document.getElementById("carta-gerada")
buttonSpan.addEventListener("click", eventClickSpan);
