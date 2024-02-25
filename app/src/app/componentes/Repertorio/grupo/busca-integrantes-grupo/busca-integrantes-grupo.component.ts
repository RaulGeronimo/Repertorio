import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; //Para enviar a una ruta Especifica
//Alertas
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
//Entidad
import { BuscaGrupoService } from 'src/app/servicios/busca-grupo.service';
//Integrantes
import { BuscaIntegrantesGrupoService } from 'src/app/servicios/busca-integrantes-grupo.service';
import { ArtistaGrupoService } from 'src/app/servicios/artista-grupo.service';

@Component({
  selector: 'app-busca-integrantes-grupo',
  templateUrl: './busca-integrantes-grupo.component.html',
  styleUrls: ['./busca-integrantes-grupo.component.css'],
})
export class BuscaIntegrantesGrupoComponent implements OnInit {
  //Creamos el arreglo vacio llamado Canciones
  artistas: any = [];
  total: number = 0;
  Grupo: any = [];
  search: any;
  show: boolean = false;

  constructor(
    private Service: BuscaIntegrantesGrupoService,
    private activatedRoute: ActivatedRoute,
    private ArtistaGrupoService: ArtistaGrupoService,
    private GrupoService: BuscaGrupoService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('Usuario') == null) {
      this.router.navigate(['login']);
    } else {
      this.obtenerLista();
      this.obtenerGrupo();
    }
  }

  obtenerLista() {
    const params = this.activatedRoute.snapshot.params;
    if (params['idGrupo']) {
      this.Service.getIntegrante(params['idGrupo']).subscribe(
        (res) => {
          //console.log(res); //Muestra en consola
          this.artistas = res; //Muestra en el navegador
          this.total = this.artistas.length;
        },
        (err) => console.error(err)
      );
    }
  }

  obtenerGrupo() {
    const params = this.activatedRoute.snapshot.params;
    if (params['idGrupo']) {
      this.GrupoService.getGrupo(params['idGrupo']).subscribe(
        (res) => {
          //console.log(res); //Muestra en consola
          this.Grupo = res; //Muestra en el navegador
          this.toastr.success(
            `Integrantes del grupo '${this.Grupo.Nombre}'`,
            'Lista de Integrantes'
          );
          localStorage.setItem('idGrupo', this.Grupo.idGrupo!);
        },
        (err) => console.error(err)
      );
    }
  }

  borrar(idArtista: string) {
    Swal.fire({
      title: '¿Estas seguro de eliminar el registro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        /* Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        ) */
        this.ArtistaGrupoService.delete(idArtista).subscribe(
          (res) => {
            //Llena el arreglo con la respuesta que enviamos
            //console.log(res);
            this.obtenerLista();
            this.toastr.warning(
              'El integrante fue eliminado con éxito',
              'Integrante eliminado'
            );
          },
          (err) => console.error(err)
        );
      }
    });
  }
}
