let dataByCategory = [];

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

    showContent(categoryData);

    dataByCategory = categoryData;
  } catch (err) {
    console.log(err);
  }
};

// sorting data

const showSort = () => {
  let arr = dataByCategory.sort(
    (a, b) => parseFloat(b.others.views) - parseFloat(a.others.views)
  );

  const cardSection = document.getElementById("card-section");
  // console.log(arr);
  cardSection.innerHTML = "";

  showContent(arr);
};

loadCategory();
handleClick(1000);
