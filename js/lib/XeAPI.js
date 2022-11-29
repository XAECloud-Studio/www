class Xe {
    constructor() {

    }
    is_json(str){
        if (typeof str == 'string') {
            try {
                let obj=JSON.parse(str);
                if(typeof obj == 'object' && obj ){
                    return true;
                }else{
                    return false;
                }
    
            } catch(e) {
                return false;
            }
        }
    }
    loader_creat(id) {
        if (document.getElementById(id)) {
            $("#"+id).empty();
        }
        else {
            $("#app").prepend('<div id="'+id+'"></div>');
        }
    }
}
var xe = new Xe();