@extends('layouts.app')

@section('content')
    <h3>My Posts</h3>
    <a href='/posts/create'> <h4>Create Post</h4></a>
    <div class="row">
        <div class="col-md-offset-3">
            <div >
                @foreach($posts as $post)
                    <div class="blog-post">
                        <h2 class="blog-post-title">
                            <a href="/posts/{{ $post->id }}">
                                {{ $post->title }}
                            </a>
                        </h2>
                        <h4 class="blog-post-meta">
                            {{ $post->user->name }} on
                            {{ $post->created_at->addSeconds(5)->diffForHumans()  }}
                        </h4>
                        <h5 class="blog-post-meta">
                            Category: {{ $post->category['name'] }}
                        </h5>
                        <img src="{{url('/'.'images/'.$post->img_url)}}" width="400" height="300">
                        <p class="text-left" style="width: 65%">{{ $post->body }}</p>
                    </div>
                @endforeach
                {{
                    $posts->links()
                }}
            </div>
        </div>
    </div>
@endsection
