-- Script a prueba de fallos para Supabase
-- Esto borrará las tablas si existen y las volverá a crear limpias.

DROP TABLE IF EXISTS SOPORTE_TECNICO CASCADE;
DROP TABLE IF EXISTS NOTIFICACION CASCADE;
DROP TABLE IF EXISTS PARADA_INTERMEDIA CASCADE;
DROP TABLE IF EXISTS RESERVA CASCADE;
DROP TABLE IF EXISTS RUTA CASCADE;
DROP TABLE IF EXISTS TARIFA CASCADE;
DROP TABLE IF EXISTS CHAT CASCADE;
DROP TABLE IF EXISTS VIAJE CASCADE;
DROP TABLE IF EXISTS CALIFICACION CASCADE;
DROP TABLE IF EXISTS CUPON_DESCUENTO CASCADE;
DROP TABLE IF EXISTS ZONA_PREFERENCIAL CASCADE;
DROP TABLE IF EXISTS VEHICULO CASCADE;
DROP TABLE IF EXISTS UBICACION_FAVORITA CASCADE;
DROP TABLE IF EXISTS LOCALIDAD CASCADE;
DROP TABLE IF EXISTS CONDUCTOR CASCADE;
DROP TABLE IF EXISTS USUARIO CASCADE;

CREATE TABLE USUARIO (
    id_usuario     SERIAL PRIMARY KEY,
    nombre         VARCHAR(100)   NOT NULL,
    apellido       VARCHAR(100)   NOT NULL,
    correo         VARCHAR(255)   NOT NULL UNIQUE,
    telefono       VARCHAR(20),
    contrasena     VARCHAR(255)   NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado_usuario VARCHAR(20) CHECK (estado_usuario IN ('ACTIVO', 'SUSPENDIDO')),
    rol            VARCHAR(20) DEFAULT 'CLIENTE' CHECK (rol IN ('CLIENTE', 'ADMIN', 'CONDUCTOR'))
);

CREATE TABLE CONDUCTOR (
    id_conductor          SERIAL PRIMARY KEY,
    licencia              VARCHAR(20),
    experiencia           INTEGER,
    calificacion_promedio NUMERIC(3,2) CHECK (calificacion_promedio BETWEEN 1.00 AND 5.00),
    estado_conductor      VARCHAR(20) CHECK (estado_conductor IN ('ACTIVO', 'INACTIVO')),
    id_usuario            INTEGER NOT NULL UNIQUE REFERENCES USUARIO(id_usuario)
);

CREATE TABLE LOCALIDAD (
    id_localidad   SERIAL PRIMARY KEY,
    nombre_ciudad  VARCHAR(100),
    codigo_postal  VARCHAR(20)
);

CREATE TABLE UBICACION_FAVORITA (
    id_ubicacion     SERIAL PRIMARY KEY,
    nombre_ubicacion VARCHAR(50),
    direccion        VARCHAR(255),
    latitud          NUMERIC(9,6),
    longitud         NUMERIC(9,6),
    id_usuario       INTEGER REFERENCES USUARIO(id_usuario),
    id_localidad     INTEGER NOT NULL REFERENCES LOCALIDAD(id_localidad)
);

CREATE TABLE VEHICULO (
    id_vehiculo     SERIAL PRIMARY KEY,
    placa           VARCHAR(20) NOT NULL UNIQUE,
    marca           VARCHAR(50),
    modelo          VARCHAR(50),
    color           VARCHAR(30),
    capacidad       INTEGER,
    estado_vehiculo VARCHAR(20) CHECK (estado_vehiculo IN ('DISPONIBLE', 'NO_DISPONIBLE')),
    id_conductor    INTEGER NOT NULL REFERENCES CONDUCTOR(id_conductor)
);

CREATE TABLE ZONA_PREFERENCIAL (
    id_zona        SERIAL PRIMARY KEY,
    nombre_zona    VARCHAR(100),
    horario_inicio VARCHAR(10),
    horario_fin    VARCHAR(10),
    estado_zona    VARCHAR(20) CHECK (estado_zona IN ('VIGENTE', 'INACTIVA')),
    id_conductor   INTEGER NOT NULL REFERENCES CONDUCTOR(id_conductor)
);

CREATE TABLE CUPON_DESCUENTO (
    id_cupon              SERIAL PRIMARY KEY,
    codigo_cupon          VARCHAR(30) UNIQUE,
    porcentaje_descuento  NUMERIC(5,2) CHECK (porcentaje_descuento BETWEEN 0 AND 100),
    fecha_inicio          TIMESTAMP,
    fecha_fin             TIMESTAMP,
    estado_cupon          VARCHAR(20)
);

CREATE TABLE CALIFICACION (
    id_calificacion         SERIAL PRIMARY KEY,
    puntuacion              NUMERIC(2,1) CHECK (puntuacion BETWEEN 0 AND 5),
    comentario              VARCHAR(255),
    fecha_calificacion      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    USUARIO_id_usuario      INTEGER NOT NULL REFERENCES USUARIO(id_usuario),
    CONDUCTOR_id_conductor  INTEGER NOT NULL REFERENCES CONDUCTOR(id_conductor)
);

CREATE TABLE VIAJE (
    id_viaje        SERIAL PRIMARY KEY,
    estado_viaje    VARCHAR(20) CHECK (estado_viaje IN ('PROGRAMADO', 'EN_CURSO', 'COMPLETADO', 'CANCELADO')),
    fecha_viaje     TIMESTAMP,
    origen          VARCHAR(255),
    destino         VARCHAR(255),
    id_conductor    INTEGER NOT NULL REFERENCES CONDUCTOR(id_conductor)
);

CREATE TABLE CHAT (
    id_chat        SERIAL PRIMARY KEY,
    mensaje        VARCHAR(500),
    fecha_mensaje  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado_mensaje VARCHAR(20) CHECK (estado_mensaje IN ('LEIDO', 'PENDIENTE')),
    id_usuario     INTEGER NOT NULL REFERENCES USUARIO(id_usuario),
    id_viaje       INTEGER NOT NULL REFERENCES VIAJE(id_viaje)
);

CREATE TABLE TARIFA (
    id_tarifa    SERIAL PRIMARY KEY,
    costo_base   NUMERIC(8,2),
    costo_km     NUMERIC(6,2),
    costo_minuto NUMERIC(6,2),
    fecha_tarifa TIMESTAMP
);

CREATE TABLE RUTA (
    id_ruta           SERIAL PRIMARY KEY,
    distancia         NUMERIC(8,2),
    duracion_estimada INTEGER,
    estado_ruta       VARCHAR(20) CHECK (estado_ruta IN ('ACTIVA', 'INACTIVA')),
    id_viaje          INTEGER NOT NULL REFERENCES VIAJE(id_viaje),
    id_tarifa         INTEGER NOT NULL REFERENCES TARIFA(id_tarifa)
);

CREATE TABLE RESERVA (
    id_reserva        SERIAL PRIMARY KEY,
    fecha_reserva     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cantidad_asientos INTEGER,
    estado_reserva    VARCHAR(30) CHECK (estado_reserva IN ('ACTIVA', 'CANCELADA', 'COMPLETADA')),
    id_usuario        INTEGER NOT NULL REFERENCES USUARIO(id_usuario),
    id_viaje          INTEGER NOT NULL REFERENCES VIAJE(id_viaje),
    id_cupon          INTEGER REFERENCES CUPON_DESCUENTO(id_cupon)
);

CREATE TABLE PARADA_INTERMEDIA (
    id_parada        SERIAL PRIMARY KEY,
    direccion_parada VARCHAR(255),
    orden_parada     INTEGER,
    tiempo_estimado  TIMESTAMP,
    id_viaje         INTEGER NOT NULL REFERENCES VIAJE(id_viaje)
);

CREATE TABLE NOTIFICACION (
    id_notificacion SERIAL PRIMARY KEY,
    tipo            VARCHAR(50),
    mensaje         VARCHAR(255),
    fecha_envio     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario      INTEGER NOT NULL REFERENCES USUARIO(id_usuario)
);

CREATE TABLE SOPORTE_TECNICO (
    id_soporte     SERIAL PRIMARY KEY,
    descripcion    VARCHAR(500),
    fecha_soporte  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado_soporte VARCHAR(30) CHECK (estado_soporte IN ('ABIERTO', 'EN_PROCESO', 'RESUELTO')),
    id_usuario     INTEGER NOT NULL REFERENCES USUARIO(id_usuario)
);
