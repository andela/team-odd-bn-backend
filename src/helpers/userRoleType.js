
const userRoleType = async (req, roles) => {
  const { roleId } = req.user;
  const result = await roles.findOne({ where: { id: roleId } });
  const { id: dbRoleId } = result.dataValues;
  return dbRoleId;
};

export default userRoleType;
