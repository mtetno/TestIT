function saveItem(key,value){
    localStorage.setItem(key, value);
}

function getItem(key){
    return localStorage.getItem(key);
}

function removeItem(key){
    localStorage.removeItem(key);
}
