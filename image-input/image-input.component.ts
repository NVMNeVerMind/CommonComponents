import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.css']
})
export class ImageInputComponent {

  @Output() change: EventEmitter<File> = new EventEmitter();
  @Input() id: string = '';
  readonly defaultLabel = 'Choisir une image';
  fileName: null | string = null;
  fileNamePreview = ''

  onChange(event: Event){
    const input = event.target as HTMLInputElement;
    if(input.files?.length === 0) return

    const file = input.files?.[0]
    this.fileName = file?.name ?? null;
    if(!file || !this.fileName) return

    this.fileNamePreview = this.buildNamePreviewOf(this.fileName);
    this.change.emit(file)
  }

  private buildNamePreviewOf(fileName: string) {
    if(fileName.length <= this.defaultLabel.length)  {
      return fileName;
    }
    return fileName.substring(0, this.defaultLabel.length) + '...';
  }
}
