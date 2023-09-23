import mongoose from "mongoose";
import validator from "validator";

export type TUser = {
  name: string,
  about: string,
  avatar: string,
  email: string,
  password: string,
}

const userSchema = new mongoose.Schema<TUser>({
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 200,
    default:'Исследователь',
  },
  avatar: {
    type: String,
    required: false,
    validate: {
      validator(url: string) {
        return validator.isURL(url);
      },
      message: "Incorrect url",
    },
    default:'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator(email: string) {
        return validator.isEmail(email);
      },
      message: "Incorrect Email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

export default mongoose.model<TUser>('user', userSchema);