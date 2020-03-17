'use strict';

let phoneBook = [];

function phoneExistance(phone) {
    if (phoneBook.length === 0) {
        return false;
    }
    for (let i = 0; i < phoneBook.length;) {
        if (phoneBook[i].phone === phone) {
            return true; 
        } else {
            i++
        }   
    }
    return false;
}

function phoneBeauty(phone) {
    return `+7 (${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 8)}-${phone.slice(8, 10)}`;
}

function Add(phone, name, mail) {
    // проверяем валидность введенных данных
    // пропускает неповторя
    let phoneRegExp = /^[0-9]{10}$/;
    if ((phoneRegExp.test(phone)) && (!phoneExistance(phone))) {
        phoneBook.push({phone: phone, name: name, mail: mail});
        return true;
    }
    return false;
};

function Update(phone, name, mail) {
    if (phoneExistance(phone)) {
        if (typeof mail === 'undefined') mail = '';
        if (typeof name === 'undefined') return false;
        for (let i = 0; i < phoneBook.length;) {
            if (phoneBook[i].phone === phone) {
                phoneBook[i].name = name;
                phoneBook[i].mail = mail;
                return true; 
            } else {
                i++;
            }
        }
    }
    return false;
};

function Find(str) {
    if (str === '*') {
        let phoneBookCopy = phoneBook;
        let sortedPhoneBook = phoneBook.sort((a, b) => a.name > b.name ? 1 : -1);
        let outputAllPhoneBook = sortArray.map((item) => `${item.name}, ${phoneBeauty(item.phone)}, ${item.mail} `);
        return console.log(outputAllPhoneBook);
    }
    let findArray = phoneBook.filter((elem, index) => String(Object.values(phoneBook[index])).indexOf(str) !== -1);
    let sortArray = findArray.sort((a, b) => a.name > b.name ? 1 : -1);
    let result = sortArray.map((item) => `${item.name}, ${phoneBeauty(item.phone)}, ${item.mail} `);
    console.log(result);
};

phoneBook.add = Add;
phoneBook.update = Update;
phoneBook.find = Find;

phoneBook.add('5557772211', 'Валера', 'valera@gmail.com');
phoneBook.add('5557772212', 'Борис', 'borya.zippa@gmail.com');
phoneBook.add('5557772213', 'Антон', 'toxa.zippa@gmail.com');
// phoneBook.update('5557772211', 'Boris');
phoneBook.find('*');

// console.log(phoneBook.length);