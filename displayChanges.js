/**
 * Created by vineelal on 30/10/13.
 */
var a = 2,
    b = 5,
    c = 3;

function changeVal(variable, newValue) {
    console.log(variable);
    console.log("old " + this[variable]);
    if (isNaN(Number(newValue))) {      //not a number
        this[variable] = this[newValue];
    } else {
        this[variable] = newValue;
    }
    console.log("new " + this[variable]);
};

function displayChanges() {
    var stmt = document.getElementById("text").value,
        index = stmt.indexOf('='),
        newValue,
        optrIndex;
    if (index !== -1) {
        if (stmt.indexOf('+') === -1 && stmt.indexOf('-') === -1 && stmt.indexOf('*') === -1 && stmt.indexOf('/') === -1 && stmt.indexOf('%') === -1) {
            changeVal(stmt.substring(0, index), stmt.substring(index + 1, stmt.length));
        } else {
            if (stmt.indexOf('+=') !== -1 || stmt.indexOf('-=') !== -1 || stmt.indexOf('*=') !== -1 || stmt.indexOf('/=') !== -1 || stmt.indexOf('%=') !== -1) {
                newValue = expEvaluator(stmt.substring(0, index - 1), stmt.charAt(index - 1), stmt.substring(index + 1, stmt.length));
                changeVal(stmt.substring(0, index - 1), newValue);
            } else {
                optrIndex = getOperatorIndex(stmt);
                newValue = expEvaluator(stmt.substring(index + 1, optrIndex), stmt.charAt(optrIndex), stmt.substring(optrIndex + 1, stmt.length));
                changeVal(stmt.substring(0, index), newValue);
            }
        }
    }
};

function expEvaluator(value1, operator, value2) {
    var operand1 = Number(value1),
        operand2 = Number(value2),
        result;
    if (isNaN(operand1)) {
        operand1 = this[value1];
    }
    if (isNaN(operand2)) {
        operand2 = this[value2];
    }
    switch (operator) {
        case '+':
            result = operand1 + operand2;
            break;
        case '-':
            result = operand1 - operand2;
            break;
        case '*':
            result = operand1 * operand2;
            break;
        case '/':
            result = operand1 / operand2;
            break;
        case '%':
            result = operand1 % operand2;
            break;
    }
    return result;
};

function getOperatorIndex(stmt) {
    if (stmt.indexOf('+') !== -1) {
        return stmt.indexOf('+');
    } else if (stmt.indexOf('-') !== -1) {
        return stmt.indexOf('-');
    } else if (stmt.indexOf('*') !== -1) {
        return stmt.indexOf('*');
    } else if (stmt.indexOf('/') !== -1) {
        return stmt.indexOf('/');
    } else if (stmt.indexOf('%') !== -1) {
        return stmt.indexOf('%');
    }
}


