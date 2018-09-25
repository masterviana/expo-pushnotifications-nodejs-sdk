var Expo = require('./build/ExpoClient.js');

var expo = new Expo.Expo();


console.log('Expo was ', new Expo.Expo())

console.log('Static methods ',expo.isExpoPushToken )


var tiagoToken = "ExponentPushToken[ku11eHOvXlU8cJOInz7JYO]"

let messages = [];
var somePushTokens = [tiagoToken];

for (let pushToken of somePushTokens) {
  // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

  // Check that all your push tokens appear to be valid Expo push tokens
  if (!expo.isExpoPushToken(pushToken)) {
    console.error(`Push token ${pushToken} is not a valid Expo push token`);
    continue;
  }

  // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
  messages.push({
    to: pushToken,
    sound: 'default',
    body: 'This is a message from masterviana',
    data: { withSome: 'data' },
  })
}

console.log('messages was ', messages);

let chunks = expo.chunkPushNotifications(messages);
let tickets = [];
(async () => {
  // Send the chunks to the Expo push notification service. There are
  // different strategies you could use. A simple one is to send one chunk at a
  // time, which nicely spreads the load out over time:
  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log('tickets  :  ', ticketChunk);
      tickets.push(...ticketChunk);
      // NOTE: If a ticket contains an error code in ticket.details.error, you
      // must handle it appropriately. The error codes are listed in the Expo
      // documentation:
      // https://docs.expo.io/versions/latest/guides/push-notifications#response-format 
    } catch (error) {
      console.error(error);
    }
  }
})();

