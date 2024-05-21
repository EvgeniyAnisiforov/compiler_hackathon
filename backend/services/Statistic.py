from fastapi import HTTPException

from db import GetAtrb, SetAtrb
from models import Time, CodeRequest, ProgrammingLanguage


class Statistic:
    def get_time(self, user_id: int):
        times = GetAtrb(user_id, "time_python", "time_java", "time_cpp", "time_js")
        if not times:
            return False
        return Time(time_python=times[0], time_java=times[1], time_cpp=times[2], time_js=times[3])

    def update_time(self, user_id: int, lang: str, time: float):
        time_field = f"time_{lang}"
        update_result = SetAtrb(user_id, **{time_field: time})
        if not update_result:
            return False
        return {"message": "Time updated successfully", "user_id": user_id, "time": {time_field: time}}

    def get_code(self, user_id: int):
        code_info = GetAtrb(user_id, "last_code", "lang")
        if not code_info or code_info[0] is None or code_info[1] is None:
            return False
        try:
            language = ProgrammingLanguage[code_info[1]]
        except KeyError:
            raise HTTPException(status_code=400, detail="Invalid or missing programming language.")
        return CodeRequest(language=language, code=code_info[0])

    def update_code(self, user_id: int, lang: str, code: str):
        update_result = SetAtrb(user_id, last_code=code, lang=lang)
        if not update_result:
            return False
        return True
