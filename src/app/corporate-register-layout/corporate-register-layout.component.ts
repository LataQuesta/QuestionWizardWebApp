import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-corporate-register-layout',
  templateUrl: './corporate-register-layout.component.html',
  styleUrls: ['./corporate-register-layout.component.css']
})
export class CorporateRegisterLayoutComponent implements OnInit {

  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      "logoicon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/signature-revised-1.svg")
    );
  }

  ngOnInit(): void {
  }

}
