function Validation (inputField, fieldValue, fieldMinLength, fieldMaxLength, fieldRegex=null) {
    
    this.value = fieldValue;
    
    this.errors = {

        minLengthError: '',
        maxLengthError: '',
        regexError: ''
    }
    
    this.validateText = function () {
        
        if(this.value.length < fieldMinLength) {
            
            this.errors.minLengthError = 'Παρακαλούμε, το πεδιο ' + inputField + ' πρέπει να περιέχει τουλάχιστον ' + fieldMinLength + ' χαρακτήρες.';
        }
        
        if(this.value.length > fieldMaxLength) {
            
            this.errors.maxLengthError = 'Παρακαλούμε, το πεδιο ' + inputField + ' δεν πρέπει να υπερβαίνει τους ' + fieldMaxLength + ' χαρακτήρες.';
        }
        
        if(fieldRegex != null) {
            
            if(!fieldRegex.test(this.value)) {
                this.errors.regexError = 'Συμπληρώστε μία έγκυρη μορφή για το πεδίο ' + inputField; 
            }
        }
        
        return this.errors;
    }
    
    this.displayErrorMessage = function () {
        
        if(this.errors.minLengthError.length > 1) {
            
            console.log(this.errors.minLengthError);
        }
        if(this.errors.maxLengthError.length > 1) {
            
            console.log(this.errors.minLengthError);
        }
        if(this.errors.regexError.length > 1) {
            
            console.log(this.errors.minLengthError);
        }
    }
}