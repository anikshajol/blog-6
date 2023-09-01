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

    // sort(categoryData);

    // clear card
    cardSection.innerHTML = "";

    categoryData.forEach((element) => {
      // console.log(element);

      const { thumbnail, title, authors, others } = element;

      const author = authors[0];

      //   create div
      const div = document.createElement("div");

      function convertHMS(value) {
        // convert value to number
        const sec = parseInt(value, 10);
        // get hours
        const hours = Math.floor(sec / 3600);

        // get minutes
        const minutes = Math.floor((sec - hours * 3600) / 60);

        return hours + "hrs" + " " + minutes + " " + "min" + " " + "ago"; // Return is HH : MM : SS
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
    <span>${
      others.posted_date ? convertHMS(others.posted_date) : (innerHTML = " ")
    }</span>
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

      sort(categoryData);

      const postTime = document.getElementById("post-time");
      if (others.posted_date === "") {
        postTime.classList.add("hidden");
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// sort

document
  .getElementById("sort")
  .addEventListener("click", function sortHighToLow(id) {
    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
      .then((res) => res.json())
      .then((data) => sort(data.data));
  });

function sort(data) {
  data.sort((a, b) => parseFloat(b.others.views) - parseFloat(a.others.views));
}

handleClick(1000);

loadCategory();
