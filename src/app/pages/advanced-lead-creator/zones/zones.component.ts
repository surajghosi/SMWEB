import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, FormGroupDirective } from '@angular/forms';
import {ZonesService} from 'src/app/_services/index';
import { finalize } from 'rxjs/operators';
import { ConfirmDialogService } from 'src/app/_commonComponent/confirmation/index';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent implements OnInit {
  model: any = {};
  public isSaving = false;
  allZoneList: any  = [] ;
  @Input() leadId: string;
  @Input() leadDetailsMode = false;
  @Output() zoneCount = new EventEmitter<string>();
  constructor(private zonesService: ZonesService,
              private confirmDialogService: ConfirmDialogService) { }

  ngOnInit() {
    if(this.leadDetailsMode) {
      this.getAllZoneByleadId(this.leadId);
    }
  }

  addZone(f: NgForm) {
    this.isSaving = true;
    this.model.leadId = this.leadId;
    this.zonesService.createZone(this.model).pipe(
      finalize(() => this.isSaving = false),
      ).subscribe(
           (data: any ) => {
               this.isSaving = false;
               const zoneObject = {
                areaId: data.data,
                areaName: this.model.areaName,
               };
               this.allZoneList.push(zoneObject);
               this.zoneCount.emit(this.allZoneList.length);
               f.reset();
               this.model = {};
           },
            error => {
              this.isSaving = false;
           });
      }

      showDialog(item) {
        this.confirmDialogService.confirmThis('Are you sure to delete?', () => {
          this.deleteZone(item);
        }, () => {
        });
      }

      deleteZone(zoneItem: any) {
        this.allZoneList = this.allZoneList.filter(obj => obj !== zoneItem);
        this.zonesService.deleteZone(zoneItem).pipe(
          finalize(() => this.isSaving = false),
          ).subscribe(
               (data: any ) => {
               },
                error => {
                  this.isSaving = false;
               });
        this.zoneCount.emit(this.allZoneList.length);
      }
      getAllZoneByleadId(leadId: any) {
        this.zonesService.getZoneDetailsByLeadId(leadId).pipe().subscribe(
               (data: any ) => {
                   this.allZoneList = data.data;
               },
                error => {
                  this.isSaving = false;
               });
      }

}
