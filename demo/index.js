// You can use .env file to store these data
const appId = 'app-id-value';
const secretPass = 'secret-pass-value';

const Netdeal = require('../NetdealSDK.js');

// Configuring SDK
Netdeal.Configuration.appId = appId;
Netdeal.Configuration.secretPass = secretPass;
Netdeal.Configuration.enableTheCache();

// Creating entities to be integrated with Netdeal
const User1 = new Netdeal.Consumer();
User1.properties = {
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
};

const User2 = new Netdeal.Consumer();
User2.properties = {
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
};

const User3 = new Netdeal.Consumer();
User3.id = 14;
User3.name = "Tester3";
User3.email = "asdf1@afsd.com";
User3.cellphone = "41987154665244";

User3.properties = {
  "subscriber": true,
  "purchases": [
    {
      "id": 14,
      "consumer_id": 14,
      "data_compra": "2017-07-20T13:48:37+00:00"
    }
  ],
  "data_cadastro": "2018-02-01T14:28:05+00:00"
};

const Lead1 = new Netdeal.Lead();
Lead1.email = "lead1@asdf.com.br";
Lead1.consumerId = "ASDF:dfasdfasfdasdfds";
Lead1.cluster = ["politica", "economia"];

const Lead2 = new Netdeal.Lead();
Lead2.properties = {
  email: "lead2@asdf.com.br",
  consumerId: "AKS:jajsdjkldjkldjkl",
  cluster: ["politica", "economia"]
};

// The entities collections that will be synchronized with Netdeal
const collection = Netdeal.createEntitiesCollection();
collection.add(User1);
collection.addMany([User2, User3]);
collection.del(User1);
collection.addMany([Lead1, Lead2]);

// Integrating entities with Netdeal
(async () => {
  await Netdeal.integrate(collection);
})();
