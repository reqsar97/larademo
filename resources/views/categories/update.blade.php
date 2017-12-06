@extends('layouts.app')

@section('content')
    <h3>Update</h3>
    <a href='/category/create'> <h4>Create category</h4></a>
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-body">
                    <form method="POST" action="{{ url('me/categories/'.$category->id) }}">

                        {{ csrf_field() }}
                        {{ method_field('PUT') }}

                        <div class="form-group">
                            <label for="name">Old Name: {{ $category->name }}</label>
                            <br>
                            <label for="name">New Name:</label>
                            <input type="text" class="form-control" id="name" name="name" >
                        </div>

                        <button type="submit" class="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

@endsection
