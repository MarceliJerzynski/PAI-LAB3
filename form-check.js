
function isWhiteSpaceOrEmpty(text) {
    return /^[\s\t\r\n]*$/.test(text);
}

function invalidEmail(text, message) {
    let email = /^[a-zA-Z_0-9\.]+@[a-zA-Z_0-9\.]+\.[a-zA-Z][a-zA-Z]+$/;
    if (email.test(text)) {
        return false;
    }
    return true;
}

function legitStringAndFocus(object, message, callback) {
    let str = object.value;
    let errorFieldName = "e_" + object.name.substr(2, object.name.length);
    if (callback(str)) {
        document.getElementById(errorFieldName).innerHTML = message;
        object.focus();
        return false;
    }
    document.getElementById(errorFieldName).innerHTML = "";
    return true;
}

function validate(form) {
    let legit = true;  
    if (!legitStringAndFocus(form.elements["f_city"],     "Wpisz poprawne miasto!", isWhiteSpaceOrEmpty)) legit = false;
    if (!legitStringAndFocus(form.elements["f_street"],   "Wpisz poprawną ulicę!", isWhiteSpaceOrEmpty)) legit = false;
    if (!legitStringAndFocus(form.elements["f_zip_code"], "Wpisz poprawny kod pocztowy!", isWhiteSpaceOrEmpty)) legit = false;
    if (!legitStringAndFocus(form.elements["f_email"],     "Wpisz poprawny email!", invalidEmail)) legit = false;
    if (!legitStringAndFocus(form.elements["f_surname"],  "Wpisz poprawne nazwisko!", isWhiteSpaceOrEmpty)) legit = false;
    if (!legitStringAndFocus(form.elements["f_name"],     "Wpisz poprawne imię!", isWhiteSpaceOrEmpty)) legit = false;
    return legit;
}

function showElement(name) {
    document.getElementById(name).style.visibility = 'visible';
}

function hideElement(name) {
    document.getElementById(name).style.visibility = 'hidden';
}

function alterRows(i, e) {
    console.log(e);
    if (e) {
        if (i % 2 == 1) {
            e.setAttribute("style", "background-color: Aqua;");
        }
        e = e.nextSibling;
        while (e && e.nodeType != 1) {
            e = e.nextSibling;
        }
    alterRows(++i, e);
    }
}

function nextNode(e) {
    while (e && e.nodeType != 1) {
        e = e.nextSibling;
    }
    return e;
}

function prevNode(e) {
    while (e && e.nodeType != 1) {
        e = e.previousSibling;
    }
    return e;
}

function swapRows(b) {
    let tab = prevNode(b.previousSibling);
    let tBody = nextNode(tab.firstChild);
    let lastNode = prevNode(tBody.lastChild);
    tBody.removeChild(lastNode);
    let firstNode = nextNode(tBody.firstChild);
    tBody.insertBefore(lastNode, firstNode);
}

function cnt(form, msg, maxSize) {
    if (form.value.length > maxSize)
    form.value = form.value.substring(0, maxSize);
    else
    msg.innerHTML = maxSize - form.value.length;
}

alterRows(1, document.getElementById("table1").getElementsByTagName("tr")[0]);   
