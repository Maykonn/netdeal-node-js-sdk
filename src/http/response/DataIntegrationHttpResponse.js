const HttpJsonResponse = require('./HttpJsonResponse.js');

class DataIntegrationHttpResponse extends HttpJsonResponse {

  constructor() {
    super();
  }

  /**
   * This is a fake until netdeal start to return the correct integrated data
   * @return {*[]}
   */
  get dataResponse() {
    return [{
      "id": 11,
      "name": "Tester1",
      "email": "asdf3@afsd.com",
      "identifier": null,
      "cellphone": "4198741244",
      "birthday": null,
      "photo": null,
      "subscriber": true,
      "purchases": [
        {
          "id": 12,
          "consumer_id": 11,
          "data_compra": "2017-07-18T13:48:37+00:00"
        }
      ],
      "data_cadastro": "2018-02-05T14:28:05+00:00"
    }, {
      "id": 12,
      "name": "Tester2",
      "email": "asdf2@afsd.com",
      "identifier": null,
      "cellphone": "41987154665244",
      "birthday": null,
      "photo": null,
      "subscriber": true,
      "purchases": [
        {
          "id": 13,
          "consumer_id": 12,
          "data_compra": "2017-07-19T13:48:37+00:00"
        }
      ],
      "data_cadastro": "2018-02-04T14:28:05+00:00"
    }];
  }

}

module.exports = DataIntegrationHttpResponse;
