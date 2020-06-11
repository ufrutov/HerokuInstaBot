from telegram.ext import Updater, CommandHandler, MessageHandler, Filters
from telegram import InputMediaPhoto
import requests
import parse_page
import os

def start(update, context):
    update.message.reply_text('Hi!')

def help(update, context):
    update.message.reply_text('Help! Python Requests is using proxy server, it can fail sometimes.')

def echo(update, context):
    text = update.message.text
    if 'instagram.com' in text:
        output = parse_page.get(text)
        if output['success']:
            if len(output['content']) > 1:
                send = []
                for i in output['content']:
                    send.append(InputMediaPhoto(i['media']))

                update.message.reply_media_group(send)
            else:
                update.message.reply_photo(output['content'][0])
        else:
            update.message.reply_text(output['content'])
    else:
        output = 'I will wait for correct instagram link, dude.'
        update.message.reply_text(output)


def error(update, context):
    update.message.reply_text('Update "{0}" caused error "{1}"'.format(update, context.error))


def main():
    TOKEN = os.environ['TOKEN']
    APPNAME = os.environ['APPNAME']

    PORT = int(os.environ.get('PORT', '8443'))
    updater = Updater(TOKEN, use_context=True)
    dp = updater.dispatcher

    dp.add_handler(CommandHandler("start", start))
    dp.add_handler(CommandHandler("help", help))
    dp.add_handler(MessageHandler(Filters.text, echo))
    dp.add_error_handler(error)

    updater.start_webhook(listen="0.0.0.0",
                      port=PORT,
                      url_path=TOKEN)
    updater.bot.set_webhook("https://{0}.herokuapp.com/{1}".format(APPNAME, TOKEN))

    updater.idle()

if __name__ == '__main__':
    main()
