import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit {

  categories : any[] = [];
  msg : string | any;
  selectedImage: any;
  isError = false;

  constructor(private pdtSer: ProductsService) {

  }

  ngOnInit(): void {
    this.pdtSer.getCategories().subscribe({
      next: (data:any[])=>{

        console.log(data);

        this.categories = data;

      }, error: (error:any)=>{
        this.isError = true;
        console.log(error);

      }
    });
  }

  selectImage(event: any) {
    console.log(event);
    this.selectedImage = event.target.files[0];
  }

  createProducts(form:NgForm) {
    console.log(form.value);

    var fd = new FormData();

    fd.append('pdtCatId', form.value.catId);
    fd.append('pdtName', form.value.pdtName);
    fd.append('pdtPrice', form.value.pdtPrice);
    fd.append('pdtDesc', form.value.pdtDesc);

    fd.append('pdtImg', this.selectedImage);

    this.pdtSer.addProducts(fd).subscribe({
      next: (data: string) => {
        this.msg = data;
        form.reset();
      }, 
      error: (error: any) => {
        console.log(error);
        this.msg = "Something went wrong";
      }
    })

  }

}
