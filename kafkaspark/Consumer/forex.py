from confluent_kafka import Producer
import json
from datetime import datetime, timedelta
# ... Phần code lấy dữ liệu từ Finviz ...
import requests
import time
def get_finviz_data(ticker, timeframe):
    # Xác định thời điểm 6 tiếng trước từ thời điểm hiện tại
    six_hours_ago = datetime.utcnow() - timedelta(hours=1)

    # Chuyển đổi thời điểm thành Unix timestamp
    timestamp_six_hours_ago = int(six_hours_ago.timestamp())

    url = "https://finviz.com/api/quote.ashx"
    params = {
        'aftermarket': 'false',
        'instrument': 'forex',
        'patterns': 'true',
        'premarket': 'false',
        'rev': "1702484426227",  # Sử dụng timestamp_six_hours_ago thay vì một giá trị cứng
        'ticker': ticker,
        'timeframe': timeframe,
        'type': 'new',
        'format': 'json'
    }

    # Sử dụng UserAgent để giả mạo trình duyệt
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}

    # Thực hiện yêu cầu API với headers giả mạo
    response = requests.get(url, params=params, headers=headers)

    # Kiểm tra xem yêu cầu có thành công không (status code 200 là thành công)
    if response.status_code == 200:
        # Chuyển đổi dữ liệu JSON thành đối tượng Python
        data = json.loads(response.text)
        # Giữ lại 10 phần tử cuối cùng của mỗi mảng
        data['volume'] =  data['volume'][-10:]
        data['date'] =  data['date'][-10:]
        data['date'] = [(datetime.utcfromtimestamp(ts) + timedelta(hours=7)).strftime('%Y%m%d%H%M') for ts in data['date']]
        data['open'] =  data['open'][-10:]
        data['high'] =  data['high'][-10:]
        data['low'] =  data['low'][-10:]
        data['close'] =  data['close'][-10:]
        return data
    else:
        print(f"Yêu cầu API không thành công. Mã trạng thái: {response.status_code}")
        print(response.text)
        return None
    
def send_data_to_kafka(producer, topic, data):
    producer.produce(topic, value=json.dumps(data).encode('utf-8'))
    # producer.produce(topic, value="data")
    producer.flush()

def main():
    # ... Các thiết lập cho Kafka ...

    ticker_input = 'USDCHF'
    timeframe_input = 'i30'
    producer = Producer({'bootstrap.servers': 'localhost:9092'})
    topic = "USDCHF_i30"

    while True:
        result = get_finviz_data(ticker_input, timeframe_input)
        print("Data:", result)

        if result:
            send_data_to_kafka(producer, topic, result)
            print("Data sent to Kafka:", result)
        else:
            print("No data to send")

        # Thay đổi thời gian nghỉ giữa các lần gửi dữ liệu nếu cần
        time.sleep(30)

if __name__ == "__main__":
    main()
