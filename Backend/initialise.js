const sequelize = require('./database');
const {Project, Board, Column, Task, User, ProjectMembers} = require('./models');

(async() => {
  Project.hasMany(Board, { onDelete: 'cascade' });
  Board.belongsTo(Project);
  Board.hasMany(Column, { onDelete: 'cascade' });
  Column.belongsTo(Board);
  Column.hasMany(Task, { onDelete: 'cascade' });
  Task.belongsTo(Column);

  User.hasMany(Task, {foreignKey: 'creatorId'});
  User.hasMany(Project, {foreignKey: 'adminId'});
  
  // User.belongsToMany(Project, {foreignKey: 'adminId'});
  // Project.belongsToMany(User);
// user belongs to many belongs to project

  // ProjectMembers.hasMany(U)

  await sequelize.sync({ force:true }); // force:true   (resets db each run)
  // await sequelize.sync();
})()