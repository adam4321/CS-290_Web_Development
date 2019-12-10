/**************************************************************************
** Author:       Adam Wright
** Description:  JavaScript application that sorts an array or Automobile
**               objects by using a comparitor function and then outputs
**               the results to the console
**************************************************************************/

function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
}

var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
];

Automobile.prototype.logMe = function(bool) {
  if (bool == true) {
    console.log(
      this.year + " " + this.make + " " + this.model + " " + this.type
    );
  } else {
    console.log(this.year + " " + this.make + " " + this.model);
  }
};

/********************************************************************************
**  This function sorts arrays using an arbitrary comparator. You pass it a
**  comparator and an array of objects appropriate for that comparator and it will
**  return a new array which is sorted with the largest object in index 0 and the
**  smallest in the last index.
********************************************************************************/
function sortArr(comparator, array) {
  let bool = false;

  if (comparator == typeComparator) {
    bool = true;
  }

  const newArr = [...array].sort(comparator);
  let i = 0;

  while (i < newArr.length) {
    newArr[i].logMe(bool);
    i++;
  }
}

/******************************************************************************
**  A comparator takes two arguments and uses some algorithm to compare them.
**  If the first argument is larger or greater than the 2nd it returns true,
**  otherwise it returns false. Here is an example that works on integers.
******************************************************************************/
function exComparator(int1, int2) {
  if (int1 > int2) {
    return true;
  } else {
    return false;
  }
}


/******************************************************************************
For all comparators if cars are 'tied' according to the comparison rules 
then the order of those 'tied' cars is not specified and either can come first
******************************************************************************/


/****************************************************************************
**  This compares two automobiles based on their year. Newer cars are
**  "greater" than older cars.
****************************************************************************/
function yearComparator(auto1, auto2) {
  if (auto1.year < auto2.year) {
    return true;
  } else {
    return false;
  }
}


/****************************************************************************
**  This compares two automobiles based on their make. It should be case 
**  insensitive and makes which are alphabetically earlier in the alphabet 
**  are "greater" than ones that come later (from A-Z).
****************************************************************************/
function makeComparator(auto1, auto2) {
  const one = auto1.make.toLowerCase();
  const two = auto2.make.toLowerCase();

  if (one > two) {
    return true;
  } else {
    return false;
  }
}

/**************************************************************************
**  This compares two automobiles based on their type. The ordering from 
**  "greatest" to "least" is as follows: roadster, pickup, suv, wagon, 
**  (types not otherwise listed). It should be case insensitive. If two cars 
**  are of equal type then the newest one by model year should be considered 
**  "greater".
**************************************************************************/
function typeComparator(auto1, auto2) {
  let one = auto1.type.toLowerCase();
  let two = auto2.type.toLowerCase();

  if (one == "roadster") {
    one = 4;
  } else if (one == "pickup") {
    one = 3;
  } else if (one == "suv") {
    one = 2;
  } else if (one == "wagon") {
    one = 1;
  } else {
    one = 0;
  }

  if (two == "roadster") {
    two = 4;
  } else if (two == "pickup") {
    two = 3;
  } else if (two == "suv") {
    two = 2;
  } else if (two == "wagon") {
    two = 1;
  } else {
    two = 0;
  }

  // Make the comparison
  if (one < two) {
    return true;
  } else if (one == two) {
    if (auto1.year < auto2.year) {
      return true;
    }
  } else {
    return false;
  }
}


/******************************************************************************
Your program should output the following to the console.log, including the 
opening and closing 5 stars. All values in parenthesis should be replaced with 
appropriate values. Each line is a seperate call to console.log.

Each line representing a car should be produced via a logMe function. This function 
should be added to the Automobile class and accept a single boolean argument. If 
the argument is 'true' then it prints "year make model type" with the year, make, 
model and type being the values appropriate for the automobile. If the argument is 
'false' then the type is ommited and just the "year make model" is logged.

*****
The cars sorted by year are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by make are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by type are:
(year make model type of the 'greatest' car)
(...)
(year make model type of the 'least' car)
*****

As an example of the content in the parenthesis:
1990 Ford F-150 
******************************************************************************/


// The function calls to create the program output
console.log('\n*****');
console.log('The cars sorted by year are:');
sortArr(yearComparator, automobiles);
console.log('\nThe cars sorted by make are:');
sortArr(makeComparator, automobiles);
console.log('\nThe cars sorted by type are:');
sortArr(typeComparator, automobiles);
console.log('*****\n');
