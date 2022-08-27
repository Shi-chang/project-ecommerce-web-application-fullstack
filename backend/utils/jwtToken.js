// This component generates and sends the jwt and the user information to the front end.

const sendToken = (user, statusCode, res) => {
    // Creates a JWT token.
    const token = user.getJwtToken();

    // Sets options for cookie. The token will be valid for 24 hours.
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }

    // Sends the user and token information to the front end.
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token
    });
};

export default sendToken;