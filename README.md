# Heroku Instagram Bot

### References

* [python-telegram-bot](https://github.com/python-telegram-bot/python-telegram-bot) - pure telegram bot using Python

### Useful commands

Commit changes to Heroku server and run deploy action:
``
git add -A && git commit -m "Commit mesage" && git push heroku master
``

View Heroku server logs:
``
heroku logs --tail
``

### Instagram response fails

Instagram can avoid to send required data right for Heroku server, use proxy with Python Requests to get correct response from Instagram.