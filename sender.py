import requests, random, time

# Replace this with your own Apps Script web app URL (it ends in /exec).
# Keep your real URL private and never upload it to GitHub.
URL = "PASTE_YOUR_REAL_LINK_HERE"

for i in range(10):
    temp = round(random.uniform(22, 35), 1)
    hum = round(random.uniform(35, 70), 1)
    reply = requests.get(URL, params={"temp": temp, "hum": hum})
    print(i + 1, "sent", temp, hum, "->", reply.status_code, reply.text)
    time.sleep(5)
