const { createUserController } = require("../controller/user.controller");
const validateResource = require("../middleware/validateResource");
const { createUserSchema } = require("../schemas/user.schema");

const userRoute = async (app) => {
  app.post(
    "/api/user",
    validateResource(createUserSchema),
    createUserController
  );
};

module.exports = userRoute;
