//handle the sorting comparison ascending
export function compareFunctionAsc(
  a: { id: string; name: string },
  b: { id: string; name: string }
) {
  //checks if all the character in the current string are less than the next string
  if (a.name < b.name) {
    return -1;
  }
  //checks if all the character in the current string are greter than the next string
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

//handle the sorting comparison descending
export function compareFunctionDesc(
  a: { id: string; name: string },
  b: { id: string; name: string }
) {
  //checks if all the character in the current string are less than the next string
  // return high value for inverse effect
  if (a.name < b.name) {
    return 1;
  }
  //checks if all the character in the current string are greater than the next string
  // return low value for inverse effect
  if (a.name > b.name) {
    return -1;
  }
  return 0;
}
