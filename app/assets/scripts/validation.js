form = document.getElementById('form');

form.fullName.onblur = function() {
    
    nameValidation = new Validation('ονοματεπώνυμο', form.fullName.value); 
    nameValidation.validateMinLength(3);
    nameValidation.validateMaxLength(30);
    nameValidation.displayErrors('fullNameError');
}

form.email.onblur = function() {
    
    emailValidation = new Validation('Ε-mail', form.email.value);
    emailValidation.validateRegex(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/);
    emailValidation.displayErrors('emailError');
}

form.email2.onblur = function() {
    
    email = form.email.value;
    emailVerification = new Validation('E-mail', form.email2.value);
    emailVerification.validateEqual('E-mail', email);
    emailVerification.displayErrors('email2Error');
}


function Validation (inputField, fieldValue) {
    
    this.input = inputField;
    this.value = fieldValue;
    
    this.errors = new Array();
    
    this.validateMinLength = function (minLength) {
        
        if(this.value.length < minLength) {
            
            this.errors.push('Παρακαλούμε, για το πεδίο ' + this.input + ' απαιτούνται τουλάχιστον ' + minLength + ' χαρακτήρες.');
        }
    }
       
    this.validateMaxLength = function (maxLength) {
        
        if(this.value.length > maxLength) {
            
            this.errors.push('Παρακαλούμε, για το πεδίο ' + this.input + ' επιτρέπονται το πολύ ' + maxLength + ' χαρακτήρες.');
        }
    }
    
    this.validateEqual = function (inputFieldEqual, inputValueEqual) {
        
        if(this.value != inputValueEqual) {
            
            this.errors.push('Tο πεδίο ' + this.input + ' δεν ταιριάζει με το πεδίο ' + inputFieldEqual + '.');
        }
    }
    
    this.validateRegex = function (regex) {
        
        if(!regex.test(this.value)) {
            
            this.errors.push('Παρακαλούμε εισάγετε μια έγκυρη μορφή για το πεδίο ' + this.input + '.');
        }
    }
    
    this.displayErrors = function (errorId) {
        
        for (var key in this.errors) {
            document.getElementById(errorId).innerHTML = this.errors[key] + ' ';  
        }
    }
}