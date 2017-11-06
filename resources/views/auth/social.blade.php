{{-- Social buttons--}}

<div class="col-md-8 col-md-offset-4" id="uLogin"
     data-ulogin="display=panel;theme=flat;fields=first_name,last_name,email,nickname,photo,country;
                             providers=facebook;
                             redirect_uri={{ urlencode('http://' . $_SERVER['HTTP_HOST']) }}/ulogin;mobilebuttons=0;">
</div>

@section('js')
    <script src="//ulogin.ru/js/ulogin.js"></script>
@endsection
