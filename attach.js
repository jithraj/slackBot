var msg={
    "text": "Would you like to play a game?",
    "channel":'Explicitly type channel name',
    "attachments": [
        {
            "text": "Choose a game to play",
            "fallback": "You are unable to choose a game",
            "callback_id": "aspire",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": [
                {
                    "name": "google",
                    "text": "Google Search",
                    "type": "button",
                    "value": "google"
                },
                {
                    "name": "twitter",
                    "text": "Twitter",
                    "type": "button",
                    "value": "twitter"
                },
                {
                    "name": "weather",
                    "text": "Our Own App",
                    "style": "danger",
                    "type": "button",
                    "value": "weather",
                    "confirm": {
                        "title": "Are you sure?",
                        "text": "This Product is not completely ready",
                        "ok_text": "Yes",
                        "dismiss_text": "No"
                    }
                }
            ]
        }
    ]
};

var msg1={
    "text": "Would you like to play a game?",
    "response_type": "in_channel",
    "attachments": [
        {
            "text": "Choose a game to play",
            "fallback": "If you could read this message, you'd be choosing something fun to do right now.",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "callback_id": "aspire",
            "actions": [
                {
                    "name": "games_list",
                    "text": "Pick a game...",
                    "type": "select",
                    "options": [
                        {
                            "text": "Google Search",
                            "value": "google"
                        },
                        {
                            "text": "Twitter",
                            "value": "twitter"
                        },
                        {
                            "text": "Our App",
                            "value": "weather"
                        }
                    ]
                }
            ]
        }
    ]
};

var msg2={
    "text": "Search in : ",
    "attachments": [
        {
            "text": "Choose a option to try",
            "fallback": "You are unable to choose a game",
            "callback_id": "aspire",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": [
                {
                    "name": "Analyse_tweets",
                    "text": "tweets analysis",
                    "type": "button",
                    "value": "Analyse_tweets"
                },
                {
                    "name": "tweet",
                    "text": "Tweet msg",
                    "type": "button",
                    "value": "tweet"
                },
                {
                    "name":"Get_friends",
                    "text": "get friends",
                    "type": "button",
                    "value": "get_friends"
		}
            ]
        }
    ]
};

module.exports={ 
    msg:msg,
    msg1:msg1,
    msg2:msg2
};
