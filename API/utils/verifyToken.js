import jwt from "jsonwebtoken";
import { creatError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.acces_token;
  if (!token) {
    return next(creatError(401, "Vous n'êtes pas identifié."));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(creatError(403, "Token not valid"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(creatError(403, "Vous n'êtes pas autorisé."));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(creatError(403, "Vous n'êtes pas autorisé."));
    }
  });
};
