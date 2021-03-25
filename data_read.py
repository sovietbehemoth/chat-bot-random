import requests
import asyncio
import websockets
import threading
import json
import time
import sys
import os
import unicodedata

file = open('auth.json', 'r')
auth = json.loads(file.read())
token = str(auth['token'])
channel = str(auth['channel-id'])

m_log_id = []
m_log_c = []

#create interval
def set_interval(func, sec):
    def func_wrapper():
        set_interval(func, sec)
        func()
    t = threading.Timer(sec, func_wrapper)
    t.start()
    return t

#POST message
def message_send(location, content):
    payload = {'content': content}
    header = {'authorization': token}
    req = requests.post("https://discord.com/api/v8/channels/" + location + "/messages", data=payload, headers=header)
    if req.status_code == 404: 
        print("ClientError: Channel not found")

#message feed
def client_start():
    file_read = open('info.txt', "rt", encoding="utf-8").read()
    header = {
        'Authorization': token,
        'Connection': "keep-alive",
        }
    req = requests.get("https://discord.com/api/v8/channels/" + channel + "/messages?limit=1", headers=header)
    res = json.loads(req.text)[0]
    if (m_log_id.count(res["id"]) == 0):
        m_log_id.append(res["id"])
        m_log_c.append(res["content"])
        file_write = open('info.txt', "w", encoding="utf-8")
        file_write.write(file_read + res["content"] + "<,>")
        format_f = "{}#{}: {}"
        print(format_f.format(res["author"]["username"], res["author"]["discriminator"], res["content"]))

#user input and set interval
proc = set_interval(client_start, 0.5)
while(1):
    if input() == "_quit":
        proc.cancel()
        break
        
    else:
        message_send(channel, input())
