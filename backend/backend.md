Стркутра проекта:

backend/
│
├── compilers/
│   ├── __init__.py
│   ├── bindings.cpp -- если будет с++
│   ├── compiler_module.so -- если будет С++
│   └── compile_code.cpp -- иначе compile_code.py
│
├── db/
│   ├── __init__.py
│   └── database.py
│
├── models/
│   ├── __init__.py
│   ├── request_models.py
│   └── user_models.py
│
├── routes/
│   ├── __init__.py
│   ├── compiler_routes.py
│   └── user_routes.py
│
├── services/
│   ├── __init__.py
│   └── compiler.py
│
├── security/
│   ├── __init__.py
│   └── auth_manager.py
│
├── main.py
├── requirements.txt
└── database.db




