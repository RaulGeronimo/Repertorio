/* ------------------------------------------- PAIS ------------------------------------------- */
DROP PROCEDURE IF EXISTS `crear_pais`;
DELIMITER $$
CREATE PROCEDURE `crear_pais`(IN NombreB VARCHAR(50), IN NacionalidadB VARCHAR(70), IN ContinenteB VARCHAR(50), IN BanderaB TEXT, IN UsuarioB VARCHAR(100))
BEGIN
	INSERT INTO Pais VALUES (NULL, NombreB, NacionalidadB, ContinenteB, BanderaB);
    INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro) VALUES ('Pais', NombreB, UsuarioB, NOW(), 'Pais agregado', LAST_INSERT_ID());
END$$

DELIMITER ;

DROP PROCEDURE IF EXISTS `actualizar_pais`;
DELIMITER $$
CREATE PROCEDURE `actualizar_pais`(IN idPaisB INT, IN NombreB VARCHAR(50), IN NacionalidadB VARCHAR(70), IN ContinenteB VARCHAR(50), IN BanderaB TEXT, IN UsuarioB VARCHAR(100))
BEGIN
	UPDATE Pais SET Nombre = NombreB, Nacionalidad = NacionalidadB, Continente = ContinenteB, Bandera = BanderaB WHERE idPais = idPaisB;
    INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro) VALUES ('Pais', NombreB, UsuarioB, NOW(), 'Pais actualizado', idPaisB);
END$$

DELIMITER ;

DROP PROCEDURE IF EXISTS `eliminar_pais`;
DELIMITER $$
CREATE PROCEDURE `eliminar_pais`(IN idPaisB INT, IN UsuarioB VARCHAR(100))
BEGIN
    DECLARE NombreB VARCHAR(70);
    SET NombreB = (SELECT Nombre FROM Pais WHERE idPais = idPaisB);

	DELETE FROM Pais WHERE idPais = idPaisB;
    INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro) VALUES ('Pais', NombreB, UsuarioB, NOW(), 'Pais eliminado', idPaisB);
END$$

DELIMITER ;




/* ------------------------------------------- INSTRUMENTO ------------------------------------------- */
DROP PROCEDURE IF EXISTS `crear_instrumento`;
DELIMITER $$
CREATE PROCEDURE `crear_instrumento`(IN NombreB VARCHAR(70), DescripcionB TEXT, FotoB TEXT, IN UsuarioB VARCHAR(100))
BEGIN
	INSERT INTO Instrumento VALUES (NULL, NombreB, DescripcionB, FotoB);
    INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro) VALUES ('Instrumento', NombreB, UsuarioB, NOW(), 'Instrumento agregado', LAST_INSERT_ID());
END$$

DELIMITER ;

DROP PROCEDURE IF EXISTS `actualizar_instrumento`;
DELIMITER $$
CREATE PROCEDURE `actualizar_instrumento`(IN idInstrumentoB INT, IN NombreB VARCHAR(70), DescripcionB TEXT, FotoB TEXT, IN UsuarioB VARCHAR(100))
BEGIN
	UPDATE Instrumento SET Nombre = NombreB, Descripcion = DescripcionB, Foto = FotoB WHERE idInstrumento = idInstrumentoB;
    INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro) VALUES ('Instrumento', NombreB, UsuarioB, NOW(), 'Instrumento actualizado', idInstrumentoB);
END$$

DELIMITER ;

DROP PROCEDURE IF EXISTS `eliminar_instrumento`;
DELIMITER $$
CREATE PROCEDURE `eliminar_instrumento`(IN idInstrumentoB INT, IN UsuarioB VARCHAR(100))
BEGIN
    DECLARE NombreB VARCHAR(70);
    SET NombreB = (SELECT Nombre FROM Instrumento WHERE idInstrumento = idInstrumentoB);

	DELETE FROM Instrumento WHERE idInstrumento = idInstrumentoB;
    INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro) VALUES ('Instrumento', NombreB, UsuarioB, NOW(), 'Instrumento eliminado', idInstrumentoB);
END$$

DELIMITER ;




/* ------------------------------------------- ARTISTA ------------------------------------------- */
DROP PROCEDURE IF EXISTS `crear_artista`;
DELIMITER $$
CREATE PROCEDURE `crear_artista`(IN NombreB VARCHAR(70), IN NombreArtisticoB VARCHAR(50), IN GeneroB CHAR, IN FechaNacimientoB DATE, IN FechaFinadoB VARCHAR(50), IN EstaturaB DOUBLE, IN idNacionalidadB INT, IN InstrumentosB TEXT, IN TipoVozB VARCHAR(50), IN FotoB TEXT, IN UsuarioB VARCHAR(100))
BEGIN
	INSERT INTO Artista VALUES (NULL, NombreB, NombreArtisticoB, GeneroB, FechaNacimientoB, FechaFinadoB, EstaturaB, idNacionalidadB, InstrumentosB, TipoVozB, FotoB);
    INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro) VALUES ('Artista', NombreB, UsuarioB, NOW(), 'Artista agregado', LAST_INSERT_ID());
END$$

DELIMITER ;

DROP PROCEDURE IF EXISTS `actualizar_artista`;
DELIMITER $$
CREATE PROCEDURE `actualizar_artista`(IN idArtistaB INT, IN NombreB VARCHAR(70), IN NombreArtisticoB VARCHAR(50), IN GeneroB CHAR, IN FechaNacimientoB DATE, IN FechaFinadoB VARCHAR(50), IN EstaturaB DOUBLE, IN idNacionalidadB INT, IN InstrumentosB TEXT, IN TipoVozB VARCHAR(50), IN FotoB TEXT, IN UsuarioB VARCHAR(100))
BEGIN
	UPDATE Artista SET Nombre = NombreB, NombreArtistico = NombreArtisticoB, Genero = GeneroB, FechaNacimiento = FechaNacimientoB, FechaFinado = FechaFinadoB, Estatura = EstaturaB, idNacionalidad = idNacionalidadB, Instrumentos = InstrumentosB, TipoVoz = TipoVozB, Foto = FotoB WHERE idArtista = idArtistaB;
    INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro) VALUES ('Artista', NombreB, UsuarioB, NOW(), 'Artista actualizado', idArtistaB);
END$$

DELIMITER ;

DROP PROCEDURE IF EXISTS `eliminar_artista`;
DELIMITER $$
CREATE PROCEDURE `eliminar_artista`(IN idArtistaB INT, IN UsuarioB VARCHAR(100))
BEGIN
    DECLARE NombreB VARCHAR(70);
    SET NombreB = (SELECT Nombre FROM Artista WHERE idArtista = idArtistaB);

	DELETE FROM Artista WHERE idArtista = idArtistaB;
    INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro) VALUES ('Artista', NombreB, UsuarioB, NOW(), 'Artista eliminado', idArtistaB);
END$$

DELIMITER ;




/* ------------------------------------------- GRUPO ------------------------------------------- */
DROP PROCEDURE IF EXISTS `crear_grupo`;
DELIMITER $$
CREATE PROCEDURE `crear_grupo`(IN NombreB VARCHAR(50), IN OrigenB VARCHAR(200), IN GeneroB VARCHAR(200), IN InicioB DATE, IN FinB VARCHAR(50), IN SellosB VARCHAR(150), IN EstadoB VARCHAR(50), IN SitioWebB VARCHAR(50), IN IdiomaB VARCHAR(50), IN LogoB TEXT, IN UsuarioB VARCHAR(100))
BEGIN
	INSERT INTO Grupo VALUES (NULL, NombreB, OrigenB, GeneroB, InicioB, FinB, SellosB, EstadoB, SitioWebB, IdiomaB, LogoB);
    INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro) VALUES ('Grupo', NombreB, UsuarioB, NOW(), 'Grupo agregado', LAST_INSERT_ID());
END$$

DELIMITER ;

DROP PROCEDURE IF EXISTS `actualizar_grupo`;
DELIMITER $$
CREATE PROCEDURE `actualizar_grupo`(IN idGrupoB INT, IN NombreB VARCHAR(50), IN OrigenB VARCHAR(200), IN GeneroB VARCHAR(200), IN InicioB DATE, IN FinB VARCHAR(50), IN SellosB VARCHAR(150), IN EstadoB VARCHAR(50), IN SitioWebB VARCHAR(50), IN IdiomaB VARCHAR(50), IN LogoB TEXT, IN UsuarioB VARCHAR(100))
BEGIN
	UPDATE Grupo SET Nombre = NombreB, Origen = OrigenB, Genero = GeneroB, Inicio = InicioB, Fin = FinB, Sellos = SellosB, Estado = EstadoB, SitioWeb = SitioWebB, Idioma = IdiomaB, Logo = LogoB WHERE idGrupo = idGrupoB;
    INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro) VALUES ('Grupo', NombreB, UsuarioB, NOW(), 'Grupo actualizado', idGrupoB);
END$$

DELIMITER ;

DROP PROCEDURE IF EXISTS `eliminar_grupo`;
DELIMITER $$
CREATE PROCEDURE `eliminar_grupo`(IN idGrupoB INT, IN UsuarioB VARCHAR(100))
BEGIN
    DECLARE NombreB VARCHAR(70);
    SET NombreB = (SELECT Nombre FROM Grupo WHERE idGrupo = idGrupoB);

	DELETE FROM Grupo WHERE idGrupo = idGrupoB;
    INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro) VALUES ('Grupo', NombreB, UsuarioB, NOW(), 'Grupo eliminado', idGrupoB);
END$$

DELIMITER ;



/* ------------------------------------------- DISQUERA ------------------------------------------- */
DROP PROCEDURE IF EXISTS `crear_disquera`;
DELIMITER $$
CREATE PROCEDURE `crear_disquera`(IN NombreB VARCHAR(60), IN FundacionB DATE, IN FundadorB VARCHAR(100), IN GenerosB VARCHAR(100), IN idPaisB INT, IN LogoB TEXT, IN UsuarioB VARCHAR(100))
BEGIN
	INSERT INTO Disquera VALUES (NULL, NombreB, FundacionB, FundadorB, GenerosB, idPaisB, LogoB);
    INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro) VALUES ('Disquera', NombreB, UsuarioB, NOW(), 'Disquera agregada', LAST_INSERT_ID());
END$$

DELIMITER ;

DROP PROCEDURE IF EXISTS `actualizar_disquera`;
DELIMITER $$
CREATE PROCEDURE `actualizar_disquera`(IN idDisqueraB INT, IN NombreB VARCHAR(60), IN FundacionB DATE, IN FundadorB VARCHAR(100), IN GenerosB VARCHAR(100), IN idPaisB INT, IN LogoB TEXT, IN UsuarioB VARCHAR(100))
BEGIN
	UPDATE Disquera SET Nombre = NombreB, Fundacion = FundacionB, Fundador = FundadorB, Generos = GenerosB, idPais = idPaisB, Logo = LogoB WHERE idDisquera = idDisqueraB;
    INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro) VALUES ('Disquera', NombreB, UsuarioB, NOW(), 'Disquera actualizada', idDisqueraB);
END$$

DELIMITER ;

DROP PROCEDURE IF EXISTS `eliminar_disquera`;
DELIMITER $$
CREATE PROCEDURE `eliminar_disquera`(IN idDisqueraB INT, IN UsuarioB VARCHAR(100))
BEGIN
    DECLARE NombreB VARCHAR(70);
    SET NombreB = (SELECT Nombre FROM Disquera WHERE idDisquera = idDisqueraB);

	DELETE FROM Disquera WHERE idDisquera = idDisqueraB;
    INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro) VALUES ('Disquera', NombreB, UsuarioB, NOW(), 'Disquera eliminada', idDisqueraB);
END$$

DELIMITER ;



/* ------------------------------------------- ALBUM ------------------------------------------- */
DROP PROCEDURE IF EXISTS `crear_album`;
DELIMITER $$
CREATE PROCEDURE `crear_album`(IN idGrupoB INT, IN idDisqueraB INT, IN NombreB VARCHAR(60), IN DuracionB TIME, IN LanzamientoB DATE, IN GrabacionB VARCHAR(100), IN GeneroB VARCHAR(200), IN PortadaB TEXT, IN UsuarioB VARCHAR(100))
BEGIN
	INSERT INTO Album VALUES (NULL, idGrupoB, idDisqueraB, NombreB, DuracionB, LanzamientoB, GrabacionB, GeneroB, PortadaB);
    INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro) VALUES ('Album', NombreB, UsuarioB, NOW(), 'Album agregado', LAST_INSERT_ID());
END$$

DELIMITER ;

DROP PROCEDURE IF EXISTS `actualizar_album`;
DELIMITER $$
CREATE PROCEDURE `actualizar_album`(IN idAlbumB INT, IN idGrupoB INT, IN idDisqueraB INT, IN NombreB VARCHAR(60), IN DuracionB TIME, IN LanzamientoB DATE, IN GrabacionB VARCHAR(100), IN GeneroB VARCHAR(200), IN PortadaB TEXT, IN UsuarioB VARCHAR(100))
BEGIN
	UPDATE Album SET idGrupo = idGrupoB, idDisquera = idDisqueraB, Nombre = NombreB, Duracion = DuracionB, Lanzamiento = LanzamientoB, Grabacion = GrabacionB, Genero = GeneroB, Portada = PortadaB WHERE idAlbum = idAlbumB;
    INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro) VALUES ('Album', NombreB, UsuarioB, NOW(), 'Album actualizado', idAlbumB);
END$$

DELIMITER ;

DROP PROCEDURE IF EXISTS `eliminar_album`;
DELIMITER $$
CREATE PROCEDURE `eliminar_album`(IN idAlbumB INT, IN UsuarioB VARCHAR(100))
BEGIN
    DECLARE NombreB VARCHAR(70);
    SET NombreB = (SELECT Nombre FROM Album WHERE idAlbum = idAlbumB);

	DELETE FROM Album WHERE idAlbum = idAlbumB;
    INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro) VALUES ('Album', NombreB, UsuarioB, NOW(), 'Album eliminado', idAlbumB);
END$$

DELIMITER ;



/* ------------------------------------------- CANCIONES ------------------------------------------- */
DROP PROCEDURE IF EXISTS `crear_canciones`;
DELIMITER $$
CREATE PROCEDURE `crear_canciones`(IN NombreB VARCHAR(70), DuracionB TIME, PublicacionB DATE, GeneroB VARCHAR(100), InterpretacionB VARCHAR(50), idGrupoB INT, IN UsuarioB VARCHAR(100))
BEGIN
	INSERT INTO Canciones VALUES (NULL, NombreB, DuracionB, PublicacionB, GeneroB, InterpretacionB, idGrupoB);
    INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro) VALUES ('Canciones', NombreB, UsuarioB, NOW(), 'Cancion agregada', LAST_INSERT_ID());
END$$

DELIMITER ;

DROP PROCEDURE IF EXISTS `actualizar_canciones`;
DELIMITER $$
CREATE PROCEDURE `actualizar_canciones`(IN idCancionB INT, IN NombreB VARCHAR(70), DuracionB TIME, PublicacionB DATE, GeneroB VARCHAR(100), InterpretacionB VARCHAR(50), idGrupoB INT, IN UsuarioB VARCHAR(100))
BEGIN
	UPDATE Canciones SET Nombre = NombreB, Duracion = DuracionB, Publicacion = PublicacionB, Genero = GeneroB, Interpretacion = InterpretacionB, idGrupo = idGrupoB WHERE idCancion = idCancionB;
    INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro) VALUES ('Canciones', NombreB, UsuarioB, NOW(), 'Cancion actualizada', idCancionB);
END$$

DELIMITER ;

DROP PROCEDURE IF EXISTS `eliminar_canciones`;
DELIMITER $$
CREATE PROCEDURE `eliminar_canciones`(IN idCancionB INT, IN UsuarioB VARCHAR(100))
BEGIN
    DECLARE NombreB VARCHAR(70);
    SET NombreB = (SELECT Nombre FROM Canciones WHERE idCancion = idCancionB);

	DELETE FROM Canciones WHERE idCancion = idCancionB;
    INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro) VALUES ('Canciones', NombreB, UsuarioB, NOW(), 'Cancion eliminada', idCancionB);
END$$

DELIMITER ;