import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditcardsService } from '../../services/creditcards.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss'
})
export class DeleteComponent {

  creditCardId!: Number;

  private destory$: Subject<void> = new Subject<void>();

  constructor(private router: ActivatedRoute,
    private route: Router,
    private matSnackBar : MatSnackBar,
    private CreditcardsService: CreditcardsService) {
    this.creditCardId = parseInt(this.router.snapshot.paramMap.get("id") || '',
    );

    // Delete Functionality
    this.CreditcardsService.deleteCreditCard(this.creditCardId)
    .pipe(takeUntil(this.destory$))
    .subscribe(data => {
      this.showSuccessMessage("Credit Card Deleted Successfully");
      this.route.navigate(['creditcards']);
    })
  }

  showSuccessMessage(message: string){
    this.matSnackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  ngOnDestroy(){
    this.destory$.next();
    this.destory$.complete();
  }
}
