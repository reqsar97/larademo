<div class="col-sm-3 offset-sm-1">
    <div class="sidebar-module top-left">
        <ol class="list-unstyled">
            <li>Count of Categories: {{ count($categories) }}</li>
            <li>Count of Posts: {{ $postsCount }}</li>
            <li>Count of Users: {{ $usersCount }}</li>
        </ol>
        <h4>Categories</h4>
        <ol class="list-unstyled">
            @foreach($categories as $category)
                <li>
                    <a href="{{ url('/posts/category/'.$category->id) }}">{{ $category->name  }}</a>
                </li>
            @endforeach
        </ol>
    </div>
</div>
