import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { YoutubeApiService } from '../youtube-api.service';

@Component({
  selector: 'app-video-search',
  templateUrl: './video-search.component.html',
  styleUrls: ['./video-search.component.css']
})
export class VideoSearchComponent  {
  videos: any[] = [];
  searchQuery: string = '';

  constructor(private youtubeApi: YoutubeApiService) { }

  search(): void {
    this.youtubeApi.searchVideos(this.searchQuery)
      .subscribe((videos) => {
        this.videos = videos;
      });
  }
}
