window.onload = function(){

createColorPallet(['black', 'red', 'blue', 'green']);

function createColorPallet(colors){
    //recupera a pallet
    let colorPaletContainer = document.getElementById("color-palette")
    //add as cores
    for (let index in colors){
        let palletItemDiv = createPalletItem(colors[index]);
        colorPaletContainer.appendChild(palletItemDiv);

    }

}
//criar as divs p cada array add no array de cores
function createPalletItem(color){
    let palletItemDiv = document.createElement('div');
    palletItemDiv.style.backgroundColor = color;
    palletItemDiv.className = "pallet-item";
    palletItemDiv.classList.add("color")
    palletItemDiv.addEventListener("click", handlePalletItemEvent);

    // palletItemDiv.addEventListener("click", function(event){

    // })
    if (color ==="black"){
        palletItemDiv.classList.add("selected")
    }
    return palletItemDiv;

}

function handlePalletItemEvent(event){
    let oldSelectedDiv = document.querySelector(".selected")
    let currentSelectedDiv = event.target;

    oldSelectedDiv.classList.remove("selected")
    currentSelectedDiv.classList.add("selected")


}

let elements = document.getElementsByClassName("pixel");
        for (var i = 0; i <elements.length;i++){
            elements[i].onclick = function(){
                this.style.backgroundColor = document.querySelector(".selected").style.backgroundColor
            };
        }

    let buttonCLear = document.getElementById("clear-board")
    buttonCLear.addEventListener("click", clearBoard)


   function clearBoard(){
        let div = document.getElementsByClassName("pixel")
        for(let i =0; i<25;i++){
            div[i].style.backgroundColor = "white"

       }
    }




    
}