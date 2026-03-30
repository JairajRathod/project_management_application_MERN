// creating project
export async function createProjectController() {
  try {
    // checking the role of the user
    // if user is a member then throw access error
    // if user is MANAGER/ADMIN then create project UID
    // create project with the provided details
    // if project not created then throw error
    // if project created then return the response
  } catch (error) {
    return error;
  }
}

// read all project
export async function readAllProjectController() {
  try {
    // check that user is admin or not
    // if user is not admin then throw error
    // if user is admin then fetch all project detail
    // if project details not get then throw error
    // if get details then return response
  } catch (error) {
    throw error;
  }
}

// getting all project details by manager id
export async function readManagerProjectController() {
  try {
    // check the user role as MANAGER
    // if not MANAGER then throw error
    // if MANAGER then get all project of the user with manager role
    // if project not found then throw error
    // if found then return the result
  } catch (error) {
    throw error;
  }
}

// getting all project details of by member id
export async function readMemberProjectController() {
  try {
    // check the user role as MEMBER
    // if not MEMBER then throw error
    // if MEMBER then get all project of the user with MEMBER role
    // if project not found then throw error
    // if found then return the result
  } catch (error) {
    throw error;
  }
}

// read project with id
export async function readProjectByIdController() {
  try {
    // check that the project exist or not
    // if not exist then throw error
    // check user is the member of the project or not
    // if not then throw the error
    // if yes then return the project details
  } catch (error) {
    throw error;
  }
}

// update project by id
export async function updateProjectByIdController() {
  try {
    // check that the project exist or not
    // if not exist then throw error
    // check that user have access of the project or not
    // if user is MEMBER then throw access error
    // if user is MANAGER then check is he/she is in the project
    // if not in the project then throw error
    // if part of the project then update the project with provided details
    // check project updated or not
    // if not updated then throw error
    // if updated then return the result
  } catch (error) {
    return error;
  }
}

// delete project by id
export async function deleteProjectByIdController() {
  try {
    // check that the project exist or not
    // if not exist then throw error
    // check that user have access of the project or not
    // if user is MEMBER then throw access error
    // if user is MANAGER then check is he/she is in the project
    // if not in the project then throw error
    // if part of the project then delete the project
    // check project deleted or not
    // if not deleted then throw error
    // if deleted then return the result
  } catch (error) {
    return error;
  }
}
