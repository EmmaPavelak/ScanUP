import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { StateService } from '../service/state.service';
import { catchError, debounceTime, switchMap } from 'rxjs/operators';
import { CartService } from '../service/cart.service';
@Component({
    selector: 'app-clavier',
    templateUrl: './clavier.component.html',
    styleUrls: ['./clavier.component.scss'],
})
export class ClavierComponent implements OnInit {
    currentState: string;
    status = 'espece';
    totalPrice = 100;
    productFound: boolean;
    codeControl = new FormControl();

    constructor(
        private stateService: StateService,
        private cartService: CartService
    ) {
        this.stateService.currentStateChanged$.subscribe((data) => {
            this.currentState = data;
        });
    }
    /*



// MANUAL SEARCH
checkState('waitScan','selectProduct',selectPdtInconnu);
checkState('selectProduct','selectAmount',chooseProduct);*/

    ngOnInit(): void {}

    onKeyup(e) {
        console.log(e);
        this.stateService.checkState(
            'waitScan',
            'waitForCode',
            e.key != '',
            null
        );
        this.codeControl.valueChanges
            .pipe(debounceTime(500))
            .subscribe((codeValue) => {
                this.stateService.checkState(
                    'waitForCode',
                    'findProduct',
                    codeValue.length === 4,
                    this.getProduct(codeValue)
                );
            });
    }
    validCode() {
        this.stateService.checkState(
            'findProduct',
            'ErrorUnknowPdt',
            !this.productFound,
            //console.log('Produit non trouvé')
            //add snabar
            this.stateService.checkState(
                'ErrorUnknowPdt',
                'waitScan',
                true,
                null
            )
        );
        this.stateService.checkState(
            'findProduct',
            'selectAmount',
            this.productFound,
            this.afterProductFind()
        );
    }
    afterProductFind() {
        this.cartService.cartChanged$;
        console.log('Produit trouvé');
        //add snabar
        // this.stateService.checkState(
        //     'selectAmount',
        //     'waitScan',
        //     scanProduct,
        //     this.addProductQte(1)
        // );
        // this.stateService.checkState(
        //     'selectAmount',
        //     'waitScan',
        //     enterQte,
        //     this.addProductQte(enterQte)
        // );
    }

    getProduct(code) {
        //code exist dans prodcutlist?
        //if(productexist)
        this.productFound = true;
        // else
        // this.productFound = false;
    }
    addProductQte(qte) {}
    searchProduct() {
        Swal.fire({
            title: 'Choisissez votre produit',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Produit 1',
            denyButtonText: `Produit 2`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('Produit 1 ajouté', '', 'success');
            } else if (result.isDenied) {
                Swal.fire('Produit 2 ajouté', '', 'success');
            }
        });
    }
    clavierNumber(number) {
        if (this.status === 'espece') {
            Swal.fire({
                title: 'Somme a rendre : ' + (this.totalPrice - number) + ' €',
                showCancelButton: true,
                confirmButtonText:
                    'Rendre ' + (this.totalPrice - number) + ' €',
            });
        } else if (this.status === 'editQuantity') {
        } else if (this.status === 'splitPayment') {
        }
    }
}