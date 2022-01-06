import {
    Component,
    ElementRef,
    Inject,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Cart } from '../cart';
import { CartService } from '../service/cart.service';
import { StateService } from '../service/state.service';
import { State } from '../state.enum';

@Component({
    selector: 'app-list-products',
    templateUrl: './list-products.component.html',
    styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
    cart: Cart = new Cart();
    idEdit:number;
    state: string;

    productId: number;
    productList = [
        {
            id: 1,
            name: 'Tronçonneuse électrique RCS2340B2C 2300W 40cm - RYOBI',
            price: 99.9,
            quantity: 2,
        },
        {
            id: 2,
            name: 'Ratelier de 9 clés torx 1,5 à 10mm chrome vanadium - INVENTIV',
            price: 12.5,
            quantity: 2,
        },
        {
            id: 3,
            name: 'Rénovateur brillant Star longue durée tous sols intérieurs Starwax 1L',
            price: 17.95,
            quantity: 2,
        },
        {
            id: 4,
            name: 'Peinture sol trafic extrême satin 0.5L - Rouge brique - V33',
            price: 24.9,
            quantity: 2,
        },
    ];

    constructor(
        private cartService: CartService,
        private stateService: StateService,
        @Inject(String) public stateEnum = State
    ) {
        this.cartService.cartChanged$.subscribe((cart) => {
            this.productList = cart.products;
        });

        this.stateService.currentStateChanged$.subscribe((state)=>{
            if(this.stateService.idEdit){
                this.idEdit = this.stateService.idEdit;
                this.state = state;
            }
        })
    }

    ngOnInit(): void {}

    deleteProduct(id) {
        this.cartService.deleteProduct(id);
    }

    editMode(id) {
        this.stateService.checkState(
            this.stateEnum.WaitForScan,
            this.stateEnum.EditProduct,
            true,
            this.stateService.setIdEdit(id)
        );
    }

    getProductId(productId) {
        this.productId = productId;
    }
}
