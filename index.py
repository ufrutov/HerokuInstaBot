#!/usr/bin/env python
import os
import sys
import web
import requests

urls = (
'/', 'index'
)

class index:
    def GET(self):
        i = web.input(name=None)
        return render.index(i.name)

if __name__ == "__main__":
    app = web.application(urls, globals())
    app.run()

render = web.template.render('templates/')