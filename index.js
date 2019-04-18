// 1. Написать полифил для call() и оставить комментарии к коду, в них коротко описать принцип работы

Function.prototype.call2 = function (ctx) {
    var _args = []; // create array to save arguments
    var _result; // create variable for return
    for (var i = 1; i < arguments.length; i++) {
        _args.push(arguments[i]); // save arguments besides context
    }

    ctx._fn = this; // create temporary method and to add to it calling function

    if (arguments[1]) { // if there are any arguments
        _result = eval('ctx._fn(..._args)'); // call function with new context and arguments
    } else {
        _result = ctx._fn(); // if no arguments just to call function without eval
    }

    delete ctx._fn; // delete temporary method
    return _result; // return result
};



// examples
var wolf = {
    type: 'wolf',
    name: 'Petya'
};

var squirrel = {
    type: 'squirrel',
    name: 'Fluffy'
};

var person = {
    type: 'person',
    name: 'Alex',
    sayName: function () {
        console.log('I am ' + this.type + '. My name is ' + this.name);
    },
    getAge: function (birthdayYear) {
        return 2019 - birthdayYear;
    }
};

console.log('task 1:  полифил для call()');

person.sayName();
var personAge = person.getAge(1990);
person.sayName.call2(wolf);
var wolfAge = person.getAge.call2(wolf, 2017);
console.log('person age: ', personAge, '; wolf age: ', wolfAge);
console.log('');




// 2. Написать полифил для apply() и оставить комментарии к коду, в них коротко описать принцип работы

Function.prototype.apply2 = function (ctx) {
    var _result;

    ctx._fn = this; // create temporary method and to add to it calling function

    if (arguments[1]) { // if there are any arguments
        _result = eval('ctx._fn(...arguments[1])'); // call function with new context and arguments
    } else {
        _result = ctx._fn(); // if no arguments just to call function without eval
    }

    delete ctx._fn; // delete temporary method
    return _result;
};



// examples
console.log('task 2:  полифил для apply()');

person.sayName.apply2(squirrel);
var squirrelAge = person.getAge.apply2(squirrel, [2015]);
console.log('person age: ', personAge, '; squirrel age: ', squirrelAge);

var countSum = function (a, b) {
    return this.sum + a + b;
};

var countSum1 = countSum.apply2({sum: 120}, [1, 2]);

console.log('sum result: ', countSum1);
console.log('');



// 3. Написать полифил для bind() и оставить комментарии к коду, в них коротко описать принцип работы

// add to Function.prototype method bind2
Function.prototype.bind2 = function (ctx) {

    var _args = Array.prototype.slice.call(arguments, 1); // make array of arguments, if they were written after ctx
    var _fToBind = this; // fix function that need to be bound by new context
    var _fNOP = function() {}; // add empty function to use it's prototype(to provide inheritance)
    var _fBound = function() { // to use function for return
        return _fToBind.apply(
        this instanceof _fNOP && ctx // to check if function that need to be bound by new context was already bound and has a new ctx
            ? this // if was - to return it for call by apply
            : ctx, _args.concat(Array.prototype.slice.call(arguments))); // if was not - to return it for call by apply with new context and arguments
    };

    // use empty function's prototype to save the all prototype's chain of function that was bound by new context
    // and to point in proto of function for return (by using standard constructor) to prototype of function that was bound by new context
    _fNOP.prototype = this.prototype;
    _fBound.prototype = new _fNOP();

    return _fBound; // return appropriate function
};


// examples
console.log('task 3:  полифил для bind()');
var countSum1 = countSum.bind2({sum: 120});
var countSum2 = countSum.bind2({sum: 0}, 1, 3);
var countSum3 = countSum2.bind2({sum: 1}, 1, 3);

console.log('countSum1 initial sum: 120  numbers: 5, 6   result: ', countSum1(5, 6));
console.log('countSum1 initial sum: 120 numbers: 10, 50   result: ', countSum1(10, 50));
console.log('countSum2 initial sum: 0  numbers: 1, 3   result: ', countSum2());
console.log(`shouldn't bind the 2nd time already bounded function, initial sum 0, second sum: 1, numbers: 1, 3, second result: `, countSum3());
console.log('');



// 4. Функция, которая меняет местами значения двух чисел. Не вводить дополнительные переменные.

function reverseNumbers([num1, num2]) {
    num1 = num2 + (num2 = num1) - num1;
    return [num1, num2];
}



// examples
var numA = 11;
var numB = 99;

console.log('Task 4');
console.log(numA, numB);
console.log(reverseNumbers([numA, numB]));
