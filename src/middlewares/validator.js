import Joi from "joi";

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        status: "fail",
        errors: error.details.map((detail) => detail.message.replace(/"/g, "")),
      });
    }

    req.body = { ...req.body, ...value };
    next();
  };
};

export const activitySchema = Joi.object({
  title: Joi.string().min(5).max(255).required(),
  description: Joi.string().min(10).required(),
  date: Joi.date().required(),
  department: Joi.string().max(10).allow(""),
  status: Joi.string().valid("upcoming", "completed", "ongoing").required(),
  image_url: Joi.string().uri().allow(null, ""),
});

export const articleSchema = Joi.object({
  title: Joi.string().min(10).max(255).required(),
  slug: Joi.string().required(),
  content: Joi.string().min(50).required(),
  category: Joi.string().max(50).required(),
  image_url: Joi.string().uri().allow(null, ""),
  is_published: Joi.boolean().default(false),
});

export const departmentSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().allow("", null),
  image_url: Joi.string().uri().allow(null, ""),
});

export const memberSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  npm: Joi.string().min(8).max(25).required(),
  role: Joi.string().max(25).required(),
  department_id: Joi.number().integer().allow(null),
  period: Joi.string().length(9).required(),
  image_url: Joi.string().uri().allow(null, ""),
  instagram_url: Joi.string().uri().allow(null, ""),
  linkedin_url: Joi.string().uri().allow(null, ""),
  is_active: Joi.boolean().default(true),
});

export const inforallSchema = Joi.object({
  title: Joi.string().min(5).max(255).required(),
  type: Joi.string().max(50).required(),
  deadline: Joi.date().allow(null),
  image_url: Joi.string().uri().allow(null, ""),
  link_registration: Joi.string().uri().allow(null, ""),
  description: Joi.string().allow("", null),
});

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const subscriberSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Format email tidak valid",
      "any.required": "Email wajib diisi",
    }),
  is_active: Joi.boolean().default(true),
});

export default validateRequest;
