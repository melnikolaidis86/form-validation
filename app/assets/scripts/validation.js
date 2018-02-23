// Fields that need validation
var form = document.getElementById('form'),
    fullNameField = form.fullName,
    emailField = form.email;

// Button that submits the form when clicked
var submitButton = document.getElementById('submitButton');

// A validation run for full name triggered on blur
fullNameField.addEventListener('blur', function() {
    
    var errorSpan = document.getElementById('fullNameError');
    
    fullNameValidation = new Validation('ονοματεπώνυμο', fullNameField.value, {
        required: true,
        minLength: 5,
        maxLength: 30
    });
    
    errorSpan.innerHTML = fullNameValidation.validate();
});

/*submitButton.addEventListener('click', function() {
    formErrors = new Array();
    fieldsRequired = [
        fullNameValidation = new Validation('Ονοματεπώνυμο', fullNameField.value, {required: true, maxLength: 30}),
        emailValidation = new Validation('E-mail', emailField.value, {required: true, regex: /foo/})
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
});*/


// Validation object that validates a field based on some validation rules
function Validation (validationField, validationFieldValue, validationRules = {required: false, minLength: null, maxLength: null, regex: null}) {
    
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
    
}