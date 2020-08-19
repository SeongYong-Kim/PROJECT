module.exports = (Sequelize, sequelize) => {
    const ticket = sequelize.define("ticket", {
        num: {
            type: Sequelize.STRING(45),
            primaryKey: true,
            allowNull: false,
        },
        price: {
            type: Sequelize.INTEGER(45),
            allowNull: true,
        },
        time: {
            type: Sequelize.STRING(45),
            allowNull: true,
        },
        place: {
            type: Sequelize.STRING(45),
            allowNull: true,
        },
        sold_out: {
            type: Sequelize.STRING(45),
            allowNull: true,
        },
        partner_id: {
            type: Sequelize.STRING(45),
            allowNull: true,
        },
    });
    // 회원번호	성별	이름	나이	취미	키	학과	누적관심도
    ticket.sync();
    return ticket;
};