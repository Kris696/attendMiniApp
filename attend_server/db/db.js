const { Sequelize, DataTypes, Model } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory');

const config = require('../config/dbconfig');

// 创建sequelize对象实例
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql', //数据库类型
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    logging: false
});

// 定义模型classinfo，告诉Sequelize如何映射数据库表：
class Classinfo extends Model {}
Classinfo.init({
    // 老师id
    id: {
        type: Sequelize.INTEGER(6),
        primaryKey: true,
    },
    // 老师名字
    teacherName: {
        type: Sequelize.STRING
    },
    // 是否有课
    haveClass: {
        type: Sequelize.TINYINT
    },
}, {
    sequelize, // 我们需要传递连接实例
    modelName: 'Classinfo', // 我们需要选择模型名称
    timestamps: false,
    freezeTableName: true,
});

// 定义模型checkinfo，告诉Sequelize如何映射数据库表：
class Checkinfo extends Model {}
Checkinfo.init({
    // 检查时间
    checkDate: {
        type: Sequelize.STRING,
        // defaultValue: Sequelize.NOW,
        // primaryKey: true,
    },
    // 检查时间
    checkTime: {
        type: Sequelize.TINYINT
    },
    // 检查结果状态
    status: {
        type: Sequelize.TINYINT
    },
    // 检查异常结果备注
    checkDesc: {
        type: Sequelize.STRING
    },
    // 可以创建外键：
    check_id: {
        type: DataTypes.INTEGER(6),
        references: {
            // 这是对另一个模型的参考
            model: Classinfo,
            // 这是引用模型的列名
            key: 'id',
        }
    }, // 老师名字
    teacherName: {
        type: Sequelize.STRING
    },
    icon: { //icon-check-circle-fill:勾      icon-chahao：叉     icon-gantan：请假
        type: Sequelize.STRING,
    },
    arrive: {
        type: Sequelize.STRING
    },
    notArrive: {
        type: Sequelize.STRING
    },
    leave: {
        type: Sequelize.STRING
    }
}, {
    sequelize, // 我们需要传递连接实例
    modelName: 'Checkinfo', // 我们需要选择模型名称
    timestamps: false,
    freezeTableName: true,

});

// 模型功能语句
(async() => {
    // 测试连接
    // try {
    //     await sequelize.authenticate();
    //     console.log('Connection has been established successfully.');
    // } catch (error) {
    //     console.error('Unable to connect to the database:', error);
    // }
    // =================================
    // 关闭连接
    // await sequelize.close()
    // =================================
    // 同步模型
    // await sequelize.sync({ force: true });
    // console.log("所有模型均已成功同步.");
    // 添加课程数据
    // await Classinfo.create({
    //     id: 56,
    //     teacherName: '李一',
    //     haveClass: 1
    // });
    // 添加点到数据
    // await Checkinfo.create({
    //     checkTime: 1,
    //     status: 0,
    //     check_id: 1
    // });
})();


module.exports = {
    sequelize,
    Classinfo,
    Checkinfo
}