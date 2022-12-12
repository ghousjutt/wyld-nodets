import * as yup from 'yup';

export const createDto = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  country: yup.string().required(),
  socialMedia: yup.string().required(),
  aboutYou: yup.string().required(),
  alignWithWyld: yup.string().required(),
  instagramHandle: yup.string(),
  youtubeHandle: yup.string(),
});
