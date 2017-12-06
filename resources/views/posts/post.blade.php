@extends('layouts.app')

@section('content')
    <div class="row">
        <div class="col-md-offset-3">
            <div >
                    <div class="blog-post">
                        <h2 class="blog-post-title">
                                {{ $post->title }}
                            @if (!Auth::guest())
                                <a href="{{ url('posts/'.$post->id.'/edit') }}"><img src="{{ url('/images/iconsEdit.png')}}" width="25" height="25" alt="Update" title="Update"></a>
                                <img src="{{ url('/images/iconsDelete.png')}}"
                                     data-toggle="modal" data-target="#myModal"
                                     style="cursor: pointer"
                                     width="25" height="25" alt="Delete" title="Delete">
                                <div id="myModal" class="modal fade">
                                    <div class="modal-dialog modal-sm">
                                        <div class="modal-content">
                                            <div class="modal-header"><button class="close" type="button" data-dismiss="modal">×</button>
                                                <h4 class="modal-title">Delete Post</h4>
                                            </div>
                                            <div class="modal-body">Delete this post?</div>
                                            <div class="modal-footer">
                                                <form class="form-group" method="post" action="/posts/{{$post->id}}">
                                                    {{ csrf_field() }}
                                                    {{ method_field('DELETE') }}
                                                    <button class="btn btn-primary" type="button" data-dismiss="modal">
                                                        No
                                                    </button>
                                                    <button type="submit" class="btn btn-primary" >Yes</button>
                                                </form>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            @endif

                        </h2>
                        <h4 class="blog-post-meta">
                            {{ $post->user['name'] }} on
                            {{ $post->created_at->addSeconds(5)->diffForHumans()  }}
                        </h4>
                        <h5 class="blog-post-meta">
                            Category: {{ $post->category['name'] }}
                        </h5>
                        <img src="{{url('/'.'img/'.$post->img_url)}}" width="400" height="300">
                        <p class="text-left" style="width: 65%">&nbsp;&nbsp;{{ $post->body }}</p>
                    </div>

            </div>
        </div>
    </div>
@endsection
