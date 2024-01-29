/* ------------------------------------------- PAIS ------------------------------------------- */
DROP TRIGGER IF EXISTS `Pais_AFTER_INSERT`;
DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `Pais_AFTER_INSERT` AFTER INSERT ON `Pais` FOR EACH ROW
BEGIN
INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro)
VALUES ('Pais', NEW.Nombre, @Correo, NOW(), 'Pais agregado', NEW.idPais);
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS `Pais_AFTER_UPDATE`;
DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `Pais_AFTER_UPDATE` AFTER UPDATE ON `Pais` FOR EACH ROW
BEGIN
INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro)
VALUES ('Pais', NEW.Nombre, @Correo, NOW(), 'Pais actualizado', NEW.idPais);
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS `Pais_AFTER_DELETE`;
DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `Pais_AFTER_DELETE` AFTER DELETE ON `Pais` FOR EACH ROW
BEGIN
INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro)
VALUES ('Pais', OLD.Nombre, @Correo, NOW(), 'Pais eliminado', OLD.idPais);
END$$
DELIMITER ;

/* ------------------------------------------- INSTRUMENTO ------------------------------------------- */
DROP TRIGGER IF EXISTS `Instrumento_AFTER_INSERT`;
DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `Instrumento_AFTER_INSERT` AFTER INSERT ON `Instrumento` FOR EACH ROW
BEGIN
INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro)
VALUES ('Instrumento', NEW.Nombre, @Correo, NOW(), 'Instrumento agregado', NEW.idInstrumento);
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS `Instrumento_AFTER_UPDATE`;
DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `Instrumento_AFTER_UPDATE` AFTER UPDATE ON `Instrumento` FOR EACH ROW
BEGIN
INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro)
VALUES ('Instrumento', NEW.Nombre, @Correo, NOW(), 'Instrumento actualizado', NEW.idInstrumento);
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS `Instrumento_AFTER_DELETE`;
DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `Instrumento_AFTER_DELETE` AFTER DELETE ON `Instrumento` FOR EACH ROW
BEGIN
INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro)
VALUES ('Instrumento', OLD.Nombre, @Correo, NOW(), 'Instrumento eliminado', OLD.idInstrumento);
END$$
DELIMITER ;

/* ------------------------------------------- ARTISTA ------------------------------------------- */
DROP TRIGGER IF EXISTS `Artista_AFTER_INSERT`;
DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `Artista_AFTER_INSERT` AFTER INSERT ON `Artista` FOR EACH ROW
BEGIN
INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro)
VALUES ('Artista', NEW.Nombre, @Correo, NOW(), 'Artista agregado', NEW.idArtista);
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS `Artista_AFTER_UPDATE`;
DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `Artista_AFTER_UPDATE` AFTER UPDATE ON `Artista` FOR EACH ROW
BEGIN
INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro)
VALUES ('Artista', NEW.Nombre, @Correo, NOW(), 'Artista actualizado', NEW.idArtista);
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS `Artista_AFTER_DELETE`;
DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `Artista_AFTER_DELETE` AFTER DELETE ON `Artista` FOR EACH ROW
BEGIN
INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro)
VALUES ('Artista', OLD.Nombre, @Correo, NOW(), 'Artista eliminado', OLD.idArtista);
END$$
DELIMITER ;

/* ------------------------------------------- GRUPO ------------------------------------------- */
DROP TRIGGER IF EXISTS `Grupo_AFTER_INSERT`;
DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `Grupo_AFTER_INSERT` AFTER INSERT ON `Grupo` FOR EACH ROW
BEGIN
INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro)
VALUES ('Grupo', NEW.Nombre, @Correo, NOW(), 'Grupo agregado', NEW.idGrupo);
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS `Grupo_AFTER_UPDATE`;
DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `Grupo_AFTER_UPDATE` AFTER UPDATE ON `Grupo` FOR EACH ROW
BEGIN
INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro)
VALUES ('Grupo', NEW.Nombre, @Correo, NOW(), 'Grupo actualizado', NEW.idGrupo);
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS `Grupo_AFTER_DELETE`;
DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `Grupo_AFTER_DELETE` AFTER DELETE ON `Grupo` FOR EACH ROW
BEGIN
INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro)
VALUES ('Grupo', OLD.Nombre, @Correo, NOW(), 'Grupo eliminado', OLD.idGrupo);
END$$
DELIMITER ;

/* ------------------------------------------- DISQUERA ------------------------------------------- */
DROP TRIGGER IF EXISTS `Disquera_AFTER_INSERT`;
DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `Disquera_AFTER_INSERT` AFTER INSERT ON `Disquera` FOR EACH ROW
BEGIN
INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro)
VALUES ('Disquera', NEW.Nombre, @Correo, NOW(), 'Disquera agregada', NEW.idDisquera);
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS `Disquera_AFTER_UPDATE`;
DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `Disquera_AFTER_UPDATE` AFTER UPDATE ON `Disquera` FOR EACH ROW
BEGIN
INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro)
VALUES ('Disquera', NEW.Nombre, @Correo, NOW(), 'Disquera actualizada', NEW.idDisquera);
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS `Disquera_AFTER_DELETE`;
DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `Disquera_AFTER_DELETE` AFTER DELETE ON `Disquera` FOR EACH ROW
BEGIN
INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro)
VALUES ('Disquera', OLD.Nombre, @Correo, NOW(), 'Disquera eliminada', OLD.idDisquera);
END$$
DELIMITER ;

/* ------------------------------------------- ALBUM ------------------------------------------- */
DROP TRIGGER IF EXISTS `Album_AFTER_INSERT`;
DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `Album_AFTER_INSERT` AFTER INSERT ON `Album` FOR EACH ROW
BEGIN
INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro)
VALUES ('Album', NEW.Nombre, @Correo, NOW(), 'Album agregado', NEW.idAlbum);
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS `Album_AFTER_UPDATE`;
DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `Album_AFTER_UPDATE` AFTER UPDATE ON `Album` FOR EACH ROW
BEGIN
INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro)
VALUES ('Album', NEW.Nombre, @Correo, NOW(), 'Album actualizado', NEW.idAlbum);
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS `Album_AFTER_DELETE`;
DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `Album_AFTER_DELETE` AFTER DELETE ON `Album` FOR EACH ROW
BEGIN
INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro)
VALUES ('Album', OLD.Nombre, @Correo, NOW(), 'Album eliminado', OLD.idAlbum);
END$$
DELIMITER ;

/* ------------------------------------------- CANCIONES ------------------------------------------- */
DROP TRIGGER IF EXISTS `Cancion_AFTER_INSERT`;
DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `Cancion_AFTER_INSERT` AFTER INSERT ON `Canciones` FOR EACH ROW
BEGIN
INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro)
VALUES ('Cancion', NEW.Nombre, @Correo, NOW(), 'Cancion agregada', NEW.idCancion);
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS `Cancion_AFTER_UPDATE`;
DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `Cancion_AFTER_UPDATE` AFTER UPDATE ON `Canciones` FOR EACH ROW
BEGIN
INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro)
VALUES ('Cancion', NEW.Nombre, @Correo, NOW(), 'Cancion actualizada', NEW.idCancion);
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS `Cancion_AFTER_DELETE`;
DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `Cancion_AFTER_DELETE` AFTER DELETE ON `Canciones` FOR EACH ROW
BEGIN
INSERT INTO Auditorias(nombreTabla, nombre, usuario, modificado, proceso, idRegistro)
VALUES ('Cancion', OLD.Nombre, @Correo, NOW(), 'Cancion eliminada', OLD.idCancion);
END$$
DELIMITER ;