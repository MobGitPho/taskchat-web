export enum ResponseErrorCode {
  FORM_INVALID_DATA = 'form/invalid_data',

  // AUTH ERROR CODES
  AUTH_LOGIN_FAILED = 'auth/login_failed',
  AUTH_REGISTRATION_FAILED = 'auth/registration_failed',
  AUTH_MISSING_DATA = 'auth/missing_data',
  AUTH_WRONG_PASSWORD = 'auth/wrong_password',
  AUTH_USER_DISABLED = 'auth/user_disabled',
  AUTH_USER_NOT_FOUND = 'auth/user_not_found',
  AUTH_PROFILE_TYPE_NOT_FOUND = 'auth/profile_type_not_found',
  AUTH_EMAIL_ALREADY_USED = 'auth/email_already_used',
  AUTH_EMAIL_ALREADY_VERIFIED = 'auth/email_already_verified',
  AUTH_PROFILE_ALREADY_EXISTS = 'auth/profile_already_exists',
  AUTH_PROFILE_NOT_FOUND = 'auth/profile_not_found',
  AUTH_INVALID_TOKEN = 'auth/invalid_token',
  AUTH_CODE_SENDING_FAILED = 'auth/code_sending_failed',
  AUTH_CODE_VERIFICATION_FAILED = 'auth/code_verification_failed',
  AUTH_CODE_EXPIRED = 'auth/code_expired',
}
