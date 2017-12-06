@extends('layouts.app')

@section('content')
    <div class="row">
        <div class="col-md-8 col-md-offset-2.5">
            <div class="panel panel-default">
                <div class="panel-body">

                    <table class="table table-striped task-table">
                        <thead>
                        <th><h3>Update post</h3></th>
                        <th>&nbsp;</th>
                        </thead>
                        <tbody>
                            <tr>

                                <!-- Task Delete Button -->
                                <td>
                                    <form method="POST" action="/posts/{{$post->id}}" class="form-group">

                                        {{ csrf_field() }}
                                        {{ method_field('PUT') }}

                                        <div class="form-group">
                                            <label for="name">Title:</label>
                                            <input type="text" class="form-control" id="title" name="title" required>
                                        </div>

                                        <div class="form-group">
                                            <label for="name">Text:</label>
                                            <textarea id="body" name="body" class="form-control" ></textarea>
                                        </div>

                                        <button type="submit" class="btn btn-primary">Update</button>
                                    </form>

                                </td>
                            </tr>
                        </tbody>
                    </table>


                </div>
            </div>
        </div>
    </div>

@endsection
