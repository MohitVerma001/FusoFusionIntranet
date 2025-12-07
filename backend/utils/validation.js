import Joi from 'joi';

export const blogValidation = {
  create: Joi.object({
    title: Joi.string().required().max(500),
    excerpt: Joi.string().required().max(200),
    content: Joi.string().required(),
    cover_image_url: Joi.string().uri().allow(null, ''),
    space_id: Joi.string().uuid().required(),
    hr_category_id: Joi.string().uuid().allow(null, ''),
    category: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).default([]),
    publish_status: Joi.string().valid('draft', 'published', 'archived').default('draft'),
    visibility: Joi.string().valid('public', 'private').default('public'),
  }),

  update: Joi.object({
    title: Joi.string().max(500),
    excerpt: Joi.string().max(200),
    content: Joi.string(),
    cover_image_url: Joi.string().uri().allow(null, ''),
    space_id: Joi.string().uuid(),
    hr_category_id: Joi.string().uuid().allow(null, ''),
    category: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    publish_status: Joi.string().valid('draft', 'published', 'archived'),
    visibility: Joi.string().valid('public', 'private'),
  }),
};
