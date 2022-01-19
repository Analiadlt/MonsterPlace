const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.ENUM('created', 'processing', 'completed')},
    pay_method: { type: DataTypes.STRING },  //método de pago: efectivo, crédito, mercado pago
    payment_id: { type: DataTypes.INTEGER, defaultValue: 0}, // info Mercado Pago
    payment_status: { type: DataTypes.STRING, defaultValue: ""}, // info Mercado Pago
    merchant_order_id: { type: DataTypes.BIGINT, defaultValue: 0}, // info Mercado Pago
  },
 );
};