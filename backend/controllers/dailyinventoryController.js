const models = require("../models");

let DailyInventory = models.DailyInventory;

/**
 * @description Summarize the input data by Date
 * @param req
 * @param res
 */
exports.getSum = function (req, res) {
    let type = req.query.type;
    DailyInventory.findAll({
        attributes: [
            [models.sequelize.fn('date_trunc', type, models.sequelize.col('date')), 'period'],
            [models.sequelize.fn('SUM', models.sequelize.col('onHandValue')), 'onHandValue']],
        group : 'period',
        raw: true,
        order: models.sequelize.literal('period ASC')
    }).then(pr => {
        res.json({ data: pr });
    });
};
