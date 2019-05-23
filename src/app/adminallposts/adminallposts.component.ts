import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../adminapi.service';
import { ToastrService } from 'ngx-toastr';
import { Globals } from '../globals';

@Component({
  selector: 'app-adminallposts',
  templateUrl: './adminallposts.component.html',
  styleUrls: ['./adminallposts.component.css'],
  providers: [Globals]
})
export class AdminallpostsComponent implements OnInit {
  allPostValues:any;
  public openReplySection:any;
  public postDetailComments = [];
  public postDetailImage = [];
  public postDetailUserName:any;
  public postDetailUserImage:any;
  public postDetailId:any;
  postUserId:any;
  public replyTypeData:any;
  public commentsEdit:any = 0;
  public commentsId:any = 0;
  public userPostsId;
  public userId;
  public postDetails:any;
  public CreatedAt:any;
  imageUrl:string;
  userImageUrl:string;
  public defaultImage;
  public userImage:any = '';

  constructor(private adminApiService: AdminapiService, private toastr: ToastrService,private globals: Globals) { }

  ngOnInit() {
    this.listAllPosts();
    this.imageUrl = this.globals.imageUrl;
    this.userImageUrl = this.globals.userImageUrl;
    this.defaultImage = this.globals.defaultImage;
  }

  listAllPosts() {
    this.adminApiService.getData('listAllPosts').subscribe(data => {
      this.allPostValues = data.data;
    });
  }

  getPostDetails(posts) {
    this.postDetails = posts;
    this.openReplySection = 0;
    this.adminApiService.getData('postDetails',posts.user_posts_id).subscribe(data => {
      this.postDetailComments = data.data[0].admin_comments;
    });
    this.CreatedAt = posts.created_at;
    this.postDetailImage = posts.user_post_image;
    this.postDetailUserName = posts.user.name;
    this.postDetailId = posts.user_posts_id;
    this.postUserId = posts.user_id;
    this.postDetailUserImage = posts.user.image_url;
  }

  disableComments(commentsId) {
    this.adminApiService.getData('disableComments',commentsId).subscribe(data => {
      if(data.error == false) {
        this.getPostDetails(this.postDetails);
        this.toastr.success(data.message);
       } else {
        this.toastr.error(data.message);
       }
    });
  }

  enableComments(commentsId) {
    this.adminApiService.getData('enableComments',commentsId).subscribe(data => {
      if(data.error == false) {
        this.getPostDetails(this.postDetails);
        this.toastr.success(data.message);
       } else {
        this.toastr.error(data.message);
       }
    });
  }

  disableAllComments(commentsId) {
    this.adminApiService.getData('disableAllComments',commentsId).subscribe(data => {
      if(data.error == false) {
        this.listAllPosts();
        this.toastr.success(data.message);
       } else {
        this.toastr.error(data.message);
       }
    });
  }

  enableAllComments(commentsId) {
    this.adminApiService.getData('enableAllComments',commentsId).subscribe(data => {
      if(data.error == false) {
        this.listAllPosts();
        this.toastr.success(data.message);
       } else {
        this.toastr.error(data.message);
       }
    });
  }


}
