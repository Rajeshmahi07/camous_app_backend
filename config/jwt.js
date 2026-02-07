const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRE,
  cookieExpire: process.env.JWT_COOKIE_EXPIRE,
};

module.exports = jwtConfig;