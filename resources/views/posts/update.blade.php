@extends('layouts.app')

@section('content')
    <div class="row">
      <h3>Update Post</h3>
      <div class="col-md-8 col-md-offset-2.5">
          <div class="panel panel-default">
              <div class="panel-body">
                  <form method="POST" action="/posts/{{$post->id}}" enctype="multipart/form-data">

                      {{ csrf_field() }}
                      {{ method_field('PUT') }}

                      <div class="form-group">
                          <label for="title">Title:</label>
                          <input type="text" class="form-control" id="title" name="title" required>
                      </div>

                      <div class="form-group">
                          <label for="body">Text:</label>
                          <textarea id="body" name="body" class="form-control" ></textarea>
                      </div>

                      <div class="form-group">
                          <label for="category">Category:</label>
                          <select name="category_id">
                              @foreach($categories as $category)
                                  <option value="{{$category->id}}">{{$category->name}}</option>
                              @endforeach
                          </select>
                      </div>

                      <div class="form-group">
                          <label for="image">Upload image:</label>
                          <input type="file" name="image" id="image">
                      </div>

                      <button type="submit" class="btn btn-primary">Update</button>
                  </form>
                  @include('errors.errors')
              </div>
          </div>
    </div>

@endsection
