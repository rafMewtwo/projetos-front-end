// Desafio 1
function compareTrue(a, b) {
  // seu código aqui
  let result = false;
  if(a===true && b===true){
    result = true;
  }else{
    result = false;
  }
  return result;
}

// Desafio 2
function calcArea(base, height) {
  // seu código aqui
  let area = (base * height)/2;
  return area;

}

// Desafio 3
function splitSentence(string) {
  // seu código aqui
  let array = [];
  let save = "";
  for(let cont=0;cont<string.length;cont++){
    if(string[cont]===" " || cont==string.length-1){
      if(cont==string.length-1){
        save += string[cont];
        array.push(save);
        save = "";
      }else {
        array.push(save);
        save = "";
      }
    }
    else{
      save += string[cont];
    }
  }
  return array;
}
console.log(splitSentence("go trybe"));

// Desafio 4
function concatName(array) {
  // seu código aqui
  let string = "";
  let ending = "";
  let begin = "";
  for(let i in array){
    if(i==0){
      ending = array[i];
    }else if(i==array.length-1){
      begin = array[i];
    }
  }
  string = begin;
  string += ", "+ending;
  return string;

}
console.log(concatName(['Lucas', 'Cassiano', 'Ferraz', 'Paolillo']));

// Desafio 5
function footballPoints(wins, ties) {
  let pontos = (wins * 3) + ties;
  return pontos;
  // seu código aqui
}
console.log(footballPoints(5,1));

// Desafio 6
function highestCount(array) {
  // seu código aqui
  let n = 1;
  let numero = 1;
    for (let i in array){
        if(array[i]>array[n]){
            n = i;
            numero = array[i];
        }else if (array[i]===array[n]){
          n = i;
          numero = array[i];
        }
    }
    n = 0;
    for (let i in array){
      if(array[i]===numero){
        n++;
      }
    }
    return n;
}

console.log(highestCount([0,0,0]));

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  // seu código aqui
  let dist_m_c1 = mouse - cat1;
  let dist_m_c2 = mouse - cat2;
  let result = "";
  if (dist_m_c1+dist_m_c2==0){
    result = "os gatos trombam e o rato foge";
  }else {
  if ( dist_m_c1>dist_m_c2){
    result = "cat1"
  } else if (dist_m_c1===dist_m_c2){
    result = "os gatos trombam e o rato foge";
  } else {
    result = "cat2"
  }
  }
  return result;
}
console.log(catAndMouse(1,0,2));

// Desafio 8
function fizzBuzz(array) {
  // seu código aqui
  let result = [];
  for(let i in array){
    if (array[i]%3===0 && array[i]%5===0){
        result.push("fizzBuzz");
      }else if(array[i]%3===0) {
        result.push("fizz");
      }else if(array[i]%5===0){
      result.push("buzz");
    } else {
      result.push("bug!");
    }
  }
  return result;
}
console.log(fizzBuzz([2, 15, 7, 9, 45]));

// Desafio 9
function encode(string) {
  // seu código aqui
  let result = string.replace(/a/g,1);
  result = result.replace(/e/g,2);
  result = result.replace(/i/g,3);
  result = result.replace(/o/g,4);
  result = result.replace(/u/g,5);
  return result;
}
console.log(encode("hi there!"));

function decode(string) {
  // seu código aqui
  let result = string.replace(/1/g,"a");
  result = result.replace(/2/g,"e");
  result = result.replace(/3/g,"i");
  result = result.replace(/4/g,"o");
  result = result.replace(/5/g,"u");
  return result;
}
console.log(decode("h3 th2r2!"));

// Desafio 10
function techList(array, name) {
  // seu código aqui
  if (array == '') {
    return 'Vazio!';
  } else {
    let string = [];
    array = array.sort();
    for (let i = 0; i < array.length; i += 1) {
      string[i] = {
        tech: array[i],
        name: name,
      };
    }
    return string;
  }
}

console.log(techList(["React", "Jest", "HTML", "CSS", "JavaScript"], "Lucas"));

// Desafio 11
function generatePhoneNumber(array) {
  // seu código aqui
let n = 0;
let string = "";
let marcador = 0;
let marcador2 = 0;
let m1 = 0;
for (let i in array){
    n++;
}
if (n!=11){
    string = "Array com tamanho incorreto.";
    marcador = 1;
}else if(marcador === 1){
    string = "Array com tamanho incorreto.";
}else {
    for (let k in array){
        m1=0;
        for(let j in array){
          if(array[k]===array[j]){
              m1++;
          } 
        }
      if(array[k]<0 || array[k]>9 || m1>=3){
        string = "não é possível gerar um número de telefone com esses valores";
        marcador2 = 1;
      }
      }
}
if (marcador==1 || marcador2==1){

}else {
    string ="(";
for(let cont=0;cont<2;cont++){
  string += array[cont];
}
string += ") "
for(let cont=2;cont<7;cont++){
  string += array[cont];
}
string += "-";
for(let cont=7;cont<11;cont++){
  string += array[cont];
}
}
return string;
}

console.log(generatePhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1]));

// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  // seu código aqui
  let result = false;
  if(lineA>lineB+lineC){
    result = false;
  }else if(lineB>lineA+lineC){
    result = false;
  }else if (lineC>lineA+lineB){
    result = false;
  }else {
    result = true;
  }
  return result;
}
console.log(triangleCheck(10,14,8));


// Desafio 13
function hydrate(string) {
  // seu código aqui
  let n = "";
  let m = string.match(/\d+/g);
  let r = 0;
      for(let i in m){
        r += parseInt(m[i]);
      }
      if(r>1){
        n = r + " copos de água";
      }else{
        n = r + " copo de água";
      }
  
  return n;
}
console.log(hydrate("1 cachaça, 5 cervejas e 1 copo de vinho"));


module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  generatePhoneNumber,
  techList,
  highestCount,
  hydrate,
  splitSentence,
  triangleCheck,
}
