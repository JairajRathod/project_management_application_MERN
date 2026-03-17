// register user details
export async function signupController() {
  try {
    // checking user with email exist or not
    // if exist then throw error
    // if not exist then create user
    // check user is created or not
    // if not created then throw error
    // if created then return error
  } catch (error) {
    return error;
  }
}

// login user
export async function signinController() {
  try {
    // checking user with the provided email exist or not
    // if not exist then throw error
    // if exist then compare current password with the DB one
    // if password not matched then throw error
    // if password matched then return success and login the user
  } catch (error) {
    return error;
  }
}

// password reset otp verification
export async function resetPasswordVerificationController() {
  try {
    // check user with this email exist or not
    // if not exist then throw error
    // if exist then send verification email
    // if email not sended then throw error
    // if email sended then return the success response
  } catch (error) {
    return error;
  }
}

// reset password
export async function resetPasswordController() {
  try {
    // check otp with the provided email exist or not
    // if not exist then throw error
    // if exist then the compare the provided one with the DB
    // if otp not matched then throw error
    // if otp matched then change the passwords
    // check password changed or not
    // if not changed then throw error
    // if changed then return the success response
  } catch (error) {
    return error;
  }
}
