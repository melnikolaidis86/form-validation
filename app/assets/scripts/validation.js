function Validation (validationField, validationRules = {required: false, minLength: 0, maxLength: 0, regex: false}) {
    
    this.field = validationField;
    this.rules = validationRules;
    
    this.validate = function () {
        
        var errors = {};
        
        if(this.rules.required == true && this.field == "") {
            errors.fieldRequiredError = "This field is required";
        }
        
        if(this.rules.minLength != 0 && this.field.length < this.rules.minLength) {
            errors.minLengthError = "Give more chars";
        }
        
        if(this.rules.maxLength != 0 && this.field.length > this.rules.maxLength) {
            errors.maxLengthError = "Too many chars";
        }
        
        if(this.rules.regex != false) {
            var regexp = RegExp(this.regex);
            var testField = this.field;
            
            if(!regexp.test(testField)) {
                
                errors.regexError = "Enter a valid string";
            }
        }
        
        return errors;
    
    }
    
}