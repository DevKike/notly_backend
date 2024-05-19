const { findEmployeeByEmail, findEmployeeByPhoneNumber, findRoleByName, register, findRoles, findRoleById, update, findEmployeeById } = require("../service/employee.service");
const { hash, compare } = require("../../../util/bcrypt");
const { signToken } = require("../../../util/jwtToken");

const registerEmployee = async (employeeData) => {
  try {
    const isEmailExists = await findEmployeeByEmail(employeeData.email);

    if (isEmailExists) {
      throw new Error("Email already in use");
    }

    const isPhoneNumberExists = await findEmployeeByPhoneNumber(employeeData.phoneNumber);

    if (isPhoneNumberExists) {
      throw new Error("Phone number has already been registered");
    }

    const role = await findRoleByName(employeeData.role);

    if (!role) {
      throw new Error("Role was not found");
    }

    const employee = await findEmployeeById(employeeData.employeeId);

    const companyId = employee.dataValues.companyId;

    const roleId = role.dataValues.id;

    const password = hash(employeeData.password);

    const newEmployeeData = { ...employeeData, roleId, password, companyId };

    if (newEmployeeData.employeeId) {
      delete newEmployeeData.employeeId;
    }

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

    return { token, role: roleName };
  } catch (error) {
    throw error;
  }
};

const getEmployeeData = async (employeeId) => {
  try {
    const employee = await findEmployeeById(employeeId);

    if (!employee) {
      throw new Error("Employee not found");
    }

    return employee;
  } catch (error) {
    throw error;
  }
};

const updateEmployeeData = async (employeeId, employeeData) => {
  try {
    const employee = await getEmployeeData(employeeId);

    if (employeeData?.password) {
      const password = hash(employeeData.password);
      employeeData.password = password;
    }

    const employeeToUpdate = { ...employee.toJSON(), ...employeeData };

    return await update(employeeToUpdate);
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

module.exports = { registerEmployee, loginEmployee, updateEmployeeData, getRoles };
