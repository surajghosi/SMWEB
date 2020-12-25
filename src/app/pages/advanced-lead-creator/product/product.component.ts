import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, FormGroupDirective } from '@angular/forms';
import {ProductService} from 'src/app/_services/index';
import { finalize } from 'rxjs/operators';
import { ConfirmDialogService } from 'src/app/_commonComponent/confirmation/index';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  model: any = {};
  public isSaving = false;
  allProductsList: any  = [] ;
  @Input() leadId: string;
  @Input() leadDetailsMode = false;
  @Output() productCount = new EventEmitter<string>();
  
  constructor(private productService: ProductService,
              private confirmDialogService: ConfirmDialogService) { }
  ngOnInit() {
    this.model.discountPercentage = 0;
    this.model.quantity = 1;
    if(this.leadDetailsMode) {
      this.getAllProductByleadId(this.leadId);
    }
  }

  addProduct(f: NgForm) {
    this.isSaving = true;
    this.model.leadId = this.leadId;
    this.productService.createProduct(this.model).pipe(
      finalize(() => this.isSaving = false),
      ).subscribe(
           (data: any ) => {
               this.isSaving = false;
               const productObject = {
                productId: data.data,
                productName: this.model.productName,
                productPrice: this.model.productPrice,
                productDiscount: this.model.productDiscount,
                quantity: this.model.quantity,
                discountPercentage: this.model.discountPercentage,
                productDiscountPrice: (this.model.productPrice - this.model.productDiscount)
               };
               this.allProductsList.push(productObject);
               this.productCount.emit(this.allProductsList.length);
               //
               this.model = {};
               this.model.discountPercentage = 0;
               this.model.quantity = 1;
           },
            error => {
              this.isSaving = false;
           });
      }

      showDialog(item) {
        this.confirmDialogService.confirmThis('Are you sure to delete?', () => {
          this.deleteProduct(item);
        }, () => {
        });
      }

      deleteProduct(productItem: any) {
        this.allProductsList = this.allProductsList.filter(obj => obj !== productItem);
        this.productService.deleteProduct(productItem).pipe(
          finalize(() => this.isSaving = false),
          ).subscribe(
               (data: any ) => {
               },
                error => {
                  this.isSaving = false;
               });
        this.productCount.emit(this.allProductsList.length);
      }
      numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
           return false;
        }
        return true;
      }

      onDiscountChange(percent: number) {
        if(this.model.discountPercentage ==='' || this.model.discountPercentage ===undefined ) {
          this.model.discountPercentage = 0 ;
        }
        if ( this.model.productPrice > 0 ) {
              const productDiscount = (this.model.productPrice * this.model.discountPercentage ) / 100;
              this.model.productDiscount =  productDiscount ;
            }

      }
      onQuantityChange(quantity: number) {
        if(quantity < 1)  {
          this.model.quantity = 1 ;
        }
      }

      getAllProductByleadId(leadId: any) {
        this.productService.getProductDetailsByLeadId(leadId).pipe().subscribe(
               (data: any ) => {
                   this.allProductsList = data.data;
               },
                error => {
                  this.isSaving = false;
               });
      }
}

