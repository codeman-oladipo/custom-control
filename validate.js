var regValidation = (function(){
    var obj = {eventListeners: {}};
    
      
    // Event listener handler
    obj.addEventListener = function(eventName, callback){
        obj.eventListeners[eventName] = callback;   
    }
    
    obj.validation = {
        'blank': function(elem, message){
            if(elem.val() == '' || elem.val() == undefined || elem.val() == null){
                obj.error.show({elem: elem}, message);
                return false;
            }
            return true;
        },
        'number': function(elem, message, parsedVal){
            var elemVal;
            if(parsedVal){
                elemVal = parsedVal;
            } else {
                elemVal = elem.val();
            }
            try {
                if(isNaN(elemVal) || elemVal.indexOf('.') > -1 || elemVal.indexOf('-') > -1){throw {message: 'not a number'};};
                return true;
            } catch(er){
                obj.error.show({elem: elem}, message);
                return false;
            }
        },
        'minLength': function(elem, length, message){
            if(elem.val().length < parseInt(length)){
                obj.error.show({elem: elem}, message);
                return false;
            }
            return true;
        },
        'maxLength': function(elem, length, message){
            if(elem.val().length > parseInt(length)){
                obj.error.show({elem: elem}, message);
                return false;
            }
            return true;
        },
        'length': function(elem, length, message){
            if(elem.val().length < parseInt(length)){
                obj.error.show({elem: elem}, message);
                return false;
            }
            return true;
        },
        'email': function(elem, message){
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(elem.val())){
                obj.error.show({elem: elem}, message);
                return false;
            }
            return true
        },
        'noMatch': function(elem, elem2, message){
            if(elem.val() == elem2.val()){
                elem2.attr('addMain', 'false');
                obj.error.show({elem: elem, elem2: elem2}, message);
                return false;
            }
            return true;
        },
        'match': function(elem, elem2, message){
            if(elem.val() != elem2.val()){
                if(elem.attr('type') == 'password' || elem.attr('readonly') == true){
                    elem.val('');
                    elem2.val('');
                }
                elem2.attr('addMain', 'false');
                obj.error.show({elem: elem, elem2: elem2}, message);
                return false;
            }
            return true;
        },
        'zeros': function(elem, message){
            var re = /^([0])\1*$/;
            if(re.test(elem.val())){
                obj.error.show({elem: elem}, message);
                return false;
            }
            return true
        },
        'selection': function(elem, message){
            if(elem[0].selectedIndex == 0){
                obj.error.show({elem: elem}, message);
                return false;
            }
            return true;
        },
        'selections': function(elem1, elem2, message){
            if(elem1[0].selectedIndex == 0 || elem2[0].selectedIndex == 0){
                obj.error.showAlternate({elem: elem1, elem2: elem2}, message);
                return false;
            }
            return true;
        },
        'oneLetter': function(elem, message){
            var re = /[a-zA-Z]/;
            if(!re.test(elem.val())){
                obj.error.show({elem: elem}, message);
                return false;
            }
            return true;
        },
        'oneLetterAndNumber': function(elem, message){
            var re = /(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]+/;
            if(!re.test(elem.val())){
                obj.error.show({elem: elem}, message);
                return false;
            }
            return true;
        },
        'dashUnderscore': function(elem, message){
            var re = /[^\w-]/;
            if(re.test(elem.val())){
                obj.error.show({elem: elem}, message);
                return false;
            }
            return true;
        },      
       'zipcode': function(elem, message){
            var re = /[^\d{5}$]/;
            if(re.test(elem.val())){
                obj.error.show({elem: elem}, message);
                return false;
            }
                return true;
        },
        'numbers': function(elem, count, message){
            var numInts = 0;
            
            var re = /\d/;
            
            for(var i = 0; i < elem.val().length; i++){
                var char = elem.val().charAt(i);
                if(re.test(char)){
                    numInts++;   
                }
            }

            if(numInts > count){
                obj.error.show({elem: elem}, message);
                return false;
            }
            
            return true;
        },
        'continuousCharacters': function(elem, length, message){
            var re = /(.)\1{3,}/ //RegExp(expression, 'i');
            if(re.test(elem.val())){
                obj.error.show({elem: elem}, message);
                return false;
            }

            return true;
        },
        'fourSequential': function(elem, message){
            var expression = [];
            expression.push('0123|1234|2345|3456|4567|5678|6789|3210|4321|5432|6543|7654|8765|9876|');
            expression.push('abcd|bcde|cdef|defg|efgh|fghi|ghij|hijk|ijkl|jklm|klmn|lmno|mnop|nopq|opqr|pqrs|qrst|rstu|stuv|tuvw|uvwx|vwxy|wxyz|');
            expression.push('ABCD|BCDE|CDEF|DEFG|EFGH|FGHI|GHIJ|HIJK|IJKL|JKLM|KLMN|LMNO|MNOP|NOPQ|OPQR|PQRS|QRST|RSTU|STUV|TUVW|UVWX|VWXY|WXYZ');

            var re = RegExp(expression.join(''), 'i');

            if(re.test(elem.val())){
                obj.error.show({elem: elem}, message);
                return false;
            }

            return true;
        },
        'fakeNumber': function(elem, message){
            var expression = [];
            expression.push('^');
            expression.push('(123456789|987654321)$');

            var re = RegExp(expression.join(''), 'i');

            if(re.test(elem.val())){
                obj.error.show({elem: elem}, message);
                return false;
            }

            return true;
        },
        'monthDayYear': function(elem, message){
            var expression = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20|21)\d{2}$/;
            if(!expression.test(elem.val())){
                obj.error.show({elem: elem}, message);
                return false;
            } else {
                var year = (new Date(elem.val()).getFullYear()) - (new Date().getFullYear());
                var day = (new Date(elem.val()).getDate()) - (new Date().getDate());
                var month = (new Date(elem.val()).getMonth() + 1) - (new Date().getMonth() + 1);

            

                if(year > 0 || (year == 0 && month > 0) || (year == 0 && month == 0 && day > 0)){
                 
                    obj.error.show({elem: elem}, message);
                    return false;
                }
            }

            return true;
        }
    }

    return obj;
})(regValidation || {})