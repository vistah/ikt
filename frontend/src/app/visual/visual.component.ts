import { Component, OnInit } from '@angular/core';
import {BackendService, Post} from "../backend.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.css']
})
export class VisualComponent implements OnInit {
  allPosts!: Post[];

  constructor(private bs: BackendService,  private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
   this.bs.visualizePost()
     .then(res => {
       console.log(res);
       return res;
     })
     .then(arr =>{
       this.allPosts = arr;
       arr.forEach(el => console.log(el));
     })
     .catch(err => {
       console.log(err);
     })
  }
  imageSrc(base64code: string): SafeResourceUrl {
    const src = 'data:image/png;base64,'+base64code;
    return this.sanitizer.bypassSecurityTrustUrl(src);
}

}
