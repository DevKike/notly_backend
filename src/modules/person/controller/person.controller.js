const { findPersonByEmail, findRoleByName, register, findRoles, findRoleById } = require("../service/person.service");
const { hash, compare } = require("../../../util/bcrypt");
const { signToken } = require("../../../util/jwtToken");

const registerPerson = async (personData) => {
  try {
    const personEmail = personData.email;
    const isEmailExists = await findPersonByEmail(personEmail);

    if (isEmailExists) {
      throw new Error("Email already in use");
    }

    const roleName = personData.role;
    const role = await findRoleByName(roleName);

    if (!role) {
      throw new Error("Role was not found");
    }

    const roleId = role.dataValues.id;

    const password = hash(personData.password);

    const newPersonData = { ...personData, roleId, password };

    if (newPersonData.role) {
      delete newPersonData.role;
    }

    return await register(newPersonData);
  } catch (error) {
    throw error;
  }
};

const loginPerson = async ({ email, password }) => {
  try {
    const person = await findPersonByEmail(email);

    if (!person) {
      throw new Error("Invalid email address or password. Please try again");
    }

    const passwordMatch = compare(password, person.password);

    if (!passwordMatch) {
      throw new Error("Invalid email address or password. Please try again");
    }

    const roleId = person.dataValues.roleId;
    const role = await findRoleById(roleId);

    const personId = person.id;
    const roleName = role.dataValues.name;

    const token = signToken(personId, roleName);
    
    return token;
  } catch (error) {
    throw error;
  }
};

const getRoles = async () => {
  try {
    return await findRoles();
  } catch (error) {
    throw error;
  }
};

module.exports = { registerPerson, loginPerson, getRoles };
