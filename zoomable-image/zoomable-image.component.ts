import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-zoomable-image',
    templateUrl: './zoomable-image.component.html',
    standalone: false
})
export class ZoomableImageComponent {
    @Input() src: string | File | null | undefined = null;
    @Input() thumbnailClass: string = 'max-h-[200px]';
    @Input() alt: string = 'Thumbnail';

    protected isModalOpen: boolean = false;

    protected openModal() {
        this.isModalOpen = true;
    }

    protected closeModal() {
        this.isModalOpen = false;
    }
}
