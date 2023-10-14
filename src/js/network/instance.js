import axios from 'axios';
import Config from '../config/config';
import { Utils } from '../utlis/Utlis';

export const StoryInstance = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 1000,
  headers: { Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}` },
});

export const MultiPartInstance = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
    'Content-Type': 'multipart/form-data'
  },
});

export const MultiPartWithoutTokenInstance = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'multipart/form-data'
  },
});