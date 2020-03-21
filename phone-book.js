'use strict';

let phoneBook = [];

phoneBook.add = Add;
phoneBook.update = Update;
phoneBook.find = Find;
phoneBook.findAndRemove = findAndRemove;

function Add(phone, name, mail) {
    // проверяем валидность введенных данных
    let phoneRegExp = /^[0-9]{10}$/;
    if ((phoneRegExp.test(phone)) && (!phoneExistance(phone))) {
        phoneBook.push({ phone: phone, name: name, mail: mail });

        return true;
    }

    return false;
}

function phoneExistance(phone) {
    if (phoneBook.length === 0) {
        return false;
    }
    for (let i = 0; i < phoneBook.length;) {
        if (phoneBook[i].phone === phone) {
            return true;
        }
        i++;
    }

    return false;
}

function Update(phone, name, mail) {
    if (!phoneExistance(phone)) {
        return false;
    }
    if (typeof mail === 'undefined') {
        mail = '';
    }
    if (typeof name === 'undefined') {
        return false;
    }
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === phone) {
            phoneBook[i].name = name;
            phoneBook[i].mail = mail;

            return true;
        }
    }

    return false;
}

function Find(str) {
    if (str === '') {
        return [];
    }
    if (str === '*') {
        let phoneBookCopy = phoneBook;
        let sortedPhoneBook = phoneBookCopy.sort((a, b) => a.name > b.name ? 1 : -1);
        let outputAllPhoneBook = sortedPhoneBook.map((item) => {
            return (`${item.name}, ${phoneBeauty(item.phone)}, ${item.mail}`);
        });

        return outputAllPhoneBook;
    }
    let findArray = phoneBook.filter((elem, index) => {
        return String(Object.values(phoneBook[index])).indexOf(str) !== -1;
    });

    let sortArray = findArray.sort((a, b) => a.name > b.name ? 1 : -1);
    let result = sortArray.map((item) => {
        return `${item.name}, ${phoneBeauty(item.phone)}, ${item.mail}`;
    });

    return result;
}

function phoneBeauty(phone) {
    let a = `+7 (${phone.slice(0, 3)}) `;
    let b = `${phone.slice(3, 6)}-`;
    let c = `${phone.slice(6, 8)}-`;
    let d = `${phone.slice(8, 10)}`;

    return [a, b, c, d].join('');
}

function findAndRemove(str) {
    let elemsForRemove = phoneBook.find(str);
    let beautyPhoneBook = phoneBook.find('*');
    let counterOfRemoved = 0;

    let currRemoveElem = 0;
    for (let i = 0; i < beautyPhoneBook.length; i++) {
        if (elemsForRemove[currRemoveElem] === beautyPhoneBook[i]) {
            phoneBook.splice(phoneBook[i], 1);
            currRemoveElem++;
            counterOfRemoved++;
            i = 0;
        }
    }


    return counterOfRemoved;
}

// phoneBook.add('5557772211', 'Валера', 'valera@gmail.com');
// phoneBook.add('5557772212', 'Борис', 'borya.zippa@gmail.com');
// phoneBook.add('5557772213', 'Антон', 'toxa.zippa@gmail.com');
// phoneBook.add('3337572214', 'Евгений', 'evg@gmail.com');
// phoneBook.update('5557772211', 'Boris');
// phoneBook.find('*');
// phoneBook.findAndRemove('3337572214');
