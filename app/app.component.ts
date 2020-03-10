import { Component } from '@angular/core';
import { sharedService } from './shared-service';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  providers: [sharedService]
})
export class AppComponent  {

  posts = [];
  editFlag = false;
  editElement: number;
  itemTitle = '';
  itemDescription = '';
  start = 0;
  limit = 10;
  showForm = false;

  constructor (private sharedData: sharedService) {
    this.sharedData.getPosts().subscribe((res) => {
    });
  }

  editItem(item, i) {
    this.editFlag = true;
    this.posts = this.posts.map( (data, index) => {
      if(data.userId === item.userId) {
        data.title = this.itemTitle;
        data.body = this.itemDescription;
      }
    });
  }

  deleteItem(item, i) {
    /*let dataObject = {
      'userid' : item.userId,
      'title' : item.title,
      'body' : item.body
    };
    this.sharedData.deletePost(dataObject).subscribe(res => {
      if (res === 'success') {
        alert('Successfully Edited');
      } else {
        alert('Something went wrong, please try again later');
      }
    }) */
    this.posts = this.posts.splice(i, 1);
  }

  navigation(type: string) {
    if (type === 'left') {
      this.start = this.start - this.limit;
    } else if (type === 'right') {
      this.start = this.start + this.limit;
    }
    this.sharedData.loadMorePost(this.start, this.limit).subscribe(res => {
      this.posts.push(res);
    })
  }

  addItem() {
    let itemObject = {
      'userId' : this.posts[this.posts.length -1].userId,
      'id' : this.posts[this.posts.length -1].id + 1,
      'title' : this.itemTitle,
      'body' : this.itemDescription
    }
    this.posts.push(itemObject);
  }

}
