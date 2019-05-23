import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
import { Globals } from '../globals';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {
public allPostValues:any = [];
public PostValues:any = [];
public postDetailImage = [];
public postDetailUserImage:any;
public postDetailComments = [];
public postDetailUserName:any;
public postDetailId:any;
postUserId:any;
commentTypeData:any = "";
public openReplySection:any;
public replyTypeData:any;
public commentsEdit:any = 0;
public commentsId:any = 0;
public userPostsId;
public userId;
public createdAt;
public userName;
imageUrl:string;
public defaultImage;
userImageUrl:string;
public userImage:any = '';

  constructor(private api:ApiService, private toastr: ToastrService,private router:Router, private globals: Globals) { }

  ngOnInit() {
    this.checkAuth();
    this.getProfileDetails();
    this.listAllPosts();
    this.userId = localStorage.getItem('id');
    this.userName = localStorage.getItem('name');
    this.imageUrl = this.globals.imageUrl;
    this.userImageUrl = this.globals.userImageUrl;
    this.defaultImage = this.globals.defaultImage;
  }

  checkAuth() {
    if(localStorage.getItem('id') == null){
      this.router.navigate(['login']);
    }
  }

  getProfileDetails() {
    this.api.getData('profileDetails',localStorage.getItem("id")).subscribe(data => {
      this.userName = data.data.name;
      if(data.data.image_url != '') {
        this.userImage = data.data.image_url;
        this.globals.userImage = this.userImage;
      }
    });
  }

  @HostListener("window:scroll", [])
    onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          let newData = this.allPostValues.slice(this.PostValues.length,this.PostValues.length+5);
          this.PostValues.push(...newData);
        }
    }


  listAllPosts() {
    this.api.getData('listAllPosts',localStorage.getItem("id")).subscribe(data => {
      this.allPostValues = data.data;
      this.PostValues = this.allPostValues.slice(0,5);
    });
  }

  getPostDetails(posts) {
    this.openReplySection = 0;
    this.api.getData('postDetails',posts.user_posts_id).subscribe(data => {
      this.postDetailComments = data.data[0].comments;
    });
    this.postDetailImage = posts.user_post_image;
    this.postDetailUserName = posts.user.name;
    this.postDetailId = posts.user_posts_id;
    this.postUserId = posts.user_id;
    this.postDetailUserImage = posts.user.image_url;
    this.createdAt = posts.created_at;
  }

  submitComments(event) {
    if(event.key === "Enter") {
      var data={"user_id":localStorage.getItem('id'), "post_id" :this.postDetailId, "comment" :this.commentTypeData};
      this.api.postData(data,'postComments').subscribe((data => {
        this.api.getData('postDetails',this.postDetailId).subscribe(data => {
            this.postDetailComments = data.data[0].comments;
            this.commentTypeData = "";
            if(data.error == false) {
              this.toastr.success("Your Comment Posted Successfully");
             } else {
              this.toastr.error("There was a problem While posting");
             }
          })
        })
      );
    }
  }

  openEditComments(event,comments) {
    this.userPostsId = comments.user_posts_id;
    this.commentsEdit = comments.user_comments;
    this.commentsId = comments.comments_id;
  }

  editComments(event,commentId) {
    var data={"comments_id":commentId, "user_comments" :this.commentsEdit};
    this.api.postData(data,'editComments').subscribe( data => {
      this.commentsId = 0;
      this.api.getData('postDetails',this.userPostsId).subscribe(data => {
        this.postDetailComments = data.data[0].comments;
      })
    });
  }

  openReply(event, commentsId) {
    event.preventDefault();
    this.openReplySection = commentsId;
  }

  hideReply() {
    this.openReplySection = 0;
  }

  submitReplies(event,comments) {
    var data={"user_id":localStorage.getItem('id'), "post_id" :comments.user_posts_id, "comment_id" :comments.comments_id, "reply_text" :this.replyTypeData};
    this.api.postData(data,'replyComments').subscribe(data => {
      this.api.getData('postDetails',this.postDetailId).subscribe(data => {
        this.openReplySection = 0;
        this.postDetailComments = data.data[0].comments;
        this.replyTypeData = "";
        if(data.error == false) {
          this.toastr.success("Your Reply Posted Successfully");
         } else {
          this.toastr.error("There was a problem While posting");
         }
      })
    });
  }

  deleteComments(comments) {
    this.api.getData('deleteComments',comments.comments_id).subscribe( data => {
      this.commentsId = 0;
      this.api.getData('postDetails',comments.user_posts_id).subscribe(data => {
        this.postDetailComments = data.data[0].comments;
      })
    });
  }


}
