const ASCII_UPPER_CASE_BEGINS = 65;  // uppercase alphabet beginning at A
const ASCII_UPPER_CASE_ENDS   = 90;  // uppercase alphabet ending at Z

const ASCII_LOWER_CASE_BEGINS = 97;  // uppercase alphabet beginning at a
const ASCII_LOWER_CASE_ENDS   = 122; // uppercase alphabet ending at z

const UPPER_CASE_LIMIT = 110;  // to help assign the offset value for uppercase characters
const LOWER_CASE_LIMIT = 78;   // to help assign the offset value for lowercase characters

const CYPHER_OFFSET = 13;

function getAsciiNumber(string, index) {  // returns the corresponding ascii number
  return string.charCodeAt(index);
}

function isCharacterBetweenAlphabets(asciiNumber) {
  return (asciiNumber > ASCII_UPPER_CASE_ENDS && asciiNumber < ASCII_LOWER_CASE_BEGINS);
}

function isUppercaseCharacter(asciiNumber) {
  return (asciiNumber >= ASCII_UPPER_CASE_BEGINS && asciiNumber <= ASCII_UPPER_CASE_ENDS);
}

function isLowercaseCharacter(asciiNumber) {
  return (asciiNumber >= ASCII_LOWER_CASE_BEGINS && asciiNumber <= ASCII_LOWER_CASE_ENDS);
}

function isNonAlphabetCharacter(asciiNumber) {
  return (asciiNumber < ASCII_UPPER_CASE_BEGINS || (isCharacterBetweenAlphabets(asciiNumber)) || asciiNumber > ASCII_LOWER_CASE_ENDS)
}

function assignOffsetForUpperCaseLimit(asciiNumber) {
  return asciiNumber >= LOWER_CASE_LIMIT ? asciiNumber - CYPHER_OFFSET : asciiNumber + CYPHER_OFFSET;
}

function assignOffsetForLowerCaseLimit(asciiNumber) {
  return asciiNumber >= UPPER_CASE_LIMIT ? asciiNumber - CYPHER_OFFSET : asciiNumber + CYPHER_OFFSET;
}

let string = 'Teachers open the door, but you must enter by yourself.';

function rot13(string) {
  let encryptedString = '';

  for (let index = 0; index < string.length; index += 1) {
    let asciiNumeric = getAsciiNumber(string, index);
    let newCharacter;
    let convertedCharacter;

    if (isNonAlphabetCharacter(asciiNumeric)) {
      encryptedString += string[index];  // adds non alphabet characters to the resulting string
     }

    if (isUppercaseCharacter(asciiNumeric)) {
      newCharacter = assignOffsetForUpperCaseLimit(asciiNumeric);
      convertedCharacter = String.fromCharCode(newCharacter);
      encryptedString += convertedCharacter;  // adds alternate uppercase characters
		}

    if (isLowercaseCharacter(asciiNumeric)) {
      newCharacter = assignOffsetForLowerCaseLimit(asciiNumeric);
      convertedCharacter = String.fromCharCode(newCharacter);
      encryptedString += convertedCharacter;  // adds alternate lowercase characters
		}
  }

  return encryptedString;
}

console.log(rot13(string));


//  ====================================== LS solution to check ======================================

function rot13(text) {
  let transformed = '';
  for (let index = 0; index < text.length; index += 1) {
    transformed += rot13Character(text[index]);
  }

  return transformed;
}

function rot13Character(char) {
  const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
  let isUpperCase = false;
  let initialIndex = ALPHABET.indexOf(char);

  // no match might mean that we are dealing with an uppercase letter
  if (initialIndex === -1) {
    initialIndex = ALPHABET.indexOf(char.toLowerCase());
    isUpperCase = true;
  }

  // if there is still no match, it's not a character between a-z
  if (initialIndex === -1) {
    return char;
  }

  let shiftedIndex = (initialIndex + 13) % 26;
  let transformed = ALPHABET[shiftedIndex];

  if (isUpperCase) {
    transformed = transformed.toUpperCase();
  }

  return transformed;
}
