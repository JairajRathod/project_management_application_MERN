// creating issue
export async function createIssueController() {
  try {
    // 
  } catch (error) {
    return error;
  }
}

// read all issues
export async function readIssueAllController() {
  try {
    //
  } catch (error) {
    return error;
  }
}

// read issues by id
export async function readIssueByIdController() {
  try {
    //
  } catch (error) {
    return error;
  }
}

// read member specific issue
export async function readIssueMemberController() {
  try {
    //
  } catch (error) {
    return error;
  }
}

// update issues by id
export async function updateIssueByIdController() {
  try {
    // check that the issue with the provided id exist or not
    // if not then throw error
    // if exist then check user role
    // if user id MEMBER then throw access error
    // if user is MANAGER then check is he/she is the manager of this project
    // if not then throw error
    // if yes then update the project
    // if project not updated then throw error
    // if updated then return the response
  } catch (error) {
    return error;
  }
}

// delete issue by id
export async function deleteIssueByIdController() {
  try {
    // check that the issue with the provided id exist or not
    // if not then throw error
    // if exist then check user role
    // if user id MEMBER then throw access error
    // if user is MANAGER then check is he/she is the manager of this project
    // if not then throw error
    // if yes then delete the project
    // if project not deleted then throw error
    // if deleted then return the response
  } catch (error) {
    return error;
  }
}
