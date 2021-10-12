const sequelize = require('./database');
const {DataTypes, Model} = require('sequelize');

class Project extends Model {};
class Board extends Model {};
class Column extends Model {};
class Task extends Model {};

class User extends Model {};


class ProjectMembers extends Model {};


Project.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'project',
    timestamps: false
  }
)
Board.init({
    name: DataTypes.STRING,
    background: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'board',
    timestamps: false
  }
)
Column.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'column',
    timestamps: false
  }
)
Task.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    assigned: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'task',
    timestamps: false
  }
)

User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    avatar: DataTypes.STRING,
    cookieKey: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
    timestamps: false
  }
)

ProjectMembers.init({
    // projectId: DataTypes.STRING,
    // userId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'members',
    timestamps: false
  }
)

module.exports = {Project, Board, Column, Task, User, ProjectMembers};