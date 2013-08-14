wherejs
========

A JavaScript library to search(deep search) in JSON arrays, with mongodb like syntax.


Dependencies:
------------
underscore.js

Installing
----------
include the dependencies and the file where.js in the page you want to use.

```javascript
<script type="text/javascript" src="path_to_underscore.js"></script>
<script type="text/javascript" src="path_to_where.js"></script>
```

Using
-----

where(input,filter)

input is an array of objects to be searched in. The original object is not modified

filter specifies which records to select. We will understand the format of filter from few examples.

###Simple Search

Search simple strings or numbers

```javascript
 where([1,1,1,2],1); // outputs [1,1,1]
 where(['aa','bb','aa','ab','bc'],'aa'); //['aa','aa']
```

Selecting from a set of elements


Search from a set of numbers or strings
```javascript
//Numbers
 where([1,1,3,4],[1,2,4]); // [1,1,4]
//or
 where([1,1,3,4],{$in:[1,2,4]}) // [1,1,4]

//Strings
where(['aa','bb','aa','ab','bc'],['aa','ab']); //['aa',,'aa','ab']
```

Another operator $nin(not in) does the opposite of $in.


###Deep Search in objects

In all the below examples users would be referring to the below array.
```javascript
var users = [
              {name:{fname:'David',lname:'Jones'},age:28, salary:10000 },
              {name:{fname:'James',lname:'Smit'},age:38, salary: 20000 },
              {name:{fname:'Paul',lname:'Lee'},age:19,salary:60000 },
              {name:{fname:'David',lname:'Lee'},age:29,salary:40000 },
           ]
```

Search users with first name "David"

```javascript
where(users,{name:{fname:'David'}});
 //OR
where(users,{'name.fname':'David'});
```
This nesting can go to any level

###Number Operations(less than, greater than)

Search numbers less than 5

```javascript
where([3,4,5,6,7],{$lt:5}) // returns [3,4]
```

On objects
Search users with age greater than 30.

```javascript
where(users,{age:{$gt:30} }); 
```
Search users with age less than 20 and salary greater than 50000

```javascript
where(users,{age:{$lt:20}, salary:{$gt:50000} }); 
```
There are other operators like less than equal to, greater than equal($lte, $gte).

###String Operations

All string operations are case insensitive.

Search for strings which start with A

```javascript
var input =  ["Agra", "Amritsar", "Bangalore"];
where(input, {$startsWith:'A'} );//["Agra","Amritsar"];
```
Similarly there is a $endsWith operator, and a $regex to match regex

$contains operator, to search for a string anywhere in the input

```javascript
input =    [{x:'aaAaa'},{x:"bbAaabcd"},{x:'Baabcd'}];
where(input, {x:{$contains:'Aaa'}} ); //[{x:'aaAaa'},{x:"bbAaabcd"}];
```

###Logical Operations
These operators accepts an array of filters.

$or: Returns true if any one of the filters return true

Search for users with age greater than 30 or salary greater than 50000

```javascript
where(users,{$or:[ {age:{$gt:30}},{salary:{$gt:50000}}] });
```

Similarly there are $and(default: all should be true) and $nor(all should be false).

$not: inverses the output of the filter.

```javascript
where(users,{$not:{fname:'David'}}); 
```

###Condition as a function
This can be used to give custom filters

Search for all even numbers

```javascript
where([3,4,5,6,7],function(o){ return (o%2 == 0) }  ) //  [4,6]
```

Search for users whose age is 50
```javascript
where(users,{age:function(a){ return a == 50} } )
```


Documentation
-----
where(input,filter)

input is an array of objects to be searched in. The original object is not modified

filter

if input is an array of basic types then filter can be 

- a basic type
- an array of basic type 
- object containing filters
- function with one argument which returns true for every element which has to be selected
              

if input is an array of objects, then filter can be

- obeject containing filters
- function


####Comparison operators

- $ne
- $lt
- $lte
- $gt
- $gte
- $in
- $ni

#####String Operators
- $startsWith
- $endsWith
- $contains
- $regex

####Logical operators
- $or
- $and
- $not
- $nor

####Array Operators
- $elemMatch
- $size
- $all


