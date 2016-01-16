/*
    
Usuario:
    Nombre
    Correo
    Clave

Grupo:
    Admins
    Mensajes
    
Mensaje:
    Usuario
    Contenido
    Fecha

*/

var usuarios = [
    {
        "Nombre": "Pepe",
        "Correo": "pepe@correo.com",
        "Clave": "pepito123"
    },
    {
        "Nombre": "Paco",
        "Correo": "paco@correo.com",
        "Clave": "paco123"
    }
];

var grupos = [
    {
        "Usuarios": ["pepe@correo.com", "paco@correo.com"],
        "Mensajes": [
            {
                "Usuario": "pepe@correo.com",
                "Contenido": "Hola a todos",
                "Fecha": "2016-01-15T23:00:00Z"
            },
            {
                "Usuario": "paco@correo.com",
                "Contenido": "Hola pepe que pasa?",
                "Fecha": "2016-01-16T00:00:00Z"
            }
        ]
    }
]