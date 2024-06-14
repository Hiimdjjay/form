const userName = document.querySelector('#username');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');
const email = document.querySelector('#email');
const clearButton = document.querySelector('.clear');
const submitButton = document.querySelector('.submit');
const msgStatus = document.querySelector('.msg-status');

const showError = (input, msg) => {
	const error = input.parentElement;
	const errorMsg = input.nextElementSibling;
	error.classList.add('error');
	errorMsg.textContent = `${msg}`;
};

const clearError = input => {
	const error = input.parentElement;
	error.classList.remove('error');
};

const checkForm = input => {
	input.forEach(el => {
		if (el.value == '') {
			showError(el, el.placeholder);
		} else {
			clearError(el);
		}
	});
};

const clearInput = input => {
	input.forEach(el => {
		el.value = '';
		clearError(el);
	});
};

const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(
			input,
			`${input.previousElementSibling.textContent.slice(
				0,
				-1
			)} musi się składać z ${min} znaków.`
		);
	}
};

const checkPassword = (pass1, pass2) => {
	if (pass1.value !== pass2.value) {
		showError(password2, 'Hasła muszą być takie same.');
	}
};

const checkEmail = email => {
	const re = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;

	if (re.test(email.value)) {
		clearError(email);
	} else {
		showError(email, 'E-mail jest niepoprawny');
	}
};

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.form-box');
	let errorCount = 0;

	allInputs.forEach(el => {
		if (el.classList.contains('error')) {
			errorCount++;
		}
	});

	if (errorCount === 0) {
		console.log('good');
	}
};

submitButton.addEventListener('click', e => {
	e.preventDefault();
	checkForm([userName, password, password2, email]);
	checkLength(userName, 3);
	checkLength(password, 6);
	checkPassword(password, password2);
	checkEmail(email);
	checkErrors();
});

clearButton.addEventListener('click', e => {
	e.preventDefault();
	clearInput([userName, password, password2, email]);
});

if (document.location.search === '?mail_status=sent') {
	msgStatus.classList.add('success');
	msgStatus.textContent = 'Wiadomość wysłana';

	setTimeout(() => {
		msgStatus.classList.remove('success');
		msgStatus.textContent = '';
	}, 5000);
}

if (document.location.search === '?mail_status=error') {
	msgStatus.classList.add('reject');
	msgStatus.textContent = 'Wiadomość nie została wysłana';

	setTimeout(() => {
		msgStatus.classList.remove('reject');
		msgStatus.textContent = '';
	}, 5000);
}

const form = document.querySelector('form');

if (form) {
	form.addEventListener('submit', e => {
		e.preventDefault();
		e.currentTarget.submit();
	});
}
