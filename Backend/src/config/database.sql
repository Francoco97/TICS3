create table usuario (
id_jardin INTEGER,
rut numeric(8,0) primary key,
nombre varchar(80),
telefono numeric(11,0),
email varchar(50),
especialidad varchar(50),
password text,
CONSTRAINT fk_jardin FOREIGN KEY(id_jardin) REFERENCES jardin(id)
);

create table privilegios (
    rut_usuario numeric(8,0),
    gestion_usuario BOOLEAN,
    gestion_ficha BOOLEAN,
    gestion_priv BOOLEAN,
    gestion_evaluacion BOOLEAN,
    gestion_infante BOOLEAN,
    administrador BOOLEAN,
    CONSTRAINT fk_rut FOREIGN KEY(rut_usuario) REFERENCES usuario(rut)
);

create table horario (
    rut_usuario numeric(8,0),
    descripcion DATE,
    fecha DATE,
    hora TIME,
    sala VARCHAR(30),
    CONSTRAINT fk_rut FOREIGN KEY(rut_usuario) REFERENCES usuario(rut)
);

create table informe (
    id INTEGER PRIMARY KEY,
    rut_infante VARCHAR(10),
    metodologia TEXT,
    CONSTRAINT fk_infante FOREIGN KEY(rut_infante) REFERENCES infante(rut)
);

create table evaluacion (
    id INTEGER PRIMARY KEY,
    id_informe INTEGER,
    nombre TEXT,
    CONSTRAINT fk_informe FOREIGN KEY(id_informe) REFERENCES informe(id)
);

create table objetivo (
    id INTEGER PRIMARY KEY,
    id_informe INTEGER,
    nombre TEXT,
    CONSTRAINT fk_informe FOREIGN KEY(id_informe) REFERENCES informe(id)
);

create table analisis (
    id_informe INTEGER,
    conclusion TEXT,
    recomendacion TEXT,
    CONSTRAINT fk_informe FOREIGN KEY(id_informe) REFERENCES informe(id)
);

create table criterio (
    id_evaluacion INTEGER,
    nombre VARCHAR(50),
    puntaje INTEGER,
    CONSTRAINT fk_evaluacion FOREIGN KEY(id_evaluacion) REFERENCES evaluacion(id)
);

create table actividad (
    id_objetivo INTEGER,
    descripcion TEXT,
    CONSTRAINT fk_objetivo FOREIGN KEY(id_objetivo) REFERENCES objetivo(id)
);

create table jardin(
id INTEGER PRIMARY KEY,
nombre varchar(80),
telefono numeric(11,0),
direccion varchar(50),
email varchar(50),
rut_admin NUMERIC(8,0)
);

create table infante(
    id_jardin INTEGER,
    rut varchar(10) PRIMARY KEY,
    nombre varchar(80),
    fecha_nacimiento date,
    ficha_clinica bytea,
    CONSTRAINT fk_jardin FOREIGN KEY(id_jardin) REFERENCES jardin(id)
);

create table apoderado(
    rut varchar(10) primary key,
    rut_infante varchar (10),
    nombre varchar(80),
    email varchar (50),
    telefono numeric(11,0),
    CONSTRAINT fk_infante FOREIGN KEY(rut_infante) REFERENCES infante(rut)
);

create table modulo (
    id_jardin INTEGER,
    duracion numeric(10,0),
    comienzo time,
    fin time,
    CONSTRAINT fk_jardin FOREIGN KEY(id_jardin) REFERENCES jardin(id)
);

insert into usuario(id_jardin,rut,nombre,telefono,email,especialidad, password)
values (0,0,'Admin',0,'admin','admin', 'admin');

insert into jardin(id,nombre,telefono,direccion,email,rut_admin, password)
values (1,'Centro nunca más solos','56992509584','Av. Cristóbal Colón 8220, Las Condes','centronuncamassolos@gmail.com','1');

insert into jardin(id)
values (0);
