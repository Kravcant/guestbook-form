// Form Validation
document.getElementById('contactForm').onsubmit = () => {
    
    // Clears errors
    clearErrors();

    // Determines whether form will submit or not
    let isValid = true;

    // Checks if fname is filled. Displays error and prevents form submission is empty
	let fname = document.getElementById('fname').value.trim();
	if (!fname) {
		document.getElementById('err-fname').style.display = "block";
		isValid = false;
	}

    // Checks if lname is filled. Displays error and prevents form submission is empty
	let lname = document.getElementById('lname').value.trim();
	if (!lname) {
		document.getElementById('err-lname').style.display = "block";
		isValid = false;
	}

    // Checks if email is filled and has correct syntax. Displays error and prevent form submission if email is
    // empty while mailing checkbox is checked, or if the email address does not contain a '@' or '.'
    let email = document.getElementById('email').value.trim();
    let mail = document.getElementById('mailing');
	if (mail.checked && !email) {
		document.getElementById('err-email').style.display = "block";
		isValid = false;
	} else if (email.length > 0 && (email.indexOf("@") === -1 || email.indexOf(".") === -1)) {
        document.getElementById('err-email-syntax').style.display = "block";
		isValid = false;
    }

    // Submits form if all conditions have been met
    return isValid;
}

// Hides all error messages
function clearErrors() {
	let errors = document.getElementsByClassName('error');
	for (let i = 0; i < errors.length; i++) {
		errors[i].style.display = "none";
	}
}