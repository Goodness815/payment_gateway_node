const createTokenUser = (user) => {
  return {
    name: user.fullName, email: user.email, userId: user._id, app_id:user.app_id
  }
}

export default createTokenUser
