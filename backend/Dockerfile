# back/Dockerfile

# Используем официальный образ Python
FROM python:3.9-slim

# Устанавливаем рабочую директорию
WORKDIR /app

RUN apt-get update && \
    apt-get install -y wget g++ nodejs npm && \
    apt-get clean

COPY requirements.txt .


# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем код приложения
COPY . .

# Указываем команду запуска приложения
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
#CMD ["python3", "main.py"]


