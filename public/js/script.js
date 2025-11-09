// Form Validation
document.getElementById('contactForm').onsubmit = () => {
    
    // Clears errors
    clearErrors();

    // Determines whether form will submit or not
    let isValid = true;

    // Checks if fname is filled. Displays error and prevents form submission if empty
	let fname = document.getElementById('fname').value.trim();
	if (!fname) {
		document.getElementById('err-fname').style.display = "block";
		isValid = false;
	}

    // Checks if lname is filled. Displays error and prevents form submission if empty
	let lname = document.getElementById('lname').value.trim();
	if (!lname) {
		document.getElementById('err-lname').style.display = "block";
		isValid = false;
	}

    let linkedin = document.getElementById('linkedin').value.trim();
    if (linkedin.length > 0 && !linkedin.includes("https://linkedin.com/in/")) {
        document.getElementById('err-linkedin').style.display = "block";
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

    // Checks if a valid selection is picked from meet dropdown. Displays error and prevents form submission if
    // set to default
    let meet = document.getElementById('meet').value;
    if (meet == "default") {
        document.getElementById('err-meet').style.display = "block";
		isValid = false;
    }

    let format = document.querySelector('input[name="method"]:checked');
    if (mail.checked && !format) {
        document.getElementById('err-format').style.display = "block";
		isValid = false;
    }

    // Submits form if all conditions have been met
    return isValid;
}

document.getElementById('meet').addEventListener('change', function() {
    if (this.value == "other") {
        document.getElementById('other-text').style.display = "flex";
    } else {
        document.getElementById('other-text').style.display = "none";
    }
});

document.getElementById('mailing').addEventListener('change', function() {
    if (this.checked) {
        document.querySelector('section').style.display = "flex";
    } else {
        document.querySelector('section').style.display = "none";
        document.getElementById('err-format').style.display = "none";
    }
});

// Hides all error messages
function clearErrors() {
	let errors = document.getElementsByClassName('error');
	for (let i = 0; i < errors.length; i++) {
		errors[i].style.display = "none";
	}
}