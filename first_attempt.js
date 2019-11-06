let number = 3552907293224;

function backwards(resultNum) {
  let referenceStr = "acdegijmnoprstuw";
  let resultStr = "eddigjo";

  let resultStrArr = resultStr.split("").reverse().join("");
  for (let i in resultStrArr) {
    resultNum = (resultNum - referenceStr.indexOf(i)) / 43;
    console.log(Math.round(resultNum));
  }
  return Math.round(resultNum);
}
console.log("\n" + backwards(number));
