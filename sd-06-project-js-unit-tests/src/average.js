/*
  A função average recebe um array (tamanho variável) e retorna a média dos valores recebidos.
  Caso a função receba algum valor não númerico ou um array vazio,
  o valor undefined deve ser retornado.
  Todos os resultados devem ser arredondados para valores inteiros. Ex: 4,6 vira 5; 1,3 vira 1.

  Parâmetros:
    - Um array. Exemplos: [1, 2]; [1, 2, 3, 4, 5]; [1, 2, '3']; [];
  Comportamento:
    - average([2, 2]) // Retorno: 2;
    - average([1, 2]) // Retorno: 1;
    - average([1, '2']) // Retorno: undefined;
*/

const average = (array) => {
  let soma = 0;
  // tst para saber se esta vazio
  if (array.length === 0) {
    return undefined;
  }
  // for para caminhar na array
  for (let i = 0; i < array.length; i += 1) {
    // teste para encontrar um valor nao numerico
    if (typeof array[i] !== 'number') {
      return undefined;
    }
      // acumular tudo em soma
    soma += array[i];
  }
  // tira a media
  soma /= array.length;
  // passa p/ int
  return Math.round(soma);
};
console.log(average([-3, -3, -4, -5, -4]));

module.exports = average;
