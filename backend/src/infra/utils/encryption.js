let jwt = require('jsonwebtoken');

class Encryption {
  constructor(secret) {
    this.jwtSecret = secret;
  }

  async signToken(data) {
    return jwt.sign(data, this.jwtSecret, {
      expiresIn: '24h',
    });
  }

  async verifyToken(token) {
    // Assign jwt token
    const secret = this.jwtSecret;
    return jwt.verify(token, secret);
  }

  async verifyAccessToken(token) {
    return { server: token };
  }

  static async validateAccessToken(token, secret) {
    return secret === token;
  }
}

module.exports = Encryption;
