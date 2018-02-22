var form = document.getElementById('form'),
    fullNameField = form.fullName,
    emailField = form.email;

var submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', function() {
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
});


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
        
        var errors = new Array();
        
        if(this.rules.required == true && this.rules.minLength == null && this.fieldValue.trim() == '') {
            errors.push(this.messages.requiredMessage); 
        }
        
        if(this.rules.minLength != null && this.fieldValue.length < this.rules.minLength) {
            errors.push(this.messages.minLengthMessage);
        }
        
        if(this.rules.maxLength != null && this.fieldValue.length > this.rules.maxLength) {
            errors.push(this.messages.maxLength);
        }
        
        if(this.rules.regex != null && this.fieldValue.trim() != '') {
            
            if(!this.rules.regex.test(this.fieldValue)) {
                
                errors.push(this.messages.regexMessage);
            }
        }
    
            
        return errors;
    
    }
    
}