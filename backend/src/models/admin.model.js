import { Schema, model } from "mongoose";

const adminSchema = new Schema({
  email: String,
  password: String,
});

const adminmodel = model("admin", adminSchema);

export default adminmodel;
