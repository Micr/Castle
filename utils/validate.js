export const validateRegData = (req) => {
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    return {
      success: false,
      errors: errors.map(error => error.msg),
    };
  }

  return {
    success: true,
  };
};
