module.exports = (Sequelize, sequelize) => {
    const refund = sequelize.define("refund", {
        num: {
            type: Sequelize.INTEGER(45),
            primaryKey: true,
            allowNull: false,
        },
        price: {
            type: Sequelize.INTEGER(45),
            allowNull: true,
        },
        reason: {
            type: Sequelize.STRING(45),
            allowNull: true,
        },

    });
    // 회원번호	성별	이름	나이	취미	키	학과	누적관심도
    refund.sync();
    return refund;
};