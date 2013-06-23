function addEss() {
    var a = $(this);
    var current = a.html();
    a.html(current + 's');
}


function removeEss() {
    var a = $(this);
    var current = a.html();
    a.html(current.slice(0, current.length-1));
}


function splitPath(path){
    if(path[0] == "/"){
        path = path.substr(1);
    }
    if(path[path.length - 1]){
        path = path.substr(0, path.length);
    }
    return path.split("/");
}


function getDatabaseInformationFromPath(path){
    var ret = {};
    var tmp = splitPath(path);
    ret.server = tmp[0];
    ret.database = tmp[1];
    ret.collection = tmp[2];
    ret.filter = tmp[3];
    ret.page = tmp[4];
    return ret;
}


function encodeFilterString(filterString){
    filterString = btoa(filterString);  // base64
    return encodeURI(filterString);
}


function getQueryURLFor(path, filterString){
    var o = getDatabaseInformationFromPath(path);
    filterString = encodeFilterString(filterString);
    return createURLForDatabase(o.server,
                                o.database,
                                o.collection,
                                filterString,
                                "1");
}


function createURLForDatabase(server, database, collection, filterString, page){
    return "/" + [server, database, collection, filterString, page].join("/") + "/";
}


function applyFilterString(filterString){
    var path = window.location.pathname;
    var newPath = getQueryURLFor(path, filterString);
    window.location.assign(newPath);
}


function isValidFilterString(filterString){
    try{
        JSON.parse(filterString);
        return true;
    }catch(err){
        return false;
    }
}


function getUserFilterString(){
    return $(".filter input").val();
}


function applyFilter(){
    var filterString = getUserFilterString();
    if(isValidFilterString(filterString)){
        applyFilterString(filterString);
    }
}


function removeFilter(){
    var filterString = JSON.stringify({});
    applyFilterString(filterString);
}


function addFocusClass(){
    $(this).addClass("input-focus");
}


function removeFocusClass(){
    $(this).removeClass("input-focus");
    verifyFilterStringInInput($(this));
}


function verifyFilterStringInInput($node){
    var filterString = getUserFilterString();
    if(isValidFilterString(filterString)){
        $node.removeClass("input-invalid-json");
    }else{
        $node.addClass("input-invalid-json");
    }
}


$(document).ready(function() {
    $('TH A').hover(addEss, removeEss);
    $('#apply-filter').click(applyFilter);
    $('#remove-filter').click(removeFilter);
    $(".filter INPUT").focusin(addFocusClass);
    $(".filter INPUT").focusout(removeFocusClass);
});