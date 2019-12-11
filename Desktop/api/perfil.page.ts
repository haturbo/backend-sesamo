import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, ActionSheetController, AlertController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  // Instância o Objeto User que contém os dados do usuário.
  perfil: any;
  formPerfil: FormGroup;

  constructor(private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    public loadingController: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private fb: FormBuilder,
    private alertCtrl: AlertController
  ) {
    this.dadosPerfil();
  }

  ngOnInit() {
    this.formulario();
  }

  private formulario() {
    this.formPerfil = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      endereco: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      imagem: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]]
    })
  }

  get name(): FormControl {
    return this.formPerfil.get('name') as FormControl
  }

  get email(): FormControl {
    return this.formPerfil.get('email') as FormControl
  }

  get endereco(): FormControl {
    return this.formPerfil.get('endereco') as FormControl
  }

  get telefone(): FormControl {
    return this.formPerfil.get('telefone') as FormControl
  }

  get cep(): FormControl {
    return this.formPerfil.get('cep') as FormControl
  }

  get cidade(): FormControl {
    return this.formPerfil.get('cidade') as FormControl
  }

  get estado(): FormControl {
    return this.formPerfil.get('estado') as FormControl
  }

  get imagem(): FormControl {
    return this.formPerfil.get('imagem') as FormControl
  }

  // Pega os dados do perfil do usuário logado e armazena em perfil.
  dadosPerfil() {
    this.authService.getPerfil().subscribe(res => {
      this.perfil = res;
      console.log(this.perfil);
    });
  }

  // Altera as informações do usuario 
  editar() {

    const data = {
      name: this.formPerfil.value.name,
      email: this.formPerfil.value.email,
      endereco: this.formPerfil.value.endereco,
      telefone: this.formPerfil.value.telefone,
      cep: this.formPerfil.value.cep,
      cidade: this.formPerfil.value.cidade,
      imagem: "assets/img/perfil1.jpg",
      estado: this.formPerfil.value.estado
    }

    this.presentLoading().then(loading => {
      this.authService.editarPerfil(this.perfil.user.id, data)
        .then(res => {
          if (res.message == "success") {
            this.alertService.presentToast('Dados alterados com sucesso')
          } else {
            this.alertService.presentToast('Erro ao alterar dados')
          }
        })
        .catch(error => {
          console.log(error);
        })
    })
  }

  async ActionSheet() {

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Tem certeza que deseja excluir sua conta?',
      buttons: [{
        text: 'Excluir',
        icon: 'ios-add-circle-outline',
        handler: () => {
          this.excluir()
        }
      },

      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {

        }
      }]
    });
    await actionSheet.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Aguarde...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  // Exclui a conta do usuário passando o id para a função excluirUsurio() no AuthService 
  excluir() {
    this.presentLoading().then(loading => {
      this.authService.excluirUsuario(this.perfil.user.id)
        .then(res => {
          if (res.message === 'success') {
            this.alertService.presentToast('Você não possui mais uma conta')
            localStorage.removeItem('token');
            this.navCtrl.navigateRoot('login')
          }
        })
        .catch(error => {
          console.log(error);
        })
    })
  }
}
