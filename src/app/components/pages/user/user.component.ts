import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { userP } from 'src/app/model/user';
import { RunServeService } from 'src/app/services/services/run-serve.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: userP[] = [];
  param_user: userP;
  param_userUp: userP;
  totalPag: number;
  first = 0;

  rows = 5;
  banderD: boolean = false;
  displayModalC: boolean = false;
  displayModalUp: boolean = false;
  value2: string = "";
  constructor(
    private runServe: RunServeService,
    public messageService: MessageService) {
    this.totalPag = 0;
    this.param_user = {
      id: '', nombre: '', apellido: '', email: '', num_telefono: '', ciudad: '', pais: ''
    }
    this.param_userUp = {
      id: '', nombre: '', apellido: '', email: '', num_telefono: '', ciudad: '', pais: ''
    }
  }

  ngOnInit(): void {
    this.getUsers();
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.users ? this.first === (this.users.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.users ? this.first === 0 : true;
  }

  showModalDialog() {
    this.displayModalC = true;
  }

  async getUsers() {
    await this.runServe.getData("user").subscribe(data => {
      this.users = data;
      this.totalPag = this.users.length;
    });
  }
  async createUser() {
    if (!this.Validations(this.param_user)) { return; }
    await this.runServe.postData("user", this.param_user).subscribe(data => {
      this.Alert('success', 'Creación exitosa.');
      this.clearInput();
      this.getUsers();
      console.log(data);
    }, error => {
      this.Alert('error', error.error.data.detail);
      console.log("Error: ", error)
    });
  }

  Validations(param_user: userP): boolean {
    if (!param_user.nombre) {
      this.Alert('error', 'El campo "Nombre" es obligatorio.');
      return false;
    } else if (!param_user.apellido) {
      this.Alert('error', 'El campo "Apellido" es obligatorio.');
      return false;
    } else if (!param_user.email) {
      this.Alert('error', 'El campo "Email" es obligatorio.');
      return false;
    } else if (!this.validationsEmail(param_user.email)) {
      this.Alert('error', 'El "Email" no es valido.');
      return false;
    } else if (!param_user.num_telefono) {
      this.Alert('error', 'El campo "Telefono" es obligatorio.');
      return false;
    } else if (!param_user.ciudad) {
      this.Alert('error', 'El campo "Ciudad" es obligatorio.');
      return false;
    } else if (!param_user.pais) {
      this.Alert('error', 'El campo "Pais" es obligatorio.');
      return false;
    }
    return true;
  }
  async deleteUser(id: number) {
    await Swal.fire({
      title: 'Esta seguro que desea eliminar el registro?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.banderD = true;
        await this.runServe.deleteData('user/' + id).subscribe(deleteU => {
          this.Alert('success', 'Eliminacion exitosa.');
          this.getUsers();
          setTimeout(() => { this.banderD=false; }, 3000);
        }, error => console.log("Error: ", error));
      }
    });
  }

  Alert(option: string, msj: string) {
    this.messageService.clear();
    if (option === "success") {
      this.messageService.add({
        severity: "info",
        summary: "Exito!!",
        detail: `${msj}`
      });
    }
    if (option === "error") {
      this.messageService.add({
        severity: "error",
        summary: "Error!!",
        detail: `${msj}`
      });
    }
  }
  clearInput() {
    this.param_user = {
      id: '', nombre: '', apellido: '', email: '', num_telefono: '', ciudad: '', pais: ''
    }
  }
  clearInputUp() {
    this.param_userUp = {
      id: '', nombre: '', apellido: '', email: '', num_telefono: '', ciudad: '', pais: ''
    }
  }
  selectUpdate(param_user: userP) {
    this.displayModalUp = true;
    this.param_userUp = param_user;
  }
  async updateUser() {
    if (!this.Validations(this.param_userUp)) { return; }
    await this.runServe.putData("user/" + this.param_userUp.id, this.param_userUp).subscribe(data => {
      this.Alert('success', 'Actualización exitosa.');
      this.getUsers();
      console.log(data);
    }, error => {
      this.Alert('error', error.error.data.detail);
      console.log("Error: ", error)
    });
  }

  validationsEmail(valor: string): boolean {
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)) {
      return true;
    } else {
      return false;
    }
  }
}
