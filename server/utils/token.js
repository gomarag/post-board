require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  createAccessToken: data => {
    console.log('π ν ν° λ°κΈ λ©μλ νΈμΆ', data);
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '7d' });
  },

  // μλ‘ λ°κΈ ν ν ν° λ°ν
  sendAccessToken: (res, accessToken) => {
    res.json({ data: { accessToken }, message: 'ok' });
  },

  // μμ²­ ν€λμ ν ν° μ ν¨μ± κ²μ¬ => μ ν¨νλ©΄ ν΄λλ νμ΄λ‘λ λ°ν
  isAuthorized: req => {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      return null;
    }
    const token = authorization.split(' ')[1];

    let decoded;
    try {
      decoded = verify(token, process.env.ACCESS_SECRET);
    } catch (e) {
      if (e.message === 'jwt expired') {
        console.log('λ§λ£λ μ‘μΈμ€ ν ν°μλλ€. λ€μ λ°κΈλ°μΌμΈμ', e.message);
        return -1; // TokenExpiredError
      } else if (e.message === 'jwt malformed') {
        console.log('μ ν¨νμ§ μμ μ‘μΈμ€ ν ν°μλλ€.', e.message);
        return -2; // InvalidTokenError
      } else {
        console.log('Token Error', e.message);
        return -2; // InvalidTokenError
      }
    }
    return decoded;
  },
};
