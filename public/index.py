import requests
import json
from lxml import html
import os


def get_listing_page_data(query, page):

    url = f"https://www.amazon.com/s/query?k={query}&page={page}&qid=1736758004&ref=sr_pg_1&xpid=EU-o9BD6zdyTp"

    payload = json.dumps({
    "customer-action": "pagination"
    })
    headers = {
    'accept': 'text/html,image/webp,*/*',
    'accept-language': 'en-US,en;q=0.9',
    'content-type': 'application/json',
    'cookie': 'session-id=130-3465553-7326360; session-id-time=2082787201l; i18n-prefs=USD; sp-cdn="L5Z9:PK"; ubid-main=132-1196430-5821054; session-token=2d+86FX2AiaXtWnVXYSExy8fwEP4CrgfpR3C3E2rtFhURnnD+eB8Wm536dQ028/4jIVqa7t1UPpXaR80XxFLBF6BBCHZhY0qCWXCPPhBoo5nwvvu/kjzzLBdQcWa2cDIe+123uSh+ZTlTXpf3OjiEzFVwn2Oi4UM8M417uJ7lMWnyAH4hM0HN6U5p+BgSgwdywo+8NLzhUM+EetzwAKBqR7SLkkfU9NKVgj87hF5/5gkSMYWHqQvi57g5rL43Q70yR/CybIgHmK8dU9JlmEh2j44i3Dz0/cWziam8IDLrCoWBfYHp73gLSQZzL8ge4uNUctuG97igjub2Iqu4feFvQ3Y9d9J9MKs; csm-hit=tb:CN8S8HT39BM1GT2KSAZ2+sa-S6WK5JD6ZVQ054RCAFD7-37JGGH883KGQ8HZRCHW0|1736576883230&t:1736576883230&adb:adblk_yes; session-token=Dx40VgiI8n3D8y7395B1lCHzvvTJ1F/R/tLfkL4Id9BGNqWI0RzGmIYWYwwDgVwN/m9iH3fC6fBhgM5Gm1tFwwYTadWgyjE8QwI1mhCuMwhGQQrD01trPH6TUkTlRPD0ps3qfCW6HfmIXLFZBqYkSP7DdT8QW6f2SjU4Y+2VksP1ol+nTW288zMeYxX/WrjkdTjEnecqb5nkcNTfShR7loSraHz35mKrXXJR6wiUiJZjtlwsfu7xOtG9KI8I3CE5oQ0TleHeRIb4qbhuqJlZpiL16wWBKtHF9Rqrd+8osCy62t/D8HU2I7iOteZlDO4eAmjpYszUxmlDMJUpufn/yMpbz5KHSoTU',
    'device-memory': '8',
    'downlink': '0.6',
    'dpr': '1',
    'ect': '3g',
    'origin': 'https://www.amazon.com',
    'priority': 'u=1, i',
    'referer': 'https://www.amazon.com/s?k=headphones&page=2&xpid=t___vXurUtCiu&qid=1736575928&ref=sr_pg_2',
    'rtt': '250',
    'sec-ch-device-memory': '8',
    'sec-ch-dpr': '1',
    'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-ch-ua-platform-version': '"15.0.0"',
    'sec-ch-viewport-width': '1243',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    'viewport-width': '1243',
    'x-amazon-rush-fingerprints': 'AmazonRushAssetLoader:1202F8AA9B9E3A62A246BF3FA42812770110C222|AmazonRushFramework:D275F3379006A0D015634656A7DC8E5E4C45D50F|AmazonRushRouter:E042EBF64E935550A69AA4A50D4E9A1B74C68F89',
    'x-amazon-s-fallback-url': 'https://www.amazon.com/s?k=headphones&qid=1736575951&xpid=t___vXurUtCiu&ref=sr_pg_1',
    'x-amazon-s-mismatch-behavior': 'FALLBACK',
    'x-amazon-s-swrs-version': '600F5C78ED431B92B1ECC892057F30A7,D41D8CD98F00B204E9800998ECF8427E',
    'x-requested-with': 'XMLHttpRequest'
    }

    response = requests.request("POST", url, headers=headers, data=payload)



    response = requests.request("POST", url, headers=headers, data=payload)


    if response.status_code == 200:
        print("Success")
        return response.text
    else:
        return None

def get_detail_page_url(response):
    tree = html.fromstring(response)
    
    urls = tree.xpath('//div[contains(@role, "listitem")]//div[contains(@class, "product-image-container")]/div/span/a/@href')

    return urls


def get_detail_page_response(url):

    # url = "https://www.amazon.com/Bluetooth-Headphones-KVIDIO-Microphone-Lightweight/dp/B09BF64J55/ref=sr_1_18?dib=eyJ2IjoiMSJ9.LFw2X6YbetXshyT1EA6-_DntEwzFnJHt3DpxcHf8l7dJm9PWAYh6TiVHEPEUkneCttkuThIvOIWmwXeO6fNntUqz0RuTZli42eGGzs-ZCAzwEKI9etwTT4YoyDJR_lz08ZBDqyCi-pBjHd2Q1VRcFQueSCHwbTS_t0jWmcuxCehgAITPGFpsgpEbEIh9JA7DzhBBCP1kiqXsJSfbdgkUeoafqQgaowPDahDzyFHQc4E.-MB0g5nZzc4-P5rJ6CWXFxEbdXCIbbOpLAHuMRQR4aI&dib_tag=se&keywords=headphones&qid=1736699167&sr=8-18&xpid=t3cwWmPPB-Jo4"

    url = "https://www.amazon.com" + url.removeprefix('\\"').removesuffix('\\"')
        
        
    payload = {}
    headers = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'accept-language': 'en-US,en;q=0.9',
    'cookie': 'session-id=130-3465553-7326360; session-id-time=2082787201l; i18n-prefs=USD; sp-cdn="L5Z9:PK"; ubid-main=132-1196430-5821054; session-token=Ht1s38xY1ze2EgBMiIglbXk4ggld6d0V5jhGnYkdakrwN0/iabYcFIIlMcltbY//c1YBNiWE/F6qp+ldEgyX4jYVhvSjVytQrq+HTe22qF2q+b6DPrgswc4wg2qC8vwSJK+vRdyFVY6sEC4d22MugZYNBrNQOXckITtYXFm9RR/9lB7S9wQrB5NbIJGWGtu7HT7c3pQu76Vngd+0HY+jiG1rnO6LWMQvwmD/kxhre35O06EM907gLLJHJE0yDk5+hp64vK8vT4J0BiLgIWKCHvkLcB6APbAKudbcx1oFQgYIg7sBj1ocjCEOFdazUL6zEujNR/ePqr3k0d9GBX5ES56GLyROLt/D; csm-hit=tb:8ANWHA7YA857WNH835PZ+sa-8ANWHA7YA857WNH835PZ-NKP1F8Y30Z000F2EF6W1|1736699932263&t:1736699932263&adb:adblk_yes; session-token=C+pWdtNgIH7EF0kNzs+5HXBNbdmNUldjzp2GsS+kal1+uuyNCeW7XZJdbZ8+F01sEkSmP6ST7htrprVV4rr0l466K515JgUbmcyu+O7aFekpPpk/Bkv0bbQ4FQjQX71oV9nTjtGmdZg7oN6X11azA8lrY35ori5Cimzl630kLxHktwhRmcvfsG1xw8bPaUv/wyiLPHvi7V7XtKzQOSqHoofHm3P9uAJ764GkYL+FPCDIkx2+frXt4znxe2SrDSs8yN5DUmJ8YibD2sIFZIdugQEubSatzWh4Eu8kaY2TUhEBOO6g7m8v/UnUDxYQDIInbSPsHPdYLPfAY9As9Pq+pGWVPP5hknE1',
    'device-memory': '8',
    'downlink': '2.55',
    'dpr': '1',
    'ect': '4g',
    'priority': 'u=0, i',
    'referer': 'https://www.amazon.com/s?k=headphones&page=2&xpid=t3cwWmPPB-Jo4&qid=1736699153&ref=sr_pg_1',
    'rtt': '300',
    'sec-ch-device-memory': '8',
    'sec-ch-dpr': '1',
    'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-ch-ua-platform-version': '"15.0.0"',
    'sec-ch-viewport-width': '1243',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    'viewport-width': '1243'
    }

    response = requests.request("GET", url, headers=headers, data=payload)

    if response.status_code == 200:
        print("Success")
        return response.text
    else:
        return None

def get_detail_page_data(res):
    tree = html.fromstring(res)
    title = tree.xpath("//div[contains(@id,'titleSection')]//span/text()")
    if title:
        title = title[0].strip()
    
    price = tree.xpath('//div[contains(@id, "corePriceDisplay")]//span[@class="aok-offscreen"]/text()')
    if price:
        price = price[0].strip()
    
    total_review = tree.xpath("//*[contains(@data-hook,'total-review-count')]//text()")
    if total_review:
        total_review = total_review[0].strip()
        
    img_url = tree.xpath("//div[contains(@id,'imgTagWrapper')]//img/@src")
    if img_url:
        img_url = img_url[0].strip()
    
    product_detail = {
        'title': title,
        'price': price,
        'total_review': total_review,
        'img_url': img_url
    }
    
    return product_detail
    
    

###############################3 main ########################
## Reading User queries file 

with open('user_queries.json', 'r', encoding='utf-8') as f:
    user_queries = json.load(f) 

listing_dict = {}

# resume from existing progress
try:
    with open('listing.json', 'r', encoding='utf-8') as f:
        listing_dict = json.load(f)
except FileNotFoundError:
    print("No existing progress found. Starting fresh.")

for i in user_queries:
    # skipping queries that are already processed
    if i in listing_dict:
        print(f"Skipping already processed query: {i}")
        continue

    temp_list = []
    print('----------------------')
    print(f"Processing query: {i}")
    
    for page in range(0, 2):
        response = get_listing_page_data(i, page+1)
        if response:
            detail_urls = get_detail_page_url(response)
            if detail_urls:
                temp_list.extend(detail_urls)
    
    listing_dict[i] = temp_list

    # saving
    with open('listing.json', 'w', encoding='utf-8') as f:
        json.dump(listing_dict, f, indent=4)  

    print(f"Progress saved for query: {i}")






# Open the JSON file and load its contents
with open('listing.json', 'r', encoding='utf-8') as f:
    listing_dict = json.load(f)

for key, value in listing_dict.items():
    print('----------------------')
    print(f"Processing category: {key}")
    counter = 0
    results = []

    # if the file already exists, load existing data to avoid duplication
    if os.path.exists(f'{key}.json'):
        with open(f'{key}.json', 'r', encoding='utf-8') as f:
            results = json.load(f)

    for i in value:
        print(f"Fetching details for: {i}")
        response = get_detail_page_response(i)
        if response:
            product_detail = get_detail_page_data(response)
            product_detail['url'] = i
            results.append(product_detail) 

        counter += 1
        if counter == 20: 
            break

    # saving
    with open(f'{key}.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=4)

    print(f"Saved details for category: {key}")
