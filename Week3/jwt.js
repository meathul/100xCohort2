const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const {z} = require('zod');
const credentialsSchema = z.object({
    username: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long")
});
const app= require('express')();
app.use(require('express').json());

/**
 * Generates a JWT for a given username and password.
 *
 * @param {string} username - The username to be included in the JWT payload.
 *                            Must be a valid email address.
 * @param {string} password - The password to be included in the JWT payload.
 *                            Should meet the defined length requirement (e.g., 6 characters).
 * @returns {string|null} A JWT string if the username and password are valid.
 *                        Returns null if the username is not a valid email or
 *                        the password does not meet the length requirement.
 */
function signJwt(username, password) {
    const parsed=credentialsSchema.safeParse({username, password});
    if (!parsed.success)  return null;
    return jwt.sign({username: parsed.data.username}, jwtPassword, { expiresIn: '1h' });
}

/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */
function verifyJwt(token) {
    try{
        jwt.verify(token, jwtPassword);
        return true;
    } catch (error) {
        return false;
    }
    
}

/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {object|false} The decoded payload of the JWT if the token is a valid JWT format.
 *                         Returns false if the token is not a valid JWT format.
 */
function decodeJwt(token) {
    if(typeof token!="string") return false;
    const decoded=jwt.decode(token);
    return decoded || false;
}

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
