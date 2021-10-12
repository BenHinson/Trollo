const sequelize = require('./database');
const {Project, Board, Column, Task, User, ProjectMembers} = require('./models');



let example = {
  project: {
    members: [1,2,3],
    name: 'test',
    boards: {
      name: 'board 1'
    }
  }
}

;(async() => {
  Project.hasMany(Board, { onDelete: 'cascade' });
  Board.belongsTo(Project);
  Board.hasMany(Column, { onDelete: 'cascade' });
  Column.belongsTo(Board);
  Column.hasMany(Task, { onDelete: 'cascade' });
  Task.belongsTo(Column);

  User.hasMany(Task, {foreignKey: 'creatorId'});
  User.hasMany(Project, {foreignKey: 'adminId'});



  User.belongsToMany(Project, { as: 'Roles', through: { model: ProjectMembers, unique: false }, foreignKey: 'user_id' });
  Project.belongsToMany(User, { as: 'Users', through: { model: ProjectMembers, unique: false }, foreignKey: 'role_id' });


  // User.belongsToMany(Project, {through: ProjectMembers, as: 'projects', foreignKey: 'user_id'});
  // Project.belongsToMany(User, {through: ProjectMembers, as: 'users', foreignKey: 'project_id'});


  // Project.hasOne(User, {foreignKey: 'Parent_parentId'})
  // User.belongsTo(Project, {foreignKey: 'Parent_parentId'})

  
  // Project.hasMany(ProjectMembers)
  // ProjectMembers.belongsTo(Project)

  // User.belongsTo(ProjectMembers)

  // User.belongsToMany(Project, {foreignKey: 'adminId'});
  // Project.belongsToMany(User);
// user belongs to many belongs to project

  // ProjectMembers.hasMany(U)

  await sequelize.sync({ force:true }); // force:true   (resets db each run)
  // await sequelize.sync();
})()