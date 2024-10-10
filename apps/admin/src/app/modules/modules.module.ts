import { NgModule } from "@angular/core";
import { ModulesRoutingModule } from "./modules-routing.module";
import { SkeletonModule } from "primeng/skeleton";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [],
  imports: [CommonModule, SkeletonModule, ModulesRoutingModule]
})

export class ModulesModule { }
