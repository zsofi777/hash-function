## Hashing

>A hash function (or hashing) is where a computer takes an input of any length and content (e.g. letters, numbers, symbols) and uses a mathematical formula to chop it, mix it up, and produce an output of a specific length.   
>
>It is one way to enable security during the process of message transmission when the message is intended for a particular recipient only.  

### The task

Find a 7 characters long string whereof the result of the **hash(string) function** is _3552907293224_.     
The hash function is the following:  

```javascript
function hash(string) {
  var nr = 13;
  var chars = string.split('');
  for (var i = 0; i < string.length; i++) {
      nr = nr * 43 + "acdegijmnoprstuw".indexOf(string.charAt(i));
  }
  return nr;
}
```

#### The solution - Part I.

I managed to figure out by trial and error that the string is **"eddigjo"**.      
The result is the final element in a series that starts at **13** and is generated by the given algorithm (**"acdegijmnoprstuw"**).     
It is driven by an additional input string, with each next character's index providing the offset.  

```javascript
nr = nr * 43 + "acdegijmnoprstuw".indexOf(string.charAt(i))
```
>3552907293224 = 3552907293224 * 43 + (i) of [i] in string in "acdegijmnoprstuw"
>
>e d d i g j o  
3 2 2 5 4 6 9  
ac**d**(2)(2)**e**(3)**g**(4)**i**(5)**j**(6)mn**o**(9)prstuw  

So I thought to reverse the process.      

I worked backwards. Took the result (**3552907293224**) and subtracted from it the index of the last char of the input string   
(in the given reference string - **"acdegijmnoprstuw"**), then divided by **43**. This is the last factor.  

>(3552907293224 – 9) / 43 = **82625751005**

Then subtracted from it the index of the one-before-last char of the input string and divided by **43**, this is the next-to-last   factor. Repeated until I hit **13**.  

>(82625751005 – 6) / 43 = **1921529093**  
>...

##### The code:

```javascript
let number = 3552907293224;
 
function backwards(resultNum) {
  let referenceStr = "acdegijmnoprstuw";
  let resultStr = "eddigjo";
 
  let resultStrArr = resultStr.split("").reverse().join("");
  for (let i in resultStrArr) {
    resultNum = (resultNum - referenceStr.indexOf(i)) / 43;
    console.log(Math.round(resultNum));
  }
  return resultNum;
}
console.log("\n" + backwards(number));
```

##### The output:

```javascript
82625751005
1921529093
44686723
1039226
24168
562
13

13
```

>nr = **13**  
nr = 13 * 43 + 3 = **562**  
nr = 562 * 43 + 2 = **24168**  
>...  
>nr = 82625751005 * 43 + 7 = **_3552907293224_**  

#### The solution - Part II.

```javascript
let resultNum = 3552907293224;

function hash(number) {
  let referenceStr = "acdegijmnoprstuw";
  let splitted = referenceStr.split("");
  let resultArrStr = [];
  while (number > 43) {
    resultArrStr.unshift(splitted[Math.round(number) % 43]);
    number /= 43;
  }
  return resultArrStr.join("");
}
console.log(hash(resultNum));
```

>So
```javascript
[Math.round(number) % 43]
```
>is  
9-6-4-5-2-2-3  
o-j-g-i-d-d-e

##### The expected string/array, and the value of the number respectively per itearation:

```javascript
[]
3552907293224
[ 'o' ]
82625751005
[ 'j', 'o' ]
1921529093
[ 'g', 'j', 'o' ]
44686723
[ 'i', 'g', 'j', 'o' ]
1039226
[ 'd', 'i', 'g', 'j', 'o' ]
24168
[ 'd', 'd', 'i', 'g', 'j', 'o' ]
562
eddigjo
```
