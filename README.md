# Python powered Instagram save bot

### References

* [python-telegram-bot](https://github.com/python-telegram-bot/python-telegram-bot) - pure telegram bot using Python

#### Deploy using Heroku Git
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)
Use git in the command line or a GUI tool to deploy this app.

##### Install the Heroku CLI

Download and install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line).
If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.

```
$ heroku login
```

##### Clone the repository
Use Git to clone heroku-python-instagram-save's source code to your local machine.
```
$ heroku git:clone -a heroku-python-instagram-save
$ cd heroku-python-instagram-save
```

##### Deploy your changes
Make some changes to the code you just cloned and deploy them to Heroku using Git.
```
$ git add .
$ git commit -am "make it better"
$ git push heroku master
```

View Heroku server logs:
``
heroku logs --tail
``

### Instagram response fails

Instagram can avoid to send required data right for Heroku server, use proxy with Python Requests to get correct response from Instagram.