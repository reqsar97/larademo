@extends('layouts.app')

@section('content')
    <h3>My Categories</h3>
    <a href='/category/create'> <h4>Create category</h4></a>
    <div class="row">
        <div class="col-md-offset-3">
                <div >
                <ol class="list-unstyled">
                        <div class="panel-body">
                            <table class="table table-striped task-table">
                                <thead>
                                <th>My Categories</th>
                                <th>&nbsp;</th>
                                </thead>
                                <tbody>
                                @foreach($categories as $category)
                                    <tr>
                                        <td class="table-text"><div>{{ $category['name'] }}</div></td>

                                        <!-- Task Delete Button -->
                                        <td>
                                            <form action="{{ url('category/'.$category['id']) }}" method="POST">
                                                {{ csrf_field() }}
                                                {{ method_field('DELETE') }}

                                                <button type="submit" class="btn btn-primary">
                                                    <i class="fa fa-btn fa-trash"></i>DELETE
                                                </button>
                                            </form>
                                        </td>
                                        <!-- Task Update Button -->
                                        <td>
                                            <form action="{{ url('category/update/'.$category['id']) }}" method="GET">
                                                {{ csrf_field() }}

                                                <button type="submit" class="btn btn-primary">
                                                    <i class="fa fa-btn fa-trash"></i>Update
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                @endforeach
                                </tbody>
                            </table>
                        </div>
                </ol>
                </div>
        </div>
    </div>
@endsection
