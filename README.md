# Netdeal Node.js SDK

Backend Node.js SDK that allows you to integrate your Users with [Netdeal Services](http://www.netdeal.com.br/). 
You can use this SDK in [Serverless Architectures](https://serverless.com/) too ([AWS Lambda](https://aws.amazon.com/lambda/), [Azure Functions](https://azure.microsoft.com/en-us/services/functions/), [Google Functions](https://cloud.google.com/functions/), etc). 
That was the main reason why javascript was chosen to write this SDK.

## Installation

```
npm i netdeal-node-js-sdk
```

## How to use

### Configuration

First, you need to import the SDK and configure the app id and secret pass - provided by Netdeal:  

```JS
const Netdeal = require('netdeal-node-js-sdk');
    
Netdeal.Configuration.appId = 'app-id-value';
Netdeal.Configuration.secretPass = 'secret-pass-value';
```

This SDK provides an integration cache layer that saves a lot of network requests for you.
[Learn more about the Cache Layer](https://github.com/Maykonn/netdeal-node-js-sdk#how-the-cache-layer-works): 

```JS
Netdeal.Configuration.enableTheCache(
  Netdeal.Configuration.cache.supportedMethods.REDIS, // Currently only Redis is supported 
  'my-redis-server-endpoint',
  'my-redis-server-endpoint-port',
)
```

### Integrating Entities

This SDK works with Entities Collections, to facilitate the integration of one or many users at the same time. 
Note that 1000 is the maximum supported amount of entities integrated with one integration call.
  
Note that you have two ways to populate the user data and that exists two different Entities objects (you can integrate
your Users and/or your Leads). [Learn more about the Netdeal Integration API](http://www.netdeal.com.br/documentation/#data-integration):

```JS
// Populating the Lead1 data
const Lead1 = new Netdeal.Lead();
Lead1.email = "lead1@email.com";
Lead1.consumerId = "SOMETHING:asdfasdfasdf";
Lead1.cluster = ["politics", "economy"];
  
// Populating the User1 data
const User1 = new Netdeal.Consumer();
User1.id = 1;
User1.name = "User1";
User1.email = "user1@email.com";
User1.cellphone = "+5541987541";
  
// Populating the User2 data
const User2 = new Netdeal.Consumer();
User2.properties = {
  "id": 2,
  "name": "User2",
  "email": "user1@email.com",
  "identifier": null,
  "cellphone": "4198741244",
  "birthday": null,
  "photo": null,
  "subscriber": true,
  "created_at": "2018-02-05T14:28:05+00:00",
  "purchases": [
    {
      "id": 1234,
      "consumer_id": 2,
      "created_at": "2017-07-18T13:48:37+00:00"
    },
    {
      "id": 9874,
      "consumer_id": 2,
      "created_at": "2017-07-19T14:42:21+00:00"
    }
  ]
};
```

Once you have configured your entities (may you can use a loop, or a map function when integrating many users), you can populate 
the entities collection and call the `Netdeal.integrate()` method to finalize the integration:

```JS
// The entities collections that will be integrated with Netdeal
const collection = Netdeal.createEntitiesCollection();
collection.add(Lead1);
collection.addMany([User1, User2]);
  
// Integrating entities with Netdeal
(async () => {
  const response = await Netdeal.integrate(collection);
  console.log('response');
  console.log(response);
})();
```

## How the Cache Layer works

Once enabled the cache system creates a hash for each of your users integrated with Netdeal. 
Therefore, if you try to resent an already integrated user that don't have any changes in him attributes the SDK don't 
will call the Netdeal Integration API, avoiding the integration request. 
  
Once existing a minimal changing in any user attribute the current hash don't will match the cached hash and the 
[Netdeal Integration API](http://www.netdeal.com.br/documentation/#data-integration) will be called and the hash updated for this user.
   
The SDK caches the Netdeal Access Token to avoid a new request to the [Netdeal Authentication API](http://www.netdeal.com.br/documentation/#authentication) 
before 30 minutes. In other words, the Access Token has a TTL of 30 minutes. 

# Community Support

If you need help with this bundle please consider [open a question on StackOverflow](https://stackoverflow.com/questions/ask)
using the `netdeal` tag, it is the official support platform for this bundle.

Github Issues are dedicated to bug reports and feature requests.

# Contributing

You can contribute to this project cloning this repository and in your clone, you just need to create a new branch using a 
name related to the new functionality which you'll create.  
When you finish your work, you just need to create a pull request which will be revised, merged to master branch (if the code 
doesn't break the project) and published as a new release.

<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=N72BSYR3XE3LS&item_name=Through+your+donation,+I+can+keep+an+active+support+and+improvements+to+this+tool.+Or+may+you+want+to+thanks+me+%3A%29&currency_code=BRL&source=url
" target="_blank"><img alt="Donate" border="0" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" /></a>
