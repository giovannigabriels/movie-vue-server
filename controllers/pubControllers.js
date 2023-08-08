if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { compare } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User, Movie, Genre } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const { hash } = require("../helpers/bcrypt");
const { Op } = require("sequelize");
const axios = require("axios");

class Controller {
  static async customerRegister(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const customer = await User.create(
        {
          username,
          email,
          password: hash(password),
          role: "customer",
          phoneNumber,
          address,
        },
        { hooks: false }
      );
      res.status(201).json({ email: customer.email });
    } catch (error) {
      next(error);
    }
  }

  static async customerLogin(req, res, next) {
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

  static async googleSignInCustomer(req, res, next) {
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
          role: "customer",
        },
        hooks: false,
      });

      const access_token = createToken({ id: user.id });
      res.status(200).json({ access_token, user });
    } catch (error) {
      next(error);
    }
  }

  static async movieCustomer(req, res, next) {
    try {
      const { page, size, title } = req.query;
      let option = { include: [Genre], where: { status: "active" } };

      if (
        page !== "" &&
        typeof page !== "undefined" &&
        size !== "" &&
        typeof size !== "undefined"
      ) {
        option.limit = size;
        option.offset = page * size - 9;
      } else {
        option.offset = 0;
      }
      if (title !== "" && typeof title !== "undefined") {
        option.where.title = {
          [Op.iLike]: `%${title}%`,
        };
      }
      const data = await Movie.findAndCountAll(option);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getOneMovie(req, res, next) {
    try {
      let id = req.params.movieId;
      const movie = await Movie.findOne({
        include: [Genre],
        where: {
          id,
        },
      });
      res.status(200).json(movie);
    } catch (error) {
      next(error);
    }
  }

  static async qrCode(req, res, next) {
    try {
      const { link } = req.query;
      const { data } = await axios({
        method: "post",
        url: "https://qrtiger.com/api/qr/static",
        data:{
          "size": 500,
          "colorDark": "rgb(5,64,128)",
          "logo": "scan_me.png",
          "eye_outer": "eyeOuter2",
          "eye_inner": "eyeInner1",
          "qrData": "pattern0",
          "backgroundColor": "rgb(255,255,255)",
          "transparentBkg": false,
          "qrCategory": "url",
          "text": `${link}`
        },
        headers: {
          "Authorization":
            `Bearer ${process.env.API_KEY_QR_TIGER}`,
        },
      });
      res.status(200).json(data.url);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
