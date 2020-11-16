function loginAlert() {
  const email = document.querySelector('#user-email-phone').value;
  alert(email);
}

function showInvalidFieldsError() {
  const errorSpan = document.getElementById('signUp-error');
  errorSpan.innerHTML = 'Campos inválidos';
}

function hideInvalidFieldsError() {
  const errorSpan = document.getElementById('signUp-error');
  errorSpan.innerHTML = '';
}

function createTableInfo() {
  // recupera todos os valores
  const firstName = document.querySelector('.input-first-name').value;
  const lastName = document.querySelector('.input-last-name').value;
  const cellNumber = document.getElementById('cel_number').value;
  const birthday = document.querySelector('.birthdate').value;
  const valido = document.getElementsByName('gender');
  let gender;
  if (valido[0].checked) {
    gender = valido[0].value;
  } else if (valido[1].checked) {
    gender = valido[1].value;
  } else if (valido[2].checked) {
    gender = document.getElementById('gender-custom-id').value;
  }
  // recupera o pai para a gente add a nova rightcontent
  const pai = document.querySelector('.main-content');
  // apaga o lado direito inteiro de uma vez
  document.querySelector('.right-content').remove();
  // cria nova div e add no pai
  const div = document.createElement('div');
  div.className = 'right-content';
  pai.appendChild(div);
  // cria o novo paragrafo que é o resultado e add na div
  const paragraph = document.createElement('h1');
  div.appendChild(paragraph);
  paragraph.innerText = `Olá Sr.${firstName} ${lastName}.
  seu login é : ${cellNumber}.
  sua data de nascimento é : ${birthday}.
  e o genero selecionado foi : ${gender}`;
}

function validateInputs() {
  const formInputs = document.forms['signUp-form'].getElementsByTagName('input');
  let cont = 0;
  for (let index = 0; index < formInputs.length; index += 1) {
    const currentInput = formInputs[index];
    if (!currentInput.value) {
      showInvalidFieldsError();
      break;
    } else {
      hideInvalidFieldsError();
      cont += 1;
    }
  }
  if (cont === 8) {
    createTableInfo();
  }
}

function createCustomGenderField() {
  const customGenderField = document.createElement('input');
  customGenderField.name = 'gender-custom';
  customGenderField.placeholder = 'Gênero (opcional)';
  customGenderField.classList.add('gender');
  customGenderField.id = 'gender-custom-id';
  return customGenderField;
}

function handleCustomGender() {
  if (document.getElementById('custom').checked) {
    const customGenderField = createCustomGenderField();
    const signUpForm = document.getElementById('gender-selection');
    signUpForm.after(customGenderField);
  }
}

function delCustomGender() {
  if (document.getElementById('gender-custom-id')) {
    document.getElementById('gender-custom-id').remove();
  }
}

window.onload = function () {
  const loginBtn = document.querySelector('#button-login');
  loginBtn.addEventListener('click', loginAlert);

  const signUpBtn = document.getElementById('facebook-register');
  signUpBtn.addEventListener('click', function (event) {
    event.preventDefault();
    validateInputs();
  });

  const male = document.getElementById('male');
  const female = document.getElementById('female');
  const custom = document.getElementById('custom');
  male.addEventListener('click', delCustomGender);
  female.addEventListener('click', delCustomGender);
  custom.addEventListener('click', handleCustomGender);
};
