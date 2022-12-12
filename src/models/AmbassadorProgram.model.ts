import mongoose, { Schema, Document } from 'mongoose';

export interface IAmbassadorProgram extends Document {
  firstName: string;
  lastName: string;
  email: string;
  country: number;
  socialMedia: number;
  aboutYou: number;
  alignWithWyld: number;
  instagramHandle: string;
  youtubeHandle: string;
}

const AmbassadorProgramSchema: Schema = new Schema(
  {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    email: { type: String, default: '' },
    country: { type: String, default: '' },
    socialMedia: { type: String, default: '' },
    aboutYou: { type: String, default: '' },
    alignWithWyld: { type: String, default: '' },
    instagramHandle: { type: String, default: '' },
    youtubeHandle: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAmbassadorProgram>(
  'ambassadorprogram',
  AmbassadorProgramSchema
);
