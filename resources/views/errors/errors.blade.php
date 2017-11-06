<div class="col-md-offset-3">
    <div class="alert-danger alert-error">
        <ul>

            @foreach($errors->all() as $error)
                <li> {{ $error }} </li>
            @endforeach

        </ul>
    </div>
</div>
