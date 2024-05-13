const { findRoleByName, register } = require("../service/user.service");

const registerUser = async (userData) => {
  try {
    const role = await findRoleByName(userData);

    if (!role) {
      throw new Error("Role was not found");
    }
    
    const roleId = role.dataValues.id;

    const newUserData = ({ ...userData, roleId });
    delete newUserData.role;

    return await register(newUserData);
  } catch (error) {
    throw error;
  }
};

module.exports = registerUser;
