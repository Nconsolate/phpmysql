function getAjax(url,data){
    var p = new Promise(function(success){
        var str="";
        for(var i in data) str+=i+"="+data[i]+"&";
        var d = new Date();
        url+="?"+str+"_t="+d.getTime();

        var ajax = new XMLHttpRequest();
        ajax.open("GET",url,true);
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200)
                success(ajax.responseText);
        }
        ajax.send(null);
    })
    return p;
}

function postAjax(url,data){
	var p = new Promise(function(success){
		var str = "";
		for(var i in data) str+=i+"="+data[i]+"&";
		data=str.slice(0,str.length-1);
		var ajax = new XMLHttpRequest();
		ajax.open("POST",url,true);
		ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200)
				success(ajax.responseText);
		}
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.send(data);
	})
	return p;
}
