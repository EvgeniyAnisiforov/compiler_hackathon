Дока по методам:

Пример обработки:
Метод получения времени
get http://localhost:8000/api/statistic/get_time/7(7-userid)
	
Response body
если ок
200{
  "time_python": 0,
  "time_java": 5.5,
  "time_cpp": 0,
  "time_js": 0
}
иначе
404{
  "detail": "User not found or no time data available"
}

Код:
interface TimeStatistics {
  time_python: number;
  time_java: number;
  time_cpp: number;
  time_js: number;
}

async function fetchTimeStatistics(userId: number): Promise<TimeStatistics | null> {
  const response = await fetch(`http://localhost:8000/api/statistic/get_time/${userId}`);

  if (response.ok) {
    // Если статус в диапазоне 200-299
    const data: TimeStatistics = await response.json();
    console.log("Данные времени успешно получены:", data);
    return data;
  } else if (response.status === 404) {
    // Пропускаем обработку для статуса 404
    console.log("Пользователь не найден или данных нет, статус 404.");
    return null;
  } 
}

// Использование функции
fetchTimeStatistics(7)
  .then(response => {
    if (response) {
      console.log(response);
    }
  })



<<<<<<<<<<<<<<<<<<<<<<<<</////////////////////////////ДОКА//////////////////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
---------------------------------------
Метод регистрации
post http://localhost:8000/api/users/register/
Request body:
{
  "name": "test1",
  "surname": "test1",
  "login": "test1",
  "password": "test1"
}

Response body
Если сущ
400{
  "detail": "Username already registered"
}
Иначе
200{
  "message": "User test3 created successfully"
}


---------------------------------------
Метод авторизации
post http://localhost:8000/api/users/login/
Request body
{
  "login": "test3",
  "password": "test3"
}

Response body
Если ок
200 {
  "userID": 15,
  "name": "test3",
  "surname": "test3"
}
Иначе:
401{
  "detail": "Incorrect username or password"
}
---------------------------------------
Метод получения времени
get http://localhost:8000/api/statistic/get_time/7(7-userid)
	
Response body
если ок
200{
  "time_python": 0,
  "time_java": 5.5,
  "time_cpp": 0,
  "time_js": 0
}
иначе
404{
  "detail": "User not found or no time data available"
}
---------------------------------------
Обновляет время
put http://localhost:8000/api/statistic/update_time/5(5-userid)
Request body
{
  "language": "python",
  "time": 5
}
Response body
если ок
200{
  "message": "Time updated successfully",
  "user_id": 5,
  "time": {
    "time_python": 5
  }
}
иначе
404{
  "detail": "User not found or update failed"
}
---------------------------------------
Метод компиляции кода
post http://localhost:8000/api/compile/
Request body
{
  "language": "python",
  "code": "print('ya')"
}
Response body
200{
  "result": "ya\n"
}
---------------------------------------
Показывает последний код
get http://localhost:8000/api/statistic/get_code/5(5-userid)
если ок:
Response body
200{
  "language": "python",
  "code": "updated string"
}
иначе:
404{
  "detail": "User not found or no code data available"
}
---------------------------------------
Обновляет последний код
put http://localhost:8000/api/statistic/update_code/5(5-userid)
Request body
{
  "language": "python",
  "code": "string"
}

Response body
если ок:
200
{
  "message": "Code updated successfully"
}
иначе:
404
{
  "detail": "User not found or update failed"
}
