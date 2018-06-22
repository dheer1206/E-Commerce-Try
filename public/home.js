window.onload = function() {

    let cart = {} ;
    //cart['type'] = 0 ;

    let l2cart = this.document.getElementById("cart") ;

    document.addEventListener("click", function(event){
        
        let id = event.target.id ;
        if (id == "cart") {
            $.post( "/updatecart" , cart , function( data , status ) {
                console.log("Updated cart Successfully..") ;
                window.location = "/cart" ;
            } )
        }else if ( id == "admin") {
            $.post( "/updatecart" , cart , function( data , status ) {
                console.log("Updated cart Successfully..") ;
                window.location = "/admin" ;
            } )
        }else {
           if ( event.target.className == "btn btn-primary" ) {
                alert("Item added Successfully...") ;
                if (cart[id] == null) {
                    cart[id] = 1 ;
                }else {
                    cart[id]++ ;
                }
           }
            //console.log(cart) ;
        }

    });

}