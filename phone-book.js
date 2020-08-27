'use strict';

exports.isStar = true;

let phoneBook = [];

function getBeautyPhoneBook(array) {
    let sortedPhoneBook = array.sort((a, b) => a.name > b.name ? 1 : -1);
    let beautyPhoneBook = sortedPhoneBook.map((item) => {
        if (item.mail === '') {
            return `${item.name}, ${makePhoneBeauty(item.phone)}`;
        }

        return `${item.name}, ${makePhoneBeauty(item.phone)}, ${item.mail}`;
    });

    return beautyPhoneBook;
}

function makePhoneBeauty(phone) {
    let a = `+7 (${phone.slice(0, 3)}) `;
    let b = `${phone.slice(3, 6)}-`;
    let c = `${phone.slice(6, 8)}-`;
    let d = `${phone.slice(8, 10)}`;

    return [a, b, c, d].join('');
}

function checkPhoneExistance(phone) {
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

exports.add = function (phone, name, mail) {
    let phoneRegExp = /^[5]{3}[0-9]{7}$/;
    if ((phoneRegExp.test(phone)) && (!checkPhoneExistance(phone)) && (name !== undefined)) {
        phoneBook.push({ phone: phone, name: name, mail: mail });

        return true;
    }

    return false;
};

exports.update = function (phone, name, mail) {
    if (!checkPhoneExistance(phone)) {
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
};

exports.find = function (str) {
    if (str === '') {
        return [];
    }
    if (str === '*') {
        return getBeautyPhoneBook(phoneBook);
    }
    let findArray = phoneBook.filter((elem, index) => {
        return String(Object.values(phoneBook[index])).indexOf(str) !== -1;
    });

    return getBeautyPhoneBook(findArray);
};

exports.findAndRemove = function (str) {
    let elemsForRemove = exports.find(str);
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
    for (let i = 0; currentRemoveElem < newElemsForRemove.length;) {
        if (newElemsForRemove[currentRemoveElem].phone === makePhoneBeauty(phoneBook[i].phone)) {
            phoneBook.splice(i, 1);
            currentRemoveElem++;
            counterOfRemoved++;
            i = 0;
            continue;
        }

        i++;
    }

    return counterOfRemoved;
};

exports.importFromCsv = function (csv) {
    if (typeof csv !== 'string') {
        return false;
    }

    let rawArray = (csv.split('\n'));
    let countOfImported = 0;
    let currentUser = [];

    for (let i = 0; i < rawArray.length; i++) {
        currentUser = rawArray[i].split(';');

        if (exports.add(currentUser[1], currentUser[0], currentUser[2])) {
            countOfImported++;
            continue;
        }

        if (exports.update(currentUser[1], currentUser[0], currentUser[2])) {
            countOfImported++;
        }
    }

    return countOfImported;
};
