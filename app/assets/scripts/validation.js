function validateText (inputField, inputValue, minValue, maxValue, regex=null) {
    
    var inputErrorsArray = new Array();
    
    if (inputValue.length < minValue) {
        
        inputErrorsArray.push('Παρακαλούμε, το πεδίο ' + inputField + ' δεν μπορεί να περιέχει λιγότερους από ' + minValue + ' χαρακτήρες.');
    }
    
    if (inputValue.length > maxValue) {
        
        inputErrorsArray.push('Παρακαλούμε, το πεδίο ' + inputField + ' δεν μπορεί να υπερβαίνει τους ' + maxValue + ' χαρακτήρες.');
    }
    
    if(regex != null) {
        
        if(!regex.test(inputField)) {
            
            inputErrorsArray.push('Παρακαλούμε είσαγετε μια έγκυρη μορφή για το πεδίο ' + inputField + '.');
        }
    }
    
    return inputErrorsArray;
}

var fullNameField = document.getElementById('form').fullName;

fullNameField.onblur = function () {
     
    alert(validateText('Ονοματεπώνυμο', fullNameField.value, 3, 12));
}