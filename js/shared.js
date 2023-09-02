function showContent(categoryData) {
  // for empty data
  if (categoryData.length === 0) {
    const empty = document.getElementById("empty");
    empty.innerHTML = "";

    const div = document.createElement("div");
    div.classList = "empty-data";

    div.innerHTML = `
              <img src="./image/Icon.png" alt="">
              <p>Oops!! Sorry, There is no content here</p>

              `;
    empty.appendChild(div);
  } else {
    empty.innerHTML = "";
  }

  //   get card section
  const cardSection = document.getElementById("card-section");

  //   empty card section
  cardSection.innerHTML = "";

  //   data loop and show in html

  currentCategory = categoryData;

  categoryData.forEach((element) => {
    // destructuring
    const { thumbnail, title, authors, others } = element;
    currentCategory == category.category_id;
    const author = authors[0];

    //   create div
    const div = document.createElement("div");

    // converts number to time

    function convertHMS(value) {
      // convert value to number
      const sec = parseInt(value, 10);
      // get hours
      const hours = Math.floor(sec / 3600);

      // get minutes
      const minutes = Math.floor((sec - hours * 3600) / 60);

      return hours + "hrs" + " " + minutes + " " + "min" + " " + "ago";
    }

    //   add style into card div

    div.classList = "card bg-base-100 shadow-xl";

    div.innerHTML = `
      
      <figure class="relative">
      <img
        src="${thumbnail}"
        alt="card-image"
        class="card-thumbnail"
      />
      <div
      class=" bg-black text-white  absolute -bottom-0 right-10"
      id="post-time"
    >
    <span>${others.posted_date ? convertHMS(others.posted_date) : " "}</span>
    </div>
    </figure>
    <div class="card-body">
      <div class="flex justify-center md:justify-start lg:justify-normal items-center gap-5">
        
        <img src="${author?.profile_picture}" class="profile-picture" />
  
        <h2 class="card-title">${title ? title : "No title"}</h2>
  
      </div>
  
      <div class="flex justify-center items-center md: flex-col md:justify-start md:items-start ">
  
        <div class="flex items-center gap-1">
  
          <p class="author">${author.profile_name}</p>
  
          <div id='verified'>${
            author.verified ? '<i class="fa-solid fa-check"></i>' : ""
          }</div>
        </div>
  <div>
  
    <p class="views"><span id="views">${others.views}</span> views</p>
  
  </div>
        
      </div>
    </div>
  
  
      `;
    cardSection.appendChild(div);
  });
}
