const loadCategory = async () => {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/videos/categories`
    );

    const data = await response.json();

    showCategoryData(data.data);
  } catch (err) {
    console.log(err);
  }
};

// show data

const showCategoryData = (categoryData) => {
  categoryData.forEach((category) => {
    // console.log(category.length);

    // get category div

    const categoryDiv = document.getElementById("category");

    const divChild = document.createElement("span");

    divChild.innerHTML = `
    <a onclick="handleClick(${category.category_id})" class="btn" id='active' >${category.category}</a>
    
    `;

    categoryDiv.appendChild(divChild);
  });
};

// category click

const handleClick = async (id) => {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${id}`
    );

    const data = await response.json();

    const categoryData = data.data;
    // show data
    //   get card section
    const cardSection = document.getElementById("card-section");

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

    // clear card
    cardSection.innerHTML = "";

    categoryData.forEach((element) => {
      //   console.log(element);

      const { thumbnail, title, authors, others } = element;

      const author = authors[0];

      //   create div
      const div = document.createElement("div");

      //   add style into card div

      div.classList = "card bg-base-100 shadow-xl";

      div.innerHTML = `
      
      <figure>
      <img
        src="${thumbnail}"
        alt="card-image"
        class="card-thumbnail"
      />
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
  } catch (err) {
    console.log(err);
  }
};

handleClick(1000);

loadCategory();
