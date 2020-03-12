'use strict';

let phoneBook = [];

function phoneExistance(phone) {
    if (phoneBook.length === 0) {
        return false;
    }
    for (let i = 0; i <= phoneBook.length; i++) {
        if (phoneBook[i].phone === phone) {
            return true; 
        } else {
            i++
        }
    return false;    
    }
}

function Add(phone, name, mail) {
    // проверяем валидность введенных данных
    // пропускает неповторя
    let phoneRegExp = /^5{3}[0-9]{3}[0-9]{2}[0-9]{2}$/ 
    if ((phoneRegExp.test(phone)) && (!phoneExistance(phone))) {
        phoneBook.push({phone: phone, name: name, mail: mail});
        return true;
    } else {
        return false;
    }
};

function Update(phone, name, mail) {
    if (mail === undefined) mail === '';
    if (name === undefined) return false;
    for (let i = 0; i <= phoneBook.length; i++) {
        if (phoneBook[i].phone === phone) {
            phoneBook[i].name = name;
            phoneBook[i].mail = mail;
            return true; 
        } else {
            i++
        }
    return false;    
    }
};

phoneBook.Add = Add;
phoneBook.Update = Update;

phoneBook.Add('5557772211', 'Alex', 'nibba');
phoneBook.Add('5557772223', 'Alex', 'nibba');
phoneBook.Update('5557772233', 'Boris');

console.log(phoneBook[0]);

