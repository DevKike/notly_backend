const { findPersonByEmail, findRoleByName, register, findRoles } = require("../service/person.service");
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
    const personEmail = await findPersonByEmail({ email });

    if (!personEmail) {
      throw new Error("Invalid email address or password. Please try again");
    }

    const passwordMatch = compare(password, person.password);

    if (!passwordMatch) {
      throw new Error("Invalid email address or password. Please try again");
    }

    const token = signToken(person.id, person.role.name);
    
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
