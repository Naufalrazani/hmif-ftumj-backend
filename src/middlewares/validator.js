import Joi from "joi";

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "fail",
        message: error.details[0].message.replace(/"/g, ""),
      });
    }
    next();
  };
};

export const activitySchema = Joi.object({
  title: Joi.string().min(5).required(),
  description: Joi.string().min(10).required(),
  date: Joi.date().required(),
  department: Joi.string().max(10).allow(""),
  status: Joi.string().valid("mendatang", "selesai", "berlangsung").required(),
  image_url: Joi.string().uri().allow(""),
});

export const articleSchema = Joi.object({
  title: Joi.string().min(10).required(),
  content: Joi.string().min(50).required(),
  category: Joi.string().required(),
  thumbnail_url: Joi.string().uri().allow(""),
  is_published: Joi.boolean(),
});

export default validateRequest;
