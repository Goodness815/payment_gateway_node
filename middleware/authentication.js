import { isTokenValid } from "../utils/jwt.js";

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(200)
      .json({ success: false, message: "Unauthorized access!" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { name, userId } = isTokenValid({ token });
    req.user = { name, userId };
    next();
  } catch (error) {
    return res
      .status(200)
      .json({ success: false, message: "Kindly Logout and login again!" });
  }
};

export { authenticateUser };
