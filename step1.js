var SlackBot = require('slackbots');

var botConfig = {
    token: 'xoxb-49456502391-4vHG9Yi7kUaQGWofl0xkijZN', // Add a bot https://my.slack.com/services/new/bot and put the token
    name: 'wandlee_bot'
};

// create a bot
var bot = new SlackBot(botConfig);

bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage
    var params = {
        icon_emoji: ':cat:'
    };

    // define channel, where bot exist. You can adjust it there https://my.slack.com/services
    bot.postMessageToChannel('general', 'Hello World!', params);

    // define existing username instead of 'user_name'
    bot.postMessageToUser('igor.wandlee', 'Hello World!', params);

    // define private group instead of 'private_group', where bot exist
    bot.postMessageToGroup('wandlee_group', 'Hello World!', params);
});

/**
 * @param {object} data
 */
bot.on('message', function(message) {
    if(isChatMessage(message) && isMentioningBot(message)) {
        bot.getChannels().then(function (channels) {
            channels.channels.forEach(function(channel) {
                if(channel.id === message.channel) {
                    bot.postMessageToChannel(channel.name, "Test", {as_user: true});
                }
            })
        });
    }

//    bot.postMessageToUser('igor.wandlee', 'hi', function(data) {/* ... */});

    // all ingoing events https://api.slack.com/rtm
    console.log(message);
});

function isChatMessage(message) {
    return message.type === 'message' && Boolean(message.text);
};
function isMentioningBot(message) {
    return message.text.toLowerCase().indexOf(botConfig.name) > -1 ||
        message.text.toLowerCase().indexOf(this.name) > -1;
};