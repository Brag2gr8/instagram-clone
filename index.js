import { posts } from "./data.js";

const root = document.getElementById('root');

const render = () => {
    let page = ``;

    for ( let post of posts ) {
        page += `
            <section>
                <div class="post-header">
                    <img 
                    class="profile-pics" 
                    src=${post.avatar} 
                    alt=${post.name}/>
                    <div>
                        <p class="bold">${post.name}</p>
                        <p>${post.location}</p>
                    </div>
                </div>
                <img 
                    class="post image" 
                    src=${post.image} 
                    alt=${post.name} 
                    data-img=${post.uuid} />
                <div class="icon-box">
                    <i class="fa-regular fa-heart" data-heart=${post.uuid}></i>
                    <i class="fa-regular fa-paper-plane"></i>
                    <i class="fa-regular fa-comment"></i>
                </div>
                
                <p class=" likes bold">${post.likes.toLocaleString()} Likes</p>
                <p><span class="bold">${post.username}</span> ${post.caption}</p>
                <p class="dull"> View all ${post.comment.toLocaleString()} comments</p>
                <p class="small-text dull"> ${post.lastSeen} hours ago</p>
            </section>`
            
    }

    root.innerHTML = page;
}

render();


document.addEventListener("click", (e) => {
    if (e.target.dataset.heart) {
        handleLike(e.target.dataset.heart);
    }
})

document.addEventListener("dblclick", (e) => {
    if (e.target.dataset.img) {
        handleLike(e.target.dataset.img);
    }
})

function handleLike(uuid) {
    const clickedPost = posts.filter((post) => {
        return uuid === post.uuid;
    })[0]
    
    if(clickedPost.isLiked) {
        clickedPost.likes--;
    } else {
        clickedPost.likes++;
    };
    
    clickedPost.isLiked = !clickedPost.isLiked;
    
    render();
}
