var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.PORT;

var app = express();
var router = express.Router();

router.get('/', function (req,res,next) {
  req.url = '/index.html';
  next();
});

app.use(router);

const express=require('express')
const app=express()
const appData=require('./data/data.json')
const seller=appData.seller
const goods=appData.goods
const ratings=appData.ratings

const apiRoutes=express.Router()


apiRoutes.get('/seller',function (req,res) {
  res.json({
    errno:0,
    data:seller
  });
});

apiRoutes.get('/goods',function (req,res) {
  res.json({
    errno:0,
    data:goods
  });
});

apiRoutes.get('/ratings',function (req,res) {
  res.json({
    errno:0,
    data:ratings
  });
});
app.use('/api',apiRoutes);
app.use(express.static('./dist'));

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})

// before(app) {
//   app.get('/api/seller', (req, res) => {
//     res.json({
//       // 这里是你的json内容
//       errno: 0,
//       data: seller
//     })
//   }),
//     app.get('/api/goods', (req, res) => {
//       res.json({
//         // 这里是你的json内容
//         errno: 0,
//         data: goods
//       })
//     }),
//     app.get('/api/ratings', (req, res) => {
//       res.json({
//         // 这里是你的json内容
//         errno: 0,
//         data: ratings
//       })
//     })
// }
