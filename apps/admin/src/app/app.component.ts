import { Component } from '@angular/core';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Store } from '@ngrx/store';
import { RouterOutlet } from '@angular/router';
import { AppState } from './store/app.state';
import { appLoadingDefaultState } from './store/loading/loading.reducer';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProgressSpinnerModule, BlockUIModule, ConfirmDialogModule, ToastModule],
  providers: [ConfirmationService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'e-school';
  documentBlocked: boolean;
  documentBlockedMessage: string | null;


  appLoadingEvents$ = this.appStore.select((state: AppState) => state.loading);


  constructor(private primengConfig: PrimeNGConfig, private readonly appStore: Store<AppState>) {
    this.documentBlocked = appLoadingDefaultState.state;
    this.documentBlockedMessage = appLoadingDefaultState.label;
  }

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.appLoadingEvents$
      .subscribe({
        next: (state) => {
          this.documentBlocked = state.state;
          this.documentBlockedMessage = state.label;
        },
        error: (error) => {
          this.documentBlocked = appLoadingDefaultState.state;
          this.documentBlockedMessage = appLoadingDefaultState.label;
        },
      });
  }
}
