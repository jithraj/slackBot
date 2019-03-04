var msg={
    "text": "Would you like to play a game?",
    "channel":'Explicitly type channel name',
    "attachments": [
        {
            "text": "Choose a game to play",
            "fallback": "You are unable to choose a game",
            "callback_id": "wopr_game",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": [
                {
                    "name": "game",
                    "text": "Google Search",
                    "type": "button",
                    "value": "chess"
                },
                {
                    "name": "game",
                    "text": "Twitter",
                    "type": "button",
                    "value": "maze"
                },
                {
                    "name": "game",
                    "text": "Our Own App",
                    "style": "danger",
                    "type": "button",
                    "value": "war",
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
            "callback_id": "game_selection",
            "actions": [
                {
                    "name": "games_list",
                    "text": "Pick a game...",
                    "type": "select",
                    "options": [
                        {
                            "text": "Google Search",
                            "value": "hearts"
                        },
                        {
                            "text": "Twitter",
                            "value": "bridge"
                        },
                        {
                            "text": "Our App",
                            "value": "checkers"
                        }
                    ]
                }
            ]
        }
    ]
};

module.exports={ 
    msg:msg,
    msg1:msg1
};
