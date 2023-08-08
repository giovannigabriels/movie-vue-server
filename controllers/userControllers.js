if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { compare } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;
      const newAdmin = await User.create({
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });
      res.status(201).json({ message: `${newAdmin.id}, ${newAdmin.email}` });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw { name: `invalid_credentials` };
      }
      const passValid = compare(password, user.password);

      if (!passValid) {
        throw { name: `invalid_credentials` };
      }
      //sign
      const payload = {
        id: user.id,
      };
      const access_token = createToken(payload);
      res.status(200).json({ access_token, user });
    } catch (error) {
      next(error);
    }
  }

  static async googleSignIn(req, res, next) {
    try {
      const client_id = process.env.GOOGLE_CLIENT_ID;
      const { google_token } = req.headers;

      const client = new OAuth2Client(client_id);

      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: client_id, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          email: payload.email,
          username: `${payload.given_name}_${payload.family_name}`,
          password: `google`,
          role: "staff",
        },
        hooks: false,
      });

      const access_token = createToken({ id: user.id });
      res.status(200).json({ access_token, user });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
