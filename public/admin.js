window.onload = function() {

    let iTitle = this.document.getElementById("pName") ;
    let iPrice = this.document.getElementById("pPrice") ;
    let iContent = this.document.getElementById("pDes") ;

    let submit = this.document.getElementById( 'submit' ) ;


    submit.onclick = function() {
        console.log( "button clicked" ) ;
        console.log( iContent.value ) ;
        let product = {

            title : iTitle.value ,
            content : iContent.value ,
            price : iPrice.value 
        } ;
        //console.log("in js") ;
        //console.log(product) ;
        $.post( "/addproduct" , product , function ( data , status ) {
            //console.log( "Returned" ) ;
            window.location = "/" ;
        } ) ;

    }  ;


}