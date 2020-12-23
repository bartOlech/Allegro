const request = require('request');
const mongoose = require('mongoose');
const tokenData = require('../model/tokenData');
const offersData = require('../model/offersData');

const nodemailer = require("nodemailer");
const cron = require('node-cron');
const moment = require('moment');

module.exports.refresh = (req, res, next) => {
  // Run task every x time
  cron.schedule('* * * * *', () => {
    // connect to database
    mongoose.connect(process.env.MONGO_AUTH, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(console.log('MongoDB conected')).catch(err => console.log(err))
    mongoose.Promise = global.Promise;

    // Get refresh token from database
    tokenData.find({}, (err, tokens) => {
      const clientId = process.env.CLIENT_ID;
      const secretKey = process.env.SECRET_KEY;
      const url = `https://allegro.pl/auth/oauth/token?grant_type=refresh_token&refresh_token=${tokens[0].refreshToken}`;
      const auth = "Basic " + new Buffer(clientId + ":" + secretKey).toString("base64");

      request(
        {
            url : url,
            headers : {
                "Authorization" : auth
            }
        },
        (error, response, body) => {
          tokenData.find({}, (err, tokens) => {
            tokenData.findOneAndUpdate({'_id': tokens[0]._id}, { refreshToken: JSON.parse(body).refresh_token }, {upsert: true}, (err, doc) => {
              console.log('\x1b[36m%s\x1b[0m', 'Refresh token has been updated');
            });
          });

          // GET DATA FROM ALLEGRO
          let offersId = [];

          offersData.find({ type: 'offers' }, (err, data) => {
            data.map((el) => {
              offersId = [...offersId, el.offerId]
            })
        
            const url = `https://api.allegro.pl/pricing/offer-quotes?offer.id=${offersId.join()}`;
            const auth = `Bearer ${JSON.parse(body).access_token}`;
          
            request(
              {
                  url : url,
                  headers : {
                      "Authorization" : auth,
                      "accept": "application/vnd.allegro.public.v1+json"
                  }
              },
              (error, response, body) => {
                  
                  const bodyObj = JSON.parse(body);
                  let fees = []

                  bodyObj.quotes.forEach((el) => {
                    if (el.fee.amount !== '0.00' && moment(el.nextDate).isBefore(moment().add('days', 2))) {
                     

                      const obj = {
                        type: el.type,
                        amount: `${el.fee.amount} zł`,
                        date: `${el.nextDate.split('T')[0]} - ${moment(el.nextDate).format("hh:mm:ss a")}`,
                        offer: el.offer.id
                      }

                      fees = [...fees, obj]
                    }
                  })
           

                  let content = fees.reduce((a, b) => {
                    return `${a}<li>${b.date}, ${b.amount}, ${b.type}, ${b.offer}</li>`
                  }, '');

                  // Send to email
                  const output = `
                    <h2 style='color: #041B15'>Nadchodzące opłaty w ciągu 2 dni:</h2>
                    <ul>
                      ${content}
                    </ul>
                  `;

                  let transporter = nodemailer.createTransport({
                      host: 'smtp.gmail.com',
                      port: 587,
                      secure: false, // true for 465, false for other ports
                      auth: {
                          user: 'sru88653@gmail.com',
                          pass: 'Forhuta123'
                      },
                      tls: {
                          rejectUnauthorized: false
                      }
                  });

                  let mailOptions = {
                      from: '"Allegro, OPŁATY olech.bartlomiej@gmail.com', // sender address
                      to: 'olech.bartlomiej@gmail.com', // list of receivers
                      subject: 'NADCHODZĄCE OPŁATY', // Subject line
                      text: '', // plain text body
                      html: output // html body
                  };

                  transporter.sendMail(mailOptions, (error, info) => {
                      if (error) {
                          return console.log(error);
                      }
                      console.log('Message sent: %s', info.messageId);
                      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                  });
              }
            );
          })

        }
      )
    })
  });
}