import Joi from 'joi';

export const authValidation = {
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    full_name: Joi.string().required().max(255),
    role: Joi.string().valid('admin', 'internal', 'external').default('internal'),
    department_id: Joi.string().uuid().allow(null, ''),
    job_title: Joi.string().max(255).allow(null, ''),
    phone: Joi.string().max(50).allow(null, ''),
    location: Joi.string().max(255).allow(null, ''),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export const userValidation = {
  create: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    full_name: Joi.string().required().max(255),
    role: Joi.string().valid('admin', 'internal', 'external').required(),
    department_id: Joi.string().uuid().allow(null, ''),
    job_title: Joi.string().max(255).allow(null, ''),
    phone: Joi.string().max(50).allow(null, ''),
    location: Joi.string().max(255).allow(null, ''),
    is_active: Joi.boolean().default(true),
  }),

  update: Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(6),
    full_name: Joi.string().max(255),
    role: Joi.string().valid('admin', 'internal', 'external'),
    department_id: Joi.string().uuid().allow(null, ''),
    job_title: Joi.string().max(255).allow(null, ''),
    phone: Joi.string().max(50).allow(null, ''),
    location: Joi.string().max(255).allow(null, ''),
    is_active: Joi.boolean(),
  }),
};

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
