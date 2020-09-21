
const postBtn = document.getElementById('post-btn');
const getBtn = document.getElementById('get-btn');
//const getPostBtn = document.getElementById('get-post-btn');
const url = "http://localhost:3000/"


const sendHttpRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
   // if (target != undefined) {
    //  url += String(target);
   // }
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.responseType = 'json';

    if (data) {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject('Something went wrong!');
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
};

const getData = () => {
  sendHttpRequest('GET', 'http://localhost:3000/users').then(responseData => {
    console.log(responseData);
    buildTable(responseData.users);
    
  });
  
}


function buildTable(users) {
  var table = document.getElementById('userTable')
  
  function activityStatus(status) {
    if (status==true) {
      var dot= `
      <td> <span id=status class="activityStatusCircle "> </span> <td/> `
      return dot
  
    } else {
     var dot=`
     <td> <span id=status class="activityStatusCircleRed ">  </span> <td/>`
      return dot
    }
  };

  for (var i = 0; i < users.length; i++) {
    var row = `<tr data-id='${users[i]._id}'>
            <td>${users[i].nickname}</td>
            <td>${activityStatus(users[i].activityStatus)} </td>
            <td>${users[i]._id}</td>
            <td>  <button    
            onClick="showClick('${users[i].nickname}')">Show Posts</button> </td>
            <td>  <button    
            onClick="deleteClick('${users[i]._id}')">Delete User</button> </td>
          </tr>`
    table.innerHTML += row 
  }
  getBtn.removeEventListener('click', getData);
};

function deleteUser(id) {
  var url = "http://localhost:3000/users/";
  url += String(id);
  var xhr = new XMLHttpRequest();

  xhr.open('DELETE', url, true);
  xhr.onload = function () {
    var data = JSON.parse(this.response); 
    console.log(data);  
  }
  xhr.send(); 
};

function deleteClick(id) {

  if (confirm("Are you sure you want to delete this user?")) {
    deleteUser(id);
    const userInfo = `[data-id ='${id}']`;
  
    const userStatus = document.querySelector(userInfo);
    console.log(userStatus);
    //document.querySelector(userInfo).className = 'activityStatusCircleRed';
    
    
    txt = "You've deleted it";
    

    
    
    //activityStatus(userStatus.activityStatus);
   
    
    
  
  } else {
    txt = "You pressed Cancel!";
  }

}


function showClick(nickname) {
  getPosts(nickname);
}
function getPosts(nickname) {
  document.getElementById('postTable').innerHTML='';
  
  var url = `http://localhost:3000/users/${nickname}/posts`;
  
  var xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);
  xhr.onload = function () {
    var data = JSON.parse(this.response); 
    buildTablePost(data);
  }
  
  xhr.send(); 
}

function buildTablePost(posts) {
  var table = document.getElementById('postTable')
  

  for (var i = 0; i < posts.length; i++) {
    var row = `<tr>
            <td>${posts[i].title}</td>
            <td>${posts[i].description}</td>
            <td>${posts[i]._id}</td>
            <td>  <button 
            onClick="getPostById('${posts[i]._id}'); this.onclick=null;" >Edit Posts</button> </td>
          </tr>`
    table.innerHTML += row
    
  }

} 


function getPostById(id) {
  var url = "http://localhost:3000/posts/";
  url += String(id);
  var xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);
  xhr.onload = function () {
    var data = JSON.parse(this.response); 
    editPage(data);
   
  }
  
  xhr.send(); 
}

function editPost(id) {
  var url = "http://localhost:3000/posts/";
  url += String(id);
  var xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);
  xhr.onload = function () {
    var data = JSON.parse(this.response); 
    editPage(data);
    console.log(data);
  }
  
  xhr.send(); 
}

function cancelFunction() {
  document.getElementById('editBlock').innerHTML = "";
};


function editPage(post) {
  const nickname = post.postedBy;
  var html = `
  <form id="${post.postedBy}" action="">
  <fieldset>
  <legend>Edit ${post.postedBy}'s Post </legend>
    <label for="fname">Title</label><br>
    <input type="text" id="fname" name="fname" value="${post.title}" onchange="titleSave(this.value)" ><br>
    <label for="lname">Description</label><br>
    <textarea id="lname" name="lname" rows="10" cols="50" onchange="descriptionSave(this.value)">${post.description}</textarea>  <br><br>
    <input id="savePost" type="button" onclick="saveChanges('${post._id}')" value="Save"> 
    <input type="button" onclick="cancelFunction()" value="Cancel">

    </fieldset>
  </form>
  `;

  document.getElementById('editBlock').innerHTML = html;
}

function titleSave(val) {
  alert("You are changing title to ' " + val + " ' If that's right, proceed to save." );
}
function descriptionSave(val) {
  alert("You are changing description to ' " + val + " ' If that's right, proceed to save." );
}

var postTitle;
var postDescription;


function saveChanges(id) {
  
  postTitle = document.getElementById("fname").value;
  console.log(typeof postTitle);
  postDescription = document.getElementById("lname").value;
  console.log(postTitle + "  " + postDescription);
  updatedPostSave(id);
  
  //innerhtml null error alıyorum
  
  alert("The post is successfully updated");
  /*
  a = document.getElementById('postTable');
  console.log(a);
  a.remove();
  
  console.log('ok');
  b = document.getElementById('editBlock');
  console.log(b);
  b.remove();
  #####tekrar table oluşturmak için getPostById();
  */
 document.getElementById('editBlock').innerHTML = "";


   //document.getElementById('postTable').innerhtml="";
  document.getElementById('editBlock').innerHTML = "";
  
  
  //location.replace("file:///Users/efecanbahcivanoglu/Desktop/Twin%20Project/frontend/index.html")
}

const sendData = () => {
  sendHttpRequest('PATCH', 'http://localhost:3000/posts/5f4ff4f683d51836cf92d7e8', {
      title: "Lütfen bu son olsun",
      description: "Yeterrrrrr"
  },).then(responseData => {
    console.log(responseData);
  });

}

function updatedPostSave(id) {
  console.log(id);
  var url = "http://localhost:3000/posts/";
  url += String(id); 
  var data = {
    title: postTitle,
    description: postDescription
  }
  const promise = new Promise((resolve, reject) => {
  
   const xhr = new XMLHttpRequest();
   xhr.open('PATCH', url);

   xhr.responseType = 'json';

   if (data) {
     xhr.setRequestHeader('Content-Type', 'application/json');
   }

   xhr.onload = () => {
     if (xhr.status >= 400) {
       reject(xhr.response);
     } else {
       resolve(xhr.response);
     }
   };

   xhr.onerror = () => {
     reject('Something went wrong!');
   };

   xhr.send(JSON.stringify(data));
   
 });
 return promise;
};
 




getBtn.addEventListener('click', getData);
//getPostBtn.addEventListener('click', getPostData);
