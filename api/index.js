//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const http = require('./src/app.js');
const ServerIo = require('./src/socket/Serverio');
//require('dotenv').config();
//const {PORT} = process.env;




const { conn } = require('./src/db.js');




// Syncing all the models at once.

  conn.sync({ force: false}).then(() => {
    http.listen(process.env.PORT, () => {
      console.log('listening at: ', process.env.PORT); // eslint-disable-line no-console
    });
  });

ServerIo(http)
