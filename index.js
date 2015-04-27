
function Gistele(url, descript){
  this.url = url;
  this.descript = descript;
}
  var Gist = [];
  var FavGist= [];
function addFav(Gist){
  if (findById(Gist.id,FavGist) == false){
    var fav = document.getElementById('favgist');

    var row = document.createElement('dl');
    var ur = document.createElement('dt');
    var url = document.createElement('a');
      url.href = Gist.url;
      url.className = 'gitLink';
      url.target = "_blank";
    var urlLink = document.createTextNode(Gist.url);
    var descript = document.createElement('dd');
        descript = document.createTextNode("    "+Gist.description);
    if (Gist.description == '' || Gist.description == null){
      descript =document.createTextNode("    No description provided");
    }

    var rmfromFav = document.createElement("button");

    row.id = Gist.id;
    rmfromFav.onclick = function (){
      var gistId = this.getAttribute("gistId");
      var gistf = findById(gistId,FavGist);
      removeFav(gistf,gistId);
    };
    rmfromFav.value = ' - ';
    rmfromFav.setAttribute("gistId", Gist.id);
        //addtoFav.type = 'button';
    rmfromFav.className = "rmLink";
        //addtoFav.id = Gist[key].id;
    var rmfromFavLink = document.createTextNode ('-');
    
    rmfromFav.appendChild(rmfromFavLink);


    ur.appendChild(url);
    url.appendChild(urlLink);

    row.appendChild(rmfromFav);
    row.appendChild(descript);
    row.appendChild(ur);

    fav.appendChild(row);
    FavGist.push(Gist);
    localStorage.setItem("Favourite",JSON.stringify(FavGist));
  }
}

function removeFav(Gist,Id){
  var i;
  var req = new XMLHttpRequest();
  var url = 'https://api.github.com/gists?per_page=';
  for (key in FavGist){
    if (FavGist[key].id == Gist.id){
      i = key;
    }
  }
  var NewGist = [];
  for (key in FavGist){
    if (key != i){
      NewGist.push(FavGist[key]);
    }
  }
  req.onreadystatechange = function(){
  if(this.readyState === 4 && this.status == 200){
      Gist = JSON.parse(this.responseText);
  var ul = document.getElementById(Gist.id);
  ul.parentNode.removeChild(ul);
}
};
  FavGist = NewGist;
  localStorage.setItem('Favourite',JSON.stringify(FavGist));
  req.open('GET',url);
  req.send();
}
function Favload(){
  for (key in FavGist){
    var fav = document.getElementById('favgist');

    var row = document.createElement('dl');
    var ur = document.createElement('dt');
    var url = document.createElement('a');
      url.href = FavGist[key].url;
      url.className = 'gitLink';
      url.target = "_blank";
    var urlLink = document.createTextNode(FavGist[key].url);


    var descript = document.createElement('dd');
        descript = document.createTextNode("    "+FavGist[key].description);
    if (FavGist[key].description == '' || FavGist[key].description == null){
      descript =document.createTextNode("    No description provided");
    }

    var rmfromFav = document.createElement("button");
    rmfromFav.onclick = function (){
      var gistId = this.getAttribute("gistId");
      var gistf = findById(gistId,FavGist);
      removeFav(gistf,gistId);
    };
    rmfromFav.value = ' - ';
    rmfromFav.setAttribute("gistId", FavGist[key].id);
        //addtoFav.type = 'button';
    rmfromFav.className = "rmLink";
        //addtoFav.id = Gist[key].id;
    var rmfromFavLink = document.createTextNode ('-');
    
    rmfromFav.appendChild(rmfromFavLink);
    
    ur.appendChild(url);
    url.appendChild(urlLink);
    
    row.appendChild(rmfromFav);
    row.appendChild(descript);
    row.appendChild(ur);
    fav.appendChild(row);
  }
}
function findById(id,gist){
  var i;
  for (i = 0; i< gist.length; i++){
    if (gist[i].id == id){
      return gist[i];
    }
  }
  return false;
}
function searchresult(){
  for (key in Gist){
    if (findById(Gist[key].id,FavGist)===false){
    var row = document.createElement('dl');
    var ur = document.createElement('dt');
    var url = document.createElement('a');
        url.href = Gist[key].url;
        url.className = 'gitLink';
        url.target = "_blank";
    var urlLink = document.createTextNode(Gist[key].url);


    var descript = document.createElement('dd');
        descript = document.createTextNode("    "+Gist[key].description);
    if (Gist[key].description == '' || Gist[key].description == null){
      descript =document.createTextNode("    No description provided");
    }
    var addtoFav = document.createElement("button");
        addtoFav.onclick = function (){
          var gistId = this.getAttribute("gistId");
          var gistf = findById(gistId,Gist);
          addFav(gistf);
        };
        addtoFav.value = ' + ';
        addtoFav.setAttribute("gistId", Gist[key].id);
        //addtoFav.type = 'button';
        addtoFav.className = "addLink";
        //addtoFav.id = Gist[key].id;
    var addtoFavLink = document.createTextNode ('+');

    var list = document.getElementById('gist');
    
    addtoFav.appendChild(addtoFavLink);

    ur.appendChild(url);
    url.appendChild(urlLink);
    row.appendChild(addtoFav)
    row.appendChild(descript);
    row.appendChild(ur);


    list.appendChild(row);
  }
  }
}
function search(){
  gistlist();
}
function reload(){
 // location.reload(true);
  var ul = document.getElementById('gist');
  while (ul.firstChild){
    ul.removeChild(ul.firstChild);
  }
}
function gistlist(){
  var req = new XMLHttpRequest();
  if(!req){
    throw 'Unable to create HttpRequest.';
  }
  var url = 'https://api.github.com/gists?per_page=30';
  var i;
  req.onreadystatechange = function(){
  if(this.readyState === 4 && this.status == 200){
      Gist = JSON.parse(this.responseText);
      reload();
      searchresult(Gist);
  }
  };
  req.open('GET', url,true);
  req.send();
}
function urlStringify(obj){
  var str = []
  for(var prop in obj){
    var s = encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]);
    str.push(s);
  }
  return str.join('&');
}

/* End weather section */
window.onload = function() {
  var Fav = localStorage.getItem('Favourite');
  if( Fav === null ) {
    localStorage.setItem('Favourite', FavGist);
  }
  else {
    FavGist = JSON.parse(localStorage.getItem('Favourite'));
  }
  Favload();
};