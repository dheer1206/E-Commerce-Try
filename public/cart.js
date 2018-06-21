window.onload = function () {

    $.get( "/cart" , function ( data , status ){
       // console.log("Page loaded") ;
    } ) ;

    
    document.addEventListener("click", function(event){

        let cName = event.target.className ;
        if (cName == "btn btn-primary" || cName == "fas fa-minus" || cName == "fas fa-plus" ) {
            
            let id = +(event.target.id.split(" ")[1]) ;

            let inp = document.getElementById( 'inp-' + id ) ;

            let perItem = document.getElementById('p-' + id) ;
            let perItemPrice = +(perItem.innerText.split(" ")[1]) ;

            let total = document.getElementById('total') ;
            let totalPrice = +(total.innerText.split(" ")[4]) ;

            let itPrice = document.getElementById('h-' + id) ;

            if ( event.target.id[0] == 'u' ) {
                inp.value++ ;
                totalPrice += perItemPrice ;
            }else {
                if (inp.value > 0) {
                    inp.value-- ;
                    totalPrice -= perItemPrice ;
                }
            }

            total.innerText = "Total Price : Rs. " + totalPrice ;
            itPrice.innerText = "Rs. " +  (+(inp.value) * (perItemPrice)) ;

            let cartObj = {} ;
            cartObj[id] = inp.value ;

            $.post( "/updatecart2" , cartObj , function ( data , status ) {

            } ) ;

        }

    }) ;


}