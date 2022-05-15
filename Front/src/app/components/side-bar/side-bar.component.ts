import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  bCollapsed: boolean = true;

  @Input() items: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.items =
      this.authService.getPermission() == 0
        ? [
            {
              text: 'Dashboard',
              path: '',
              icon: 'dashboard',
              items: [],
            },
            {
              text: 'Empresas',
              path: '',
              icon: 'business',
              items: [
                {
                  text: 'Visualizar',
                  path: '/interno/empresas',
                  icon: '',
                  items: [],
                },
                {
                  text: 'Cadastrar',
                  path: '/interno/empresas/cadastrar',
                  icon: '',
                  items: [],
                },
              ],
            },
            {
              text: 'Documentos',
              path: '/interno/documentos',
              icon: 'folder-documents',
              items: [],
            },
          ]
        : [
            {
              text: 'Contratos',
              path: '/externo/contratos',
              icon: 'folder-documents',
              items: [],
            },
          ];
  }
}
