DROP DATABASE IF EXISTS Repertorio;
CREATE DATABASE Repertorio;

USE Repertorio;

CREATE TABLE Pais(
    idPais INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(50),
    Nacionalidad VARCHAR(70),
    Continente VARCHAR(50),
    Bandera TEXT
);

CREATE TABLE Instrumento(
    idInstrumento INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(70),
    Descripcion TEXT,
    Foto TEXT
);

CREATE TABLE Artista(
    idArtista INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(70),
    NombreArtistico VARCHAR(50),
    Genero CHAR,
    FechaNacimiento DATE,
    FechaFinado VARCHAR(50),
    Estatura DOUBLE,
    idNacionalidad INT,
    Instrumentos TEXT,
    TipoVoz VARCHAR(50),
    Foto TEXT,
    FOREIGN KEY (idNacionalidad) REFERENCES Pais(idPais) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Grupo(
    idGrupo INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(50),
    Origen VARCHAR(200),
    Genero VARCHAR(200),
    Inicio DATE,
    Fin VARCHAR(50),
    Sellos VARCHAR(150),
    Estado VARCHAR(50),
    SitioWeb VARCHAR(50),
    Idioma VARCHAR(50),
    Logo TEXT
);

CREATE TABLE Artista_Grupo(
    Codigo INT PRIMARY KEY AUTO_INCREMENT,
    idArtista INT,
    idGrupo INT,
    FechaInicio DATE,
    FechaFin VARCHAR(50),
    FOREIGN KEY (idArtista) REFERENCES Artista(idArtista) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (idGrupo) REFERENCES Grupo(idGrupo) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Disquera(
    idDisquera INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(60),
    Fundacion DATE,
    Fundador VARCHAR(100),
    Generos VARCHAR(100),
    idPais INT,
    Logo TEXT,
    FOREIGN KEY (idPais) REFERENCES Pais(idPais) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Album(
    idAlbum INT PRIMARY KEY AUTO_INCREMENT,
    idGrupo INT,
    idDisquera INT,
    Nombre VARCHAR(60),
    Duracion TIME,
    Lanzamiento DATE,
    Grabacion VARCHAR(200),
    Genero VARCHAR(100),
    Portada TEXT,
    FOREIGN KEY (idGrupo) REFERENCES Grupo(idGrupo) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (idDisquera) REFERENCES Disquera(idDisquera) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Canciones(
    idCancion INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(70),
    Duracion TIME,
    Publicacion DATE,
    Genero VARCHAR(100),
    Interpretacion VARCHAR(50),
    idGrupo INT,
    FOREIGN KEY (idGrupo) REFERENCES Grupo(idGrupo) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Canciones_Album(
    Codigo INT PRIMARY KEY AUTO_INCREMENT,
    idAlbum INT,
    idCancion INT,
    Numero INT,
    FOREIGN KEY (idAlbum) REFERENCES Album(idAlbum) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (idCancion) REFERENCES Canciones(idCancion) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Instrumento_Artista(
    Codigo INT PRIMARY KEY AUTO_INCREMENT,
    idArtista INT,
    idInstrumento INT,
    FOREIGN KEY (idArtista) REFERENCES Artista_Grupo(Codigo)  ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (idInstrumento) REFERENCES Instrumento(idInstrumento)  ON UPDATE CASCADE ON DELETE CASCADE
);

/* ------------------------------------------------------------------------------------- FUNCIONES ------------------------------------------------------------------------------------- */
DROP FUNCTION IF EXISTS Mayuscula;
DELIMITER $$
CREATE FUNCTION Mayuscula (cadena TEXT)
RETURNS TEXT
DETERMINISTIC
BEGIN
	DECLARE pos INT DEFAULT 0; 
	DECLARE tmp TEXT DEFAULT ''; 
	DECLARE result TEXT DEFAULT ''; 
	REPEAT SET pos = LOCATE(' ', cadena); 
	 IF pos = 0 THEN SET pos = CHAR_LENGTH(cadena); 
	 END IF; 
	 SET tmp = LEFT(cadena,pos); 
	 IF CHAR_LENGTH(tmp) < 4 THEN SET result = CONCAT(result, tmp); 
	 ELSE SET result = CONCAT(result, UPPER(LEFT(tmp,1)),SUBSTR(tmp,2)); 
	 END IF; 
	 SET cadena = RIGHT(cadena,CHAR_LENGTH(cadena)-pos); 
	UNTIL CHAR_LENGTH(cadena) = 0 END REPEAT; 
RETURN result; 
END$$

DELIMITER ;

/* --------------------------------------------------------------------------------------- VISTAS --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------- ARTISTA --------------------------------------------------------------------- */
CREATE OR REPLACE VIEW
Vista_Artista AS
SELECT
a.idArtista,
a.Nombre,
a.NombreArtistico,
IF (a.Genero = 'H', 'Hombre', 'Mujer') AS Genero,
a.FechaNacimiento,
a.FechaFinado,
CASE
    WHEN a.FechaFinado IS NULL OR a.FechaFinado <= 0 THEN CONCAT_WS(' ', TIMESTAMPDIFF(YEAR, a.FechaNacimiento, NOW()), 'años')
    WHEN a.FechaFinado <= 0 THEN 'Fecha Invalida'
    WHEN a.FechaNacimiento <= a.FechaFinado THEN CONCAT_WS(' ', TIMESTAMPDIFF(YEAR, a.FechaNacimiento, a.FechaFinado), 'años')
    ELSE 'Fecha Invalida'
END AS Edad,
FORMAT(a.Estatura, 2) AS Estatura,
CONCAT_WS(' - ', Pais.Nombre, Pais.Nacionalidad) AS Pais,
Mayuscula(a.Instrumentos) AS Instrumentos,
a.TipoVoz,
a.Foto
FROM Artista AS a
    INNER JOIN Pais ON a.idNacionalidad = Pais.idPais
ORDER BY Nombre;

/* ---------------------------------------------------------------------- GRUPO ---------------------------------------------------------------------- */
CREATE OR REPLACE VIEW
Vista_Grupo AS
SELECT 
G.idGrupo,
G.Nombre,
SUM(G.Albumes) AS Albumes,
SUM(G.Cancion) AS Cancion,
G.Origen,
Mayuscula(G.Genero) AS Genero,
G.FechaInicio,
G.Sellos,
G.Estado,
G.SitioWeb,
G.Idioma,
G.Logo
FROM(
    SELECT 
    a.idGrupo,
    a.Nombre,
    COUNT(idAlbum) AS Albumes,
    0 AS Cancion,
    a.Origen,
    a.Genero,
    DATE_FORMAT(a.Inicio, "%Y") AS FechaInicio,
    a.Sellos,
    a.Estado,
    a.SitioWeb,
    a.Idioma,
    a.Logo
    FROM Grupo AS a
    LEFT JOIN Album as c2 ON a.idGrupo = c2.idGrupo
    GROUP BY (a.idGrupo)

    UNION ALL

    SELECT
    b.idGrupo,
    b.Nombre,
    0 AS Albumes,
    COUNT(idCancion) AS Cancion,
    b.Origen,
    b.Genero,
    DATE_FORMAT(b.Inicio, "%Y") AS FechaInicio,
    b.Sellos,
    b.Estado,
    b.SitioWeb,
    b.Idioma,
    b.Logo
    FROM Grupo AS b
    LEFT JOIN Canciones AS c1 ON b.idGrupo = c1.idGrupo
    GROUP BY (b.idGrupo)
) AS G 
GROUP BY G.idGrupo
ORDER BY (G.Nombre);

/* ------------------------------------------------------------------ ARTISTA GRUPO ------------------------------------------------------------------ */
CREATE OR REPLACE VIEW
Vista_GrupoIntegrantes AS
SELECT
Artista_Grupo.Codigo,
Artista.idArtista,
Grupo.idGrupo,
Artista.NombreArtistico,
Artista.Nombre,
IF (Artista.Genero = 'H', 'Hombre', 'Mujer') AS Genero,
Artista.FechaNacimiento,
GROUP_CONCAT(Instrumento.Nombre ORDER BY Instrumento.Nombre SEPARATOR ', ' ) AS Instrumento,
CASE
    WHEN Artista.FechaFinado IS NULL OR Artista.FechaFinado <= 0 THEN CONCAT_WS(' ', TIMESTAMPDIFF(YEAR, Artista.FechaNacimiento, NOW()), 'años')
    WHEN Artista.FechaFinado <= 0 THEN 'Fecha Invalida'
    WHEN Artista.FechaNacimiento <= Artista.FechaFinado THEN CONCAT_WS(' ', TIMESTAMPDIFF(YEAR, Artista.FechaNacimiento, Artista.FechaFinado), 'años')
    ELSE 'Fecha Invalida'
END AS Edad,
CONCAT_WS(' - ', Pais.Nombre, Pais.Nacionalidad) AS Pais,
Artista.TipoVoz,
Artista.Foto,
CASE
    WHEN Artista_Grupo.FechaFin IS NULL OR Artista_Grupo.FechaFin <= 0 THEN CONCAT_WS(' - ', YEAR(Artista_Grupo.FechaInicio), 'Actualidad')
    ELSE CONCAT_WS(' - ', YEAR(Artista_Grupo.FechaInicio), YEAR(Artista_Grupo.FechaFin))
END AS Periodo,
Grupo.Nombre AS Grupo
FROM Artista
    INNER JOIN Pais ON Artista.idNacionalidad = Pais.idPais
    LEFT JOIN Artista_Grupo ON Artista.idArtista = Artista_Grupo.idArtista
    LEFT JOIN Grupo ON Grupo.idGrupo = Artista_Grupo.idGrupo
    LEFT JOIN Instrumento_Artista ON Artista_Grupo.Codigo = Instrumento_Artista.idArtista
    LEFT JOIN Instrumento ON Instrumento_Artista.idInstrumento = Instrumento.idInstrumento
GROUP BY Grupo.idGrupo, Artista.idArtista
ORDER BY Artista.Nombre, Instrumento.Nombre, FechaInicio;

/* ---------------------------------------------------------------- INSTRUMENTO ARTISTA ---------------------------------------------------------------- */
CREATE OR REPLACE VIEW
Vista_InstrumentoIntegrantes AS
SELECT
Instrumento_Artista.Codigo,
Instrumento_Artista.idArtista,
Instrumento_Artista.idInstrumento,
Artista.NombreArtistico AS Artista,
Artista.Nombre,
Artista.Foto,
Grupo.Nombre AS Grupo,
Instrumento.Nombre AS Instrumento
FROM Instrumento_Artista
    INNER JOIN Instrumento ON Instrumento.idInstrumento = Instrumento_Artista.idInstrumento
    INNER JOIN Artista_Grupo ON Artista_Grupo.Codigo = Instrumento_Artista.idArtista
    INNER JOIN Artista ON Artista_Grupo.idArtista = Artista.idArtista
    INNER JOIN Grupo ON Artista_Grupo.idGrupo = Grupo.idGrupo
ORDER BY Artista.Nombre, Grupo.Nombre, Instrumento.Nombre;

/* --------------------------------------------------------------------- DISQUERA --------------------------------------------------------------------- */
CREATE OR REPLACE VIEW
Vista_Disquera AS
SELECT
Disquera.idDisquera,
Disquera.Nombre,
Disquera.Fundacion,
Disquera.Fundador,
Mayuscula(Disquera.Generos) AS Generos,
Pais.Nombre AS Pais,
Disquera.Logo
FROM Disquera
INNER JOIN Pais ON Disquera.idPais = Pais.idPais
ORDER BY Nombre;

/* ---------------------------------------------------------------------- ALBUM ---------------------------------------------------------------------- */
CREATE OR REPLACE VIEW
Vista_Album AS
SELECT
A.idAlbum,
G.idGrupo,
A.Nombre AS Nombre,
G.Nombre AS Grupo,
COUNT(Canciones_Album.idCancion) AS Canciones,
D.Nombre AS Disquera,
IF(DATE_FORMAT(A.Duracion, "%H") = '00', DATE_FORMAT(A.Duracion, "%i:%s"), DATE_FORMAT(A.Duracion, "%H:%i:%s")) AS Duracion,
A.Lanzamiento,
Mayuscula(A.Grabacion) AS Grabacion,
Mayuscula(A.Genero) AS Genero,
A.Portada
FROM Album as A
    INNER JOIN Grupo as G ON A.idGrupo = G.idGrupo
    INNER JOIN Disquera AS D ON A.idDisquera = D.idDisquera
    LEFT JOIN Canciones_Album ON A.idAlbum = Canciones_Album.idAlbum
GROUP BY(A.idAlbum)
ORDER BY (A.Nombre);

/* -------------------------------------------------------------------- CANCIONES -------------------------------------------------------------------- */
CREATE OR REPLACE VIEW
Vista_Canciones AS
SELECT
Canciones.idCancion,
CASE
    WHEN Canciones.Interpretacion <> 'Original' THEN CONCAT(Canciones.Nombre, ' ( ', Canciones.Interpretacion, ' ) ')
    ELSE Canciones.Nombre
END AS Nombre,
DATE_FORMAT(Canciones.Duracion, "%i:%s") AS Duracion,
Canciones.Publicacion,
Mayuscula(Canciones.Genero) AS Genero,
Canciones.Interpretacion,
Grupo.Nombre AS Grupo
FROM Canciones
LEFT JOIN Grupo ON Grupo.idGrupo = Canciones.idGrupo
ORDER BY Nombre;

/* ----------------------------------------------------------------- CANCIONES ALBUM ----------------------------------------------------------------- */
CREATE OR REPLACE VIEW
Vista_CancionesAlbum AS
SELECT
Canciones_Album.Codigo,
Canciones.idCancion,
Album.idAlbum,
Album.Nombre AS Album,
Canciones_Album.Numero,
CASE
    WHEN Canciones.Interpretacion <> 'Original' THEN CONCAT(Canciones.Nombre, ' ( ', Canciones.Interpretacion, ' ) ')
    ELSE Canciones.Nombre
END AS Nombre,
DATE_FORMAT(Canciones.Duracion, "%i:%s") AS Duracion,
Publicacion,
Mayuscula(Canciones.Genero) AS Genero
FROM Canciones
    INNER JOIN Canciones_Album ON Canciones.idCancion = Canciones_Album.idCancion
    INNER JOIN Album ON Album.idAlbum = Canciones_Album.idAlbum
ORDER BY Nombre;

/* ----------------------------------------------------------------- CANCIONES GRUPO ----------------------------------------------------------------- */
CREATE OR REPLACE VIEW
Vista_CancionesGrupo AS
SELECT
Canciones.idCancion,
Grupo.idGrupo,
Grupo.Nombre AS Grupo,
CASE
    WHEN Canciones.Interpretacion <> 'Original' THEN CONCAT(Canciones.Nombre, ' ( ', Canciones.Interpretacion, ' ) ')
    ELSE Canciones.Nombre
END AS Nombre,
GROUP_CONCAT(Album.Nombre ORDER BY Album.Nombre SEPARATOR ', ') AS Albums,
DATE_FORMAT(Canciones.Duracion, "%i:%s") AS Duracion,
DATE_FORMAT(Canciones.Publicacion, "%Y") AS Publicacion,
Canciones.Genero,
Canciones.Interpretacion
FROM Canciones
    LEFT JOIN Grupo ON Grupo.idGrupo = Canciones.idGrupo
    LEFT JOIN Canciones_Album ON Canciones.idCancion = Canciones_Album.idCancion
    LEFT JOIN Album ON Album.idAlbum = Canciones_Album.idAlbum
GROUP BY idCancion
ORDER BY Nombre, Album.Nombre;

/* ----------------------------------------------------------------------------- PROCEDIMIENTOS ALMACENADOS ----------------------------------------------------------------------------- */
/* ------------------------------------------------------------------ ARTISTA GRUPO ------------------------------------------------------------------ */
DROP PROCEDURE IF EXISTS `obtener_integrantes`;
DELIMITER $$
CREATE PROCEDURE `obtener_integrantes`(IN idGrupoB INT)
BEGIN
SELECT * FROM Vista_GrupoIntegrantes WHERE idGrupo = idGrupoB GROUP BY idGrupo, idArtista;
END$$

DELIMITER ;

/* ------------------------------------------------------------------- ALBUM GRUPO ------------------------------------------------------------------- */
DROP PROCEDURE IF EXISTS `obtener_album`;
DELIMITER $$
CREATE PROCEDURE `obtener_album`(IN idGrupoB INT)
BEGIN
SELECT idAlbum, idGrupo, Nombre, Grabacion, Canciones, Duracion, Lanzamiento, Disquera, Genero, Portada FROM Vista_Album WHERE idGrupo = idGrupoB ORDER BY Lanzamiento;
END$$

DELIMITER ;

/* ----------------------------------------------------------------- CANCIONES ALBUM ----------------------------------------------------------------- */
DROP PROCEDURE IF EXISTS `obtener_cancionesAlbum`;
DELIMITER $$
CREATE PROCEDURE `obtener_cancionesAlbum`(IN idAlbumA INT)
BEGIN
SELECT 
	Codigo,   
	Numero, 
    GROUP_CONCAT(Nombre ORDER BY Codigo SEPARATOR ' / ') AS Nombre,
    DATE_FORMAT(sec_to_time(SUM(time_to_sec(Duracion))), "%H:%i")  AS Duracion,
    Publicacion
FROM Vista_CancionesAlbum WHERE idAlbum = idAlbumA GROUP BY Numero ORDER BY Numero;
END$$

DELIMITER ;

/* ----------------------------------------------------------------- CANCIONES GRUPO ----------------------------------------------------------------- */
DROP PROCEDURE IF EXISTS `obtener_canciones`;
DELIMITER $$
CREATE PROCEDURE `obtener_canciones`(IN idGrupoB INT)
BEGIN
SELECT idCancion, Nombre, Albums, Duracion, Publicacion FROM Vista_CancionesGrupo WHERE idGrupo = idGrupoB;
END$$

DELIMITER ;

/* ------------------------------------------------------------------------------------- AUDITORIA ------------------------------------------------------------------------------------- */
CREATE TABLE Auditorias(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombreTabla VARCHAR(60),
    nombre TEXT,
    usuario varchar(45),
    modificado datetime,
    proceso varchar(45),
    idRegistro INT UNSIGNED 
);

/* ------------------------------------------------------------------------------------- USUARIO ------------------------------------------------------------------------------------- */
CREATE TABLE Usuario(
	IdUsuario INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(60),
    ApellidoPaterno VARCHAR(60),
    ApellidoMaterno VARCHAR(60),
    Usuario VARCHAR(60) UNIQUE,
    Correo VARCHAR(100) UNIQUE,
    Password TEXT,
    Registro DATETIME,
    Rol INT
);

/* ----------------------------------------------------------------- LOGIN ----------------------------------------------------------------- */
DROP PROCEDURE IF EXISTS `crear_usuario`;
DELIMITER $$
CREATE PROCEDURE `crear_usuario`(IN Nombre VARCHAR(60), IN ApellidoPaterno VARCHAR(60), IN ApellidoMaterno VARCHAR(60), IN Usuario VARCHAR(60), IN Correo VARCHAR(100), IN Password TEXT)
BEGIN
	INSERT INTO Usuario VALUES (NULL, Nombre, ApellidoPaterno, ApellidoMaterno, Usuario, Correo, MD5(Password), NOW(), 0);
END$$

DELIMITER ;

DROP PROCEDURE IF EXISTS `buscar_usuario`;
DELIMITER $$
CREATE PROCEDURE `buscar_usuario`(IN UsuarioB VARCHAR(60), IN PasswordB VARCHAR(60))
BEGIN
    SET @Correo := (SELECT Correo FROM Usuario WHERE (Usuario = UsuarioB AND Password = MD5(PasswordB)) OR (Correo = UsuarioB AND Password = MD5(PasswordB)));
	SELECT * FROM Usuario WHERE (Usuario = UsuarioB AND Password = MD5(PasswordB)) OR (Correo = UsuarioB AND Password = MD5(PasswordB));
END$$

DELIMITER ;