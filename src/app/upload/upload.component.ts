import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
declare function require(path: string);
import { Globals } from '../globals';
import {Router} from '@angular/router';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers: [Globals]
})
export class UploadComponent implements OnInit {

  public userName:any;
  public description:any ='';
  public image:any ='';
  public postDescription:any;
  public postTitle:any;
  public postImage:any;
  public postValues = [];
  selectedImage = null;
  public postDetailImage = [];
  public postDetailComments = [];
  public postDetailUserName:any;
  public postDetailUserImage:any;
  public postDetailId:any;
  postUserId:any;
  public commentTypeData: any = "";
  public openReplySection:any;
  public replyTypeData:any;
  public commentsEdit:any = 0;
  public commentsId:any = 0;
  public userPostsId;
  public userId;
  public createdAt;
  imageUrl:string;
  userImageUrl:string;
  formdata = new FormData();
  public defaultImage;
  public userImage:any = '';

  constructor(private apiService: ApiService, private toastr: ToastrService,private globals: Globals, private router: Router) { }
@ViewChild('myInput')
myInputVariable: any;
  ngOnInit() {
    this.checkAuth();
    this.getProfileDetails();
    this.listMyPosts();
    this.userId = localStorage.getItem('id');
    this.imageUrl = this.globals.imageUrl;
    this.userImageUrl = this.globals.userImageUrl;
    this.defaultImage = this.globals.defaultImage;
  }

  getProfileDetails() {
    this.apiService.getData('profileDetails',localStorage.getItem("id")).subscribe(data => {
      this.userName = data.data.name;
      if(data.data.image_url != '') {
        this.userImage = data.data.image_url;
        this.globals.userImage = this.userImage;
        localStorage.setItem("image",this.userImage);
      }
    });
  }

  checkAuth() {
    if(localStorage.getItem('id') == null){
      this.router.navigate(['login']);
    }
  }

  onImageSelected(event) {
    this.image = event.target.files[0];
  }

  onUpload() {
    if(this.image == '' || this.description == '' || this.postTitle == '') {
      this.toastr.error('Please Enter all the fields');
    } else if(this.image && this.description) {
      this.formdata.append('file_name', this.image);
      this.formdata.append('description', this.description);
      this.formdata.append('userId', localStorage.getItem("id"));
      this.formdata.append('title', this.postTitle);
      this.apiService.postData(this.formdata,'createPost').subscribe((data => {
        this.myInputVariable.nativeElement.value = "";
        this.description = this.postTitle = '';
        if(data.error == false) {
          this.toastr.success(data.message);
          this.listMyPosts();
         } else {
          this.toastr.error(data.message);
         }
         return false;
      }));
    }
  }

  listMyPosts() {
    this.postValues = [];
    this.apiService.getData('listMyPosts',localStorage.getItem("id")).subscribe((data => {
      for(var i=0; i < data.data.length; i++) {
        let postData = [];
        postData['comments'] = [];
        postData['id'] = data.data[i].user_posts_id;
        postData['description'] = data.data[i].user_post_description;
        postData['title'] = data.data[i].user_post_title;
        postData['image'] = data.data[i].user_post_image;
        postData['userid'] = data.data[i].user.id;
        postData['username'] = data.data[i].user.name;
        postData['created_at'] = data.data[i].created_at;
        for(var j=0; j < data.data[i].comments.length; j++) {
         postData['comments'][j] = data.data[i].comments[j];
        }
        this.postValues.push(postData);
      }
    }));
  }

  listPostDetails(posts) {
    this.createdAt = posts.created_at;
    this.openReplySection = 0;
    this.apiService.getData('postDetails',posts.id).subscribe(data => {
      this.postDetailComments = data.data[0].comments;
    })
    this.postDetailImage = posts.image;
    this.postDetailUserName = posts.username;
    // this.postDetailUserImage = posts.user.image_url;
    this.postDetailId = posts.id;
    this.postUserId = posts.userid;
  }

  submitComments(event) {
    if(event.key === "Enter") {
      var data={"user_id":this.postUserId, "post_id" :this.postDetailId, "comment" :this.commentTypeData};
      this.apiService.postData(data,'postComments').subscribe((data => {
        this.apiService.getData('postDetails',this.postDetailId).subscribe(data => {
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

  closeEditComments() {
    this.commentsId = 0;
  }

  editComments(event,commentId) {
    var data={"comments_id":commentId, "user_comments" :this.commentsEdit};
    this.apiService.postData(data,'editComments').subscribe( data => {
      this.commentsId = 0;
      this.apiService.getData('postDetails',this.userPostsId).subscribe(data => {
        this.postDetailComments = data.data[0].comments;
      })
    });
  }

  deleteComments(comments) {
    this.apiService.getData('deleteComments',comments.comments_id).subscribe( data => {
      this.commentsId = 0;
      this.apiService.getData('postDetails',comments.user_posts_id).subscribe(data => {
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
    this.apiService.postData(data,'replyComments').subscribe(data => {
      this.apiService.getData('postDetails',this.postDetailId).subscribe(data => {
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

  onSubmit(e) {
    e && e.preventDefault();
    this.onUpload();
  }

}
