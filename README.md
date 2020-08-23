# Heroku Instagram Bot

### GitHub pages

[ufrutov.github.io/HerokuInstaBot](https://ufrutov.github.io/HerokuInstaBot/)

### References

* [Heroku Node Tekegram Bot](https://github.com/volodymyrlut/heroku-node-telegram-bot) - pure telegram bot using node.js
* [Node Telegram Bot API](https://github.com/yagop/node-telegram-bot-api/blob/master/doc/tutorials.md) - Api that make magic
* [Instagram Save](https://www.npmjs.com/package/instagram-save) - npm package for Insragram post retrieving

Follow steps from [Heroku Node Tekegram Bot](https://github.com/volodymyrlut/heroku-node-telegram-bot) repo and run it at Heroku server

### Useful commands

Commit changes to Heroku server and run deploy action:
``
git add -A && git commit -m "Commit mesage" && git push heroku master
``

View Heroku server logs:
``
heroku logs --tail
``