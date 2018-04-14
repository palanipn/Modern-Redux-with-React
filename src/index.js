import _ from 'lodash';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search'
import SearchBar from './components/search_bar'
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'



export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
        selectedVideo:null
        };
        this.videoSearch('jabardasth latest');

    }
    videoSearch(term){
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({videos:videos,selectedVideo:videos[0]});
        });
    }
    render(){
        const videoSearch=_.debounce((term)=>{this.videoSearch(term)},300);
        return (
            <div className="common" >
                <h1 className="headline"><strong>PALANI SearchTube</strong></h1>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos}
                />
            </div>
        )}

}

ReactDOM.render(<App />, document.querySelector('.container'));
