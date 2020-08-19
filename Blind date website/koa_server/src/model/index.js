const boardModel = require("./boards");
const studentModel = require("./student");
const soloModel = require("./solo");
const ticketModel = require("./ticket");
const solo_searchModel = require("./solo_search");
const refundModel = require("./refund");
// return 을 student로 하기로 했으니까

module.exports = (Sequelize, sequelize) => {
    const boards = boardModel(Sequelize, sequelize);
    const student = studentModel(Sequelize, sequelize);
    const solo = soloModel(Sequelize, sequelize);
    const ticket = ticketModel(Sequelize, sequelize);
    const solo_search = solo_searchModel(Sequelize, sequelize);
    const refund = refundModel(Sequelize, sequelize);
    return {
        boards,
        student,
        solo,
        ticket,
        solo_search,
        refund,
    };
};