import { fileURLToPath } from "url";
import { dirname, join } from "path";
import bcrypt from "bcrypt"
const __filename = fileURLToPath(import.meta.url);

export const __dirname = dirname(__filename);

export const pathJoin = join
export const commonErrorMessages = Object.freeze({
  INTERNAL_ERROR_STATUS: 500,
});

export const commonErrorOutput = (res, err, nfMessage) => {
  //TODO: make error classification more reliable
  console.error(err.message);

  if (err.name === "ValidationError") {
    let validationError = Object.values(err.errors)[0];
    if (validationError.name) {
      switch (validationError.name) {
        case "CastError":
          err.message =
            "Field [" +
            validationError.path +
            "] must be " +
            validationError.kind +
            " type";
          break;
        case "ValidatorError":
          err.message = "Field [" + validationError.path + "] is required";
          break;
        default:
          break;
      }
      err.status = 422;
    }
  }
  if (err.name === "CastError") {
    if (err.path && err.kind)
      err.message = "Field [" + err.path + "] must be " + err.kind + " type";
    if (nfMessage) err.message = nfMessage;
    err.status = 404;
  }
  res.status(err.status ?? 500).send({
    status: "error",
    payload: err.message,
  });
};

export const hashPassword = password=> bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword =(user, password)=> bcrypt.compareSync(password, user.password)