import mongoose, { Schema, Document } from "mongoose";

export interface IUrl extends Document {
  shortId: string;
  originalUrl: string;
  createdAt: Date;
}

const UrlSchema: Schema = new Schema({
  shortId: { type: String, required: true, unique: true },
  originalUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUrl>("Url", UrlSchema);
