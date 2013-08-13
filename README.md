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

where(input,filter)

input is an array of objects to be searched in. The original object is not modified

filter specifies which records to select. We will understand the format of filter from few examples.

In all the below examples users would be referring to the below array.
```javascript
var users = [
              {name:{fname:'David',lname:'Jones'},age:28, salary:10000 },
              {name:{fname:'James',lname:'Smit'},age:38, salary: 20000 },
              {name:{fname:'Paul',lname:'Lee'},age:19,salary:60000 },
              {name:{fname:'David',lname:'Lee'},age:29,salary:40000 },
           ]
```



Select a particular element from an array of basic types(Number/String/Boolean).

```javascript
 where([1,1,1,2],1); // outputs [1,1,1]
```

Selecting more than one element from an array of basic types
```javascript
 where([1,1,3,4],[1,2,4]); // outputs [1,1,4]
```

Select users with first name David

```javascript
 where(users,{name:{fname:'David'}});
 //OR
 where(users,{'name.fname':'David'});
```

Select users with first name David and Last name Lee

```javascript
 where(users,{name:{fname:'David',lname:'Lee'}});
 //OR
 where(users,{'name.fname':'David','fname.lname':'Lee'});
```

Select all numbers less than 5
```javascript
 where([3,4,5,6,7],{$lt:5}) // returns [3,4]
```

Select users with age less than 30
```javascript
 where(users,{age:{$lt:30}});
```

$lt is the less than operator. Similarly there are $gt(greater than), $lte(less than equal to),
$gte(greater than equal), $ne(not equal). Complete list is given below.



Select users with age greater 30 or salary greater than 50000.
```javascript
 where(users,{$or:{age:{$gt:30}, salary:{$gt:50000} } });
```
$or operator accepts an array of filters and any of them returns true, then it returns true.
Other Logical operators are $nor, $not, $and


Select users whose first name is not David
```javascript
 where(users,{$not:{fname:'David'}})
 
 //OR
 
 where(users,{fname:{$not:'David'}})
 
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

####Logical operators
- $or
- $and
- $not
- $nor

####Array Operators
- $elemMatch
- $size
- $all


####General operators
- $where
- $regex
