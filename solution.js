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
