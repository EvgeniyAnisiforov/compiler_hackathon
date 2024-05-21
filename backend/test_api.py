import requests
import json

# Определение данных запроса
code = """
print('hello world')
"""
data = {
    "language": "python",
    "code": f'{code}'  # Правильное использование кавычек
}

# Преобразование данных в JSON-строку
json_string = json.dumps(data)

# Определение URL для отправки запроса
url = 'http://localhost:8081/compile/'

# Заголовки запроса
headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
}

# Отправка POST-запроса
response = requests.post(url, data=json_string, headers=headers)

# Вывод ответа сервера
print(response.status_code)  # Код состояния HTTP
print(response.text)  # Тело ответа