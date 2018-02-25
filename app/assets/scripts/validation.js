// Fields that need validation
var form = document.getElementById('form'),
    fullNameField = form.fullName,
    emailField = form.email,
    emailField2 = form.email2,
    passwordField = form.password1,
    phoneField = form.phone1,
    addressField = form.address;

// Button that submits the form when clicked
var submitButton = document.getElementById('submitButton');

// A validation run for full name triggered on blur
fullNameField.addEventListener('blur', function() {
    
    var errorSpan = document.getElementById('fullNameError');
    
    fullNameValidation = new Validation('ονοματεπώνυμο', fullNameField.value, {
        required: true,
        minLength: 5,
        maxLength: 30,
        regex: /[A-Z]/
    });
    
    errorSpan.innerHTML = fullNameValidation.validate();
});

// A validation run for email triggered on blur 
emailField.addEventListener('blur', function() {
   
    var errorSpan = document.getElementById('emailError');
    
    emailValidation = new Validation('e-mail', emailField.value, {
        required: true,
        regex: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    });
    
    errorSpan.innerHTML = emailValidation.validate();
});

// A validation that checks the previous email if it is the same
emailField2.addEventListener('blur', function() {
    
    var errorSpan = document.getElementById('email2Error');
    
    emailField = form.email;
    emailField2 = form.email2;
    
    if(emailField2.value != emailField.value) {
        
        errorSpan.innerHTML = 'Το πεδίο δεν ταιριάζει με το πεδίο e-mail που πληκτρολογήσατε παραπάνω.';
    } else {
        
        errorSpan.innerHTML = '';
    }
});

// A validation run for password triggered on blur
passwordField.addEventListener('blur', function () {

    var errorSpan = document.getElementById('password1Error');

    passwordValidation = new Validation('κωδικός πρόσβασης', passwordField.value, {
        required: true,
        minLength: 8,
        maxLength: 30
    });

    errorSpan.innerHTML = passwordValidation.validate();
});


// A validation run for phone1 triggered on blur 
phoneField.addEventListener('blur', function() {
   
    var errorSpan = document.getElementById('phoneError');
    
    phoneValidation = new Validation('τηλέφωνο', phoneField.value, {
        required: true,
        maxLength: 13,
        regex: /^\d{3}\d{7}$/
    });
    
    errorSpan.innerHTML = phoneValidation.validate();
});

// A validation run for address triggered on blur 
addressField.addEventListener('blur', function() {
   
    var errorSpan = document.getElementById('addressError');
    
    addressFieldValidation = new Validation('διεύθυνση', addressField.value, {
        required: true,
        minLength: 5,
        maxLength: 30,
    regex: /^(?=.*[A-Za-z])(?=.*\s)(?=.*\d)/ 
    });
    
    errorSpan.innerHTML = addressFieldValidation.validate();
});

submitButton.addEventListener('click', function() {
    formErrors = new Array();
    fieldsRequired = [
        fullNameValidation = new Validation('Ονοματεπώνυμο', fullNameField.value, {required: true, maxLength: 30}),
        emailValidation = new Validation('E-mail', emailField.value, {required: true, regex: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/}),
        phoneValidation = new Validation('τηλέφωνο', phoneField.value, {required: true, maxLength: 13, regex: /^\d{3}\d{7}$/}),
        addressFieldValidation = new Validation('διεύθυνση', addressField.value, {required: true, minLength: 5, maxLength: 30})
    ];
    
    for(i = 0; i < fieldsRequired.length; i++) {
        
        formErrors.push(fieldsRequired[i].validate());
    }
    
    for(var error in formErrors) {
        
        if(formErrors[error].length < 1) {
            
            console.log('Success');
        } else {
            
            console.log(formErrors[error]);
        }
    }
});


// Validation object that validates a field based on some validation rules
function Validation (validationField, validationFieldValue, validationRules = {required: false, minLength: null, maxLength: null, regex: null, passwordStrength: false}) {
    
    this.field = validationField;
    this.fieldValue = validationFieldValue;
    this.rules = validationRules;
    this.messages = {
        
        requiredMessage : 'Το πεδίο ' + this.field + ' δεν μπορεί να είναι κενό.',
        minLengthMessage : 'Για το πεδίο ' + this.field + ' απαιτούνται τουλάχιστον ' + this.rules.minLength + ' χαρακτήρες.',
        maxLengthMessage : 'Το πεδίο ' + this.field + ' δεν μπορεί να υπερβαίνει τους ' + this.rules.maxLength + ' χαρακτήρες.',
        regexMessage : 'Εισάγετε μία έγκυρη μορφή για το πεδίο ' + this.field + '.'
    }
    
    
    this.validate = function () {
        
        var error = '';
        
        if(this.rules.required == true && this.fieldValue.trim() == '') {
            
            error = this.messages.requiredMessage; 
        } else if (this.rules.minLength != null && this.fieldValue.length < this.rules.minLength) {
            
            error = this.messages.minLengthMessage;
        } else if (this.rules.maxLength != null && this.fieldValue.length > this.rules.maxLength) {
            
            error = this.messages.maxLengthMessage;
        } else if (this.rules.regex != null && this.fieldValue != '') {
            
            if(!this.rules.regex.test(this.fieldValue)) {
                
              error = this.messages.regexMessage;  
            }
        }
              
        return error;
    
    }

    this.checkPasswordStrength = function() {

        if(this.rules.passwordStrength == true) {

            var tests = {
                medium: /^(?=.*[A-Za-z])(?=.*\d)/,
                high: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])/,
                perfect: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])/
            }

            if (tests.perfect.test(this.fieldValue)) {
                console.log('perfect');
            } else if (tests.high.test(this.fieldValue)) {
                console.log('high');
            } else if (tests.medium.test(this.fieldValue)) {
                console.log('medium');
            } else {
                console.log('weak');
            }
        }
    }    
}