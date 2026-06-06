import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

import { TAGS } from '../constants/tags.js';

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS),
    search: Joi.string().trim().allow(''),
  }),
};

const validateObjectId = (value, helpers) => {
  return !isValidObjectId(value)
    ? helpers.message('Невірний формат ID')
    : value;
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(validateObjectId).required(),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      'string.base': 'Назва має бути рядком',
      'string.min': 'Назва повинна містити щонайменше 1 символ',
      'any.required': "Назва є обов'язковою",
    }),
    content: Joi.string().allow('').messages({
      'string.base': 'Зміст має бути рядком',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .messages({
        'any.only': `Теги повинні бути одним з наступних: ${TAGS.join(', ')}`,
      }),
  }),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(validateObjectId).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).messages({
      'string.base': 'Назва має бути рядком',
      'string.min': 'Назва повинна містити щонайменше 1 символ',
    }),
    content: Joi.string().allow('').messages({
      'string.base': 'Зміст має бути рядком',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .messages({
        'any.only': `Теги повинні бути одним з наступних: ${TAGS.join(', ')}`,
      }),
  }).min(1),
};
