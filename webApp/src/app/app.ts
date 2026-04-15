import { AfterViewInit, Component, ElementRef, NgZone, signal, ViewChild } from '@angular/core';
import { GameEngine } from '../game/core/GameEngine/GameEngine';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {

  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;

  //testing canvas
  posX: number = 0;
  posY: number = 0;
  reverse = false;

  constructor(private ngZone: NgZone) { }

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext("2d")!;

    this.ngZone.runOutsideAngular(() => {
      const gameEngine = new GameEngine(this.update, this.render)
      gameEngine.start()
    });
  }

  //testing only
  update = (frame: number) => {
    if(!this.reverse){
      this.posX += 5;
      this.posY += 5;
    }
    else{
      this.posX -= 5;
      this.posY -= 5;
    }

    if (this.posX > 500 || this.posX < 1)
      this.reverse = !this.reverse
  }

  //testing only
  render = () => {
    if (!!this.ctx) {
      const canvas = this.canvasRef.nativeElement;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.ctx.fillStyle = "green";
      this.ctx.fillRect(this.posX, this.posY, 50, 50);
    }
  }

}
