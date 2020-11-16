window.onload = function() {

    let caixaTexto = document.querySelector("#text-input")
    

    caixaTexto.addEventListener("keyup", function(){
        document.querySelector("#meme-text").innerHTML = caixaTexto.value
    })

    // let buttonImg = document.querySelector("#meme-insert")
    // let caixaImg = document.querySelector("#meme-image")
    // buttonImg.addEventListener("input", function(){
    //     caixaImg.style.backgroundImage = url(buttonImg.value)e
    //     //document.getElementById("meme-image").src = caixaImg.files[0].name
    //     console.log(buttonImg.value)
    // })





}