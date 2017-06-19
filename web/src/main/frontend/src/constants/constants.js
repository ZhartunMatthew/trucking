export const DEFAULT_SELECT_VALUE = 'Not chosen';

export const MAX_LENGTH_OF_STRING = 255;
export const MAX_LENGTH_OF_TAXPAYER_NUMBER = 250;
export const MAX_LENGTH_OF_NUMERIC = 11;

export const VALIDATION_ERRORS = {
  LETTERS: 'This field must contain only letters',
  DIGITS: 'This field must be a number',
  POSITIVE_NUMBER: 'This field must contain positive number',
  LETTERS_DIGITS: 'This field must contain letters and numbers',
  LETTERS_DIGITS_HYPHEN: 'This field must contain letters, numbers and hyphen',
  LETTERS_DIGITS_SLASH: 'This field must contain letters, numbers and slash',
  LETTERS_DIGITS_HYPHEN_SPACE: 'This field must contain letters, numbers, hyphen and space',
  LETTERS_DIGITS_HYPHEN_DOT_SPACE_SLASH: 'This field must contain letters, numbers, hyphen, space, slash and dot',
  LETTERS_DIGITS_HYPHEN_UNDERSCORE_DOT_SPACE_SLASH: 'This field must contain letters, numbers, slash, underscore, space, hyphen and dot',
  INVALID_EMAIL: 'Invalid email',
  INVALID_LOGIN_PASSWORD: 'Allowable characters: letters, numbers, hyphen, underscore',
  MAX_LENGTH_OF_TAXPAYER_NUMBER: 'This field must contain not more than ' + MAX_LENGTH_OF_TAXPAYER_NUMBER + ' characters',
  MAX_LENGTH_OF_STRING: 'This field must contain not more than ' + MAX_LENGTH_OF_STRING + ' characters',
  MAX_LENGTH_OF_NUMERIC: 'This field must contain not more than ' + MAX_LENGTH_OF_NUMERIC + ' characters',
  OUT_OF_BOUNDS: 'Data is out of bounds'
};

export const WAYBILL_STATE = {
  TRANSPORTATION_STARTED: 'TRANSPORTATION_STARTED',
  TRANSPORTATION_COMPLETED: 'TRANSPORTATION_COMPLETED'
};

