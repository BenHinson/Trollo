const sequelize = require('./database');
const {Project, Board, Column, Task, User} = require('./models');

(async() => {
  Project.hasMany(Board, { onDelete: 'cascade' });
  Board.belongsTo(Project);
  Board.hasMany(Column, { onDelete: 'cascade' });
  Column.belongsTo(Board);
  Column.hasMany(Task, { onDelete: 'cascade' });
  Task.belongsTo(Column);

  User.hasOne(Task, {as: 'creator'});

  await sequelize.sync({ force:true }); // force:true   (resets db each run)
  // await sequelize.sync();
})()