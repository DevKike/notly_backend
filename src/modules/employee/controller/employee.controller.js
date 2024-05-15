const { findEmployeeByEmail, findRoleByName, register, findRoles, findRoleById } = require("../service/employee.service");
const { hash, compare } = require("../../../util/bcrypt");
const { signToken } = require("../../../util/jwtToken");

const registerEmployee = async (employeeData) => {
  try {
    const email = employeeData.email;
    const isEmailExists = await findEmployeeByEmail(email);

    if (isEmailExists) {
      throw new Error("Email already in use");
    }

    const roleName = employeeData.role;
    const role = await findRoleByName(roleName);

    if (!role) {
      throw new Error("Role was not found");
    }

    const roleId = role.dataValues.id;

    const password = hash(employeeData.password);

    const newEmployeeData = { ...employeeData, roleId, password };

    if (newEmployeeData.role) {
      delete newEmployeeData.role;
    }

    return await register(newEmployeeData);
  } catch (error) {
    throw error;
  }
};

const loginEmployee = async ({ email, password }) => {
  try {
    const employee = await findEmployeeByEmail(email);

    if (!employee) {
      throw new Error("Invalid email address or password. Please try again");
    }

    const passwordMatch = compare(password, employee.password);

    if (!passwordMatch) {
      throw new Error("Invalid email address or password. Please try again");
    }

    const roleId = employee.dataValues.roleId;
    const role = await findRoleById(roleId);

    const employeeId = employee.id;
    const roleName = role.dataValues.name;

    const token = signToken(employeeId, roleName);
    
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

module.exports = { registerEmployee, loginEmployee, getRoles };
