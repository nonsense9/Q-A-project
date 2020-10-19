import {Component} from '@angular/core';


@Component({
  selector: 'like-box',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent {

  numberOfLikes: number = 0;
  numberOfDislikes: number = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  likeBtn() {
    this.numberOfLikes++;
  }

  dislikeBtn() {
    this.numberOfDislikes++;
  }
}
