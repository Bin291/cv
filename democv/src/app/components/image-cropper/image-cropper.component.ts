import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatSlider, MatSliderThumb} from '@angular/material/slider';
import {ShareModule} from '../../../shared/shared.module';
import {ResumeService} from '../../services/resume/resume.service';
import {Store} from '@ngrx/store';
import {ResumeState} from '../../ngrx/resume/resume.state';


@Component({
  selector: 'app-image-cropper',
  imports: [
    MatDialogContent,
    MatButton,
    ShareModule,
    MatSliderThumb,
    MatSlider,

  ],
  templateUrl: './image-cropper.component.html',
  styleUrl: './image-cropper.component.scss'
})
export class ImageCropperComponent implements AfterViewInit,OnInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fileInput', { static: false }) fileInputRef!: ElementRef<HTMLInputElement>;
  @Output() cropped = new EventEmitter<string>();
  hasUploaded = false;
  zoom = 0.25;
  shape: 'circle' | 'square' | 'rect' = 'circle';
  baseWidth = 200;
  zoomOffset = 0;
  private ctx!: CanvasRenderingContext2D;
  private image = new Image();
  private dragging = false;
  private startX = 0;
  private startY = 0;
  private imgX = 0;
  private imgY = 0;
  private imgWidth = 300;
  private imgHeight = 300;
  protected maxZoom: number | undefined;






  constructor(
    private dialogRef: MatDialogRef<ImageCropperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { imageUrl: string }, store: Store<{resume:ResumeState}>,
  ) {
    this.image.src = data.imageUrl;

  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = 600;
    canvas.height = 350;
    this.ctx = canvas.getContext('2d')!;
    if (this.image.src) {
      this.image.onload = () => requestAnimationFrame(() => this.draw());
    }
  }

  triggerFileInput() {
    this.fileInputRef?.nativeElement?.click();
  }

  constrainToCrop() {
    const canvas = this.canvasRef.nativeElement;
    const cropSize = 200;

    const cropLeft = (canvas.width - cropSize) / 2;
    const cropTop = (canvas.height - cropSize) / 2;

    const scaledWidth = this.baseWidth + this.zoomOffset;
    const scaledHeight = scaledWidth * (this.imgHeight / this.imgWidth);

    const minX = cropLeft + cropSize - scaledWidth;
    const maxX = cropLeft;
    const minY = cropTop + cropSize - scaledHeight;
    const maxY = cropTop;

    this.imgX = Math.max(minX, Math.min(this.imgX, maxX));
    this.imgY = Math.max(minY, Math.min(this.imgY, maxY));
  }

  onFileChangeDom(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = () => {
        const newImg = new Image();
        newImg.onload = () => {
          this.image = newImg;
          this.imgWidth = newImg.width;
          this.imgHeight = newImg.height;

          const canvas = this.canvasRef.nativeElement;

          this.baseWidth = 200;
          this.zoomOffset = 0;

          const scaledWidth = this.baseWidth + this.zoomOffset;
          const scaledHeight = scaledWidth * (this.imgHeight / this.imgWidth);

          this.imgX = (canvas.width - scaledWidth) / 2;
          this.imgY = (canvas.height - scaledHeight) / 2;

          this.hasUploaded = true;
          requestAnimationFrame(() => this.draw());
        };
        newImg.src = reader.result as string;
      };

      reader.readAsDataURL(input.files[0]);
      input.value = '';
    }
  }


  onMouseDown(event: MouseEvent) {
    this.dragging = true;
    this.startX = event.offsetX;
    this.startY = event.offsetY;
  }

  onMouseMove(event: MouseEvent) {
    if (!this.dragging) return;

    const dx = event.offsetX - this.startX;
    const dy = event.offsetY - this.startY;

    this.imgX += dx;
    this.imgY += dy;
    this.startX = event.offsetX;
    this.startY = event.offsetY;

    this.constrainToCrop();
    this.draw();
  }


  onMouseUp() {
    this.dragging = false;
  }


  onSliderChange(value: number) {
    this.zoom = value;
    console.log('zoom:', this.zoom);
    this.draw();
  }


  setShape(shape: 'circle' | 'square' | 'rect') {
    this.shape = shape;
    this.draw();
  }

  onZoom() {
    this.draw();
  }

  draw() {
    const canvas = this.canvasRef.nativeElement;
    if (!canvas || !this.ctx) return;

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scaledWidth = this.baseWidth + this.zoomOffset;
    const scaledHeight = scaledWidth * (this.imgHeight / this.imgWidth);

    this.ctx.drawImage(this.image, this.imgX, this.imgY, scaledWidth, scaledHeight);

    const cropSize = 200;
    let cropWidth = cropSize;
    let cropHeight = cropSize;

    if (this.shape === 'rect') {
      cropWidth = scaledWidth;
      cropHeight = cropWidth * 1.4;

      // ✅ Giới hạn không vượt chiều cao ảnh hiển thị
      if (cropHeight > scaledHeight) {
        cropHeight = scaledHeight;
      }
    } else if (this.shape === 'square') {
      cropWidth = cropSize;
      cropHeight = cropSize;
    } else if (this.shape === 'circle') {
      cropWidth = cropSize;
      cropHeight = cropSize;
    }

    const cx = (canvas.width - cropWidth) / 2;
    const cy = (canvas.height - cropHeight) / 2;

    // Overlay mờ nền ngoài vùng crop
    this.ctx.save();
    this.ctx.fillStyle = 'rgba(0,0,0,0.5)';
    this.ctx.beginPath();
    this.ctx.rect(0, 0, canvas.width, canvas.height);

    if (this.shape === 'circle') {
      this.ctx.arc(cx + cropWidth / 2, cy + cropHeight / 2, cropWidth / 2, 0, Math.PI * 2);
    } else {
      this.ctx.rect(cx, cy, cropWidth, cropHeight);
    }
    this.ctx.fill('evenodd');
    this.ctx.restore();

    // Vẽ border vùng crop
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = 2;
    if (this.shape === 'circle') {
      this.ctx.arc(cx + cropWidth / 2, cy + cropHeight / 2, cropWidth / 2, 0, Math.PI * 2);
    } else {
      this.ctx.rect(cx, cy, cropWidth, cropHeight);
    }
    this.ctx.stroke();
  }







  saveCrop() {
    const canvas = document.createElement('canvas');
    const size = 200;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    const visibleCanvas = this.canvasRef.nativeElement;

    // ⚙️ Tính zoom theo width offset
    const scaledWidth = this.baseWidth + this.zoomOffset;
    const scaledHeight = scaledWidth * (this.imgHeight / this.imgWidth);

    const cropX = (visibleCanvas.width - size) / 2;
    const cropY = (visibleCanvas.height - size) / 2;

    // 🧠 Tính lại vùng lấy ảnh gốc tương ứng với vùng crop trên canvas
    const sourceX = (cropX - this.imgX) * (this.imgWidth / scaledWidth);
    const sourceY = (cropY - this.imgY) * (this.imgHeight / scaledHeight);
    const sourceW = (size / scaledWidth) * this.imgWidth;
    const sourceH = (size / scaledHeight) * this.imgHeight;

    ctx.drawImage(
      this.image,
      sourceX,
      sourceY,
      sourceW,
      sourceH,
      0,
      0,
      size,
      size
    );

    const base64 = canvas.toDataURL('image/png');
    this.cropped.emit(base64);
    this.dialogRef.close(base64);
  }
  onZoomOffsetChange(value: number) {
    this.zoomOffset = value;
    this.draw();
    console.log('zoomOffset:', this.zoomOffset);
  }
  deleteImage() {
    this.hasUploaded = false;
    this.image.src = '';
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
  }

}
