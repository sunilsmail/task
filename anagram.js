function isAnagram(str1, str2) {
  if (str1.length !== str2.length) {
    return false
  }
  str1 = str1.replace(/\s/g, '').toLowerCase()
  str2 = str2.replace(/\s/g, '').toLowerCase()
  let counter = {}
  for (let letters of str1) {
    counter[letters] = counter[letters] ? counter[letters] + 1 : 1
  }
  for (let items of str2) {
    if (!counter[items]) {
      return false
    }
    counter[items] -= 1
  }
  return true
}
let str1 = 'I am Monu'
let str2 = 'am I OnMU'
const checkAnagram = isAnagram(str1, str2)
console.log(checkAnagram)