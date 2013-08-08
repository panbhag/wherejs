wherejs
========

A JavaScript library to search in JSON arrays, with mongodb like syntax.

Example
-------

```javascript
var users = [
              {name:{fname:'David',lname:'Jones'},age:28, salary:10000 },
              {name:{fname:'James',lname:'Smit'},age:38, salary: 20000 },
              {name:{fname:'Paul',lname:'Lee'},age:19,salary:60000 }
           ]
//select users who are above 30 years of age  
var result = where(users,{age:{$gt:30} }); // [{name:{fname:'James',lname:'Smit'},age:38, salary: 20000 }]

//select users whose salary is above 50000 and are less than 20 years of age
var result = where(users,{age:{$lt:20}, salary:{$gt:50000} }); // [{name:{fname:'James',lname:'Smit'},age:38, salary: 20000 }]

```


Dependencies:
------------
underscore.js



Installing
----------
include the dependencies and the file where.js in the page you want to use.

```javascript
<script type="text/javascript" src="where.js"></script>
```

Using
-----

where(input,options)

Examples

Rename object keys
```javascript
 var input = [{x:1,y:2},{x:1,y:1},{x:2,y:3},{x:2,y:2}];
 var output = where(input, {x:1}); //output is [{x:1,y:2},{x:1,y:1}]
````



Documentation
-----
where(input,filter)

input is an array of objects to be searched in. The original object is not modified

filter is an object with key as the name of the field to be filter upon  and value is the either a value or another object
with selector



Comparison operators
--------------
$ne
$lt
$lte
$gt
$gte
$in
$ni

Logical operators
-----------------
$or
$and
$not
$nor

Array Operators
---------------
$elemMatch
$size
$all


General operators
-----------------
$where
$regex






