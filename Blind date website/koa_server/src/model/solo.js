module.exports = (Sequelize, sequelize) => {
    const solo = sequelize.define("solo", {
        id: {
            type: Sequelize.STRING(45),
            primaryKey: true,
            allowNull: false,
        },
        sex: {
            type: Sequelize.STRING(45),
            allowNull: true,
        },
        name: {
            type: Sequelize.STRING(45),
            allowNull: true,
        },
        age: {
            type: Sequelize.INTEGER(11),
            allowNull: true,
        },
        interest: {
            type: Sequelize.STRING(45),
            allowNull: true,
        },
        height: {
            type: Sequelize.INTEGER(11),
            allowNull: true,
        },
        department: {
            type: Sequelize.STRING(45),
            allowNull: true,
        },
        cum_attention: {
            type: Sequelize.INTEGER(11),
            allowNull: true,
        
        },
        address: {
            type: Sequelize.STRING(45),
            allowNull: true,
        
        },
        view: {
            type: Sequelize.STRING(45),
            allowNull: true,
        
        },
    });
    // 회원번호	성별	이름	나이	취미	키	학과	누적관심도
    solo.sync();
    return solo;
};