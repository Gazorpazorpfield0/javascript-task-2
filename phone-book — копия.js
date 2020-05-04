'use strict';

exports.isStar = true;

let phoneBook = [];

phoneBook.add = add;
phoneBook.update = update;
phoneBook.find = find;
phoneBook.findAndRemove = findAndRemove;
phoneBook.importFromCsv = importFromCsv;

function add(phone, name, mail) {
    let phoneRegExp = /^[5]{3}[0-9]{7}$/;
    if ((phoneRegExp.test(phone)) && (!phoneExistance(phone)) && (name !== undefined)) {
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

function update(phone, name, mail) {
    if (phoneExistance(phone)) {
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

function find(str) {
    if (str === '') {
        return [];
    }
    if (str === '*') {
        str = '555';
    }
    let findArray = phoneBook.filter((elem, index) => {
        return String(Object.values(phoneBook[index])).indexOf(str) !== -1;
    });
    let sortArray = findArray.sort((a, b) => a.name > b.name ? 1 : -1);
    let result = sortArray.map((item) => {
        if (item.mail === '') {
            return `${item.name}, ${phoneBeauty(item.phone)}`;
        }

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
    let newElemsForRemove = elemsForRemove.map(element => {
        return element.split(', ');
    });
    newElemsForRemove.forEach(element => {
        element.name = element[0];
        element.phone = element[1];
        element.mail = element[2];
    });

    let counterOfRemoved = 0;
    let currentRemoveElem = 0;
    for (let i = 0; i < phoneBook.length;) {
        if (newElemsForRemove[currentRemoveElem].phone === phoneBeauty(phoneBook[i].phone)) {
            phoneBook.splice(i, 1);
            currentRemoveElem++;
            counterOfRemoved++;
            i = 0;
            continue;
        }

        i++;
    }

    return counterOfRemoved;
}

let excelOutput = [
    'Борис;5552220022;boris@example.com',
    'Григорий;5554440044;grisha@example.com',
    'Алексей;5551110011;alex@example.com',
    'Валерий;5553330033;valera@example.com',
    'Неизвестный;3330033;unknown@example.com'
].join('\n');

function importFromCsv(csv) {
    if (typeof csv !== 'string') {
        return false;
    }

    let rawArray = (csv.split('\n'));
    let countOfImported = 0;
    let currentUser = [];

    for (let i = 0; i < rawArray.length; i++) {
        currentUser = rawArray[i].split(';');

        if (phoneBook.add(currentUser[1], currentUser[0], currentUser[2])) {
            countOfImported++;
            continue;
        }

        if (phoneBook.update(currentUser[1], currentUser[0], currentUser[2])) {
            countOfImported++;
        }
    }

    return countOfImported;
}

// phoneBook.add('5557772211', 'Валера', 'valera@gmail.com');
// phoneBook.add('5557772212', 'Борис', 'borya.zippa@gmail.com');
// phoneBook.add('5557772213', 'Антон', 'toxa.zippa@gmail.com');
// phoneBook.add('3337572214', 'Евгений', 'evg@gmail.com');
// phoneBook.add('5557572214', 'Евгений', 'evg@gmail.com');
// phoneBook.update('5557772211', 'Геннадий');
// phoneBook.find('@');
// phoneBook.findAndRemove('@');
phoneBook.importFromCsv(excelOutput);
