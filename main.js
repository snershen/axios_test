const url = "https://soa.tainan.gov.tw/Api/Service/Get/b1054400-86a4-40fa-aea0-fb39fce361e2";

axios
  .get(url)
  .then((res) => {
    const apiData = res.data.data;
    console.log(apiData);
    // const schoolNum = apiData.length;
    const result = apiData.map((item, index) => {
      const obj = {};
      obj.id = index + 1;
      obj["school"] = item["school"].trim();
      obj["num"] = item["num"];
      return obj;
    });
    // console.log(result);
    return result;
  })
  .then((result) => {
    // console.log(result);
    renderData(result);
    renderOption(result);
    select.addEventListener("change", function (e) {
      if (e.target.value === "全部") {
        renderData(result);
      } else {
        const filterResult = result.filter((item) => {
          return item["school"] === e.target.value;
        });
        renderData(filterResult);
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });

const rowData = document.querySelector("tbody");
function renderData(data) {
  rowData.innerHTML = "";
  data.forEach((item, index) => {
    rowData.innerHTML += `<tr scope="col">
        <th scope="row">${item.id}</th>
        <th>${item["school"]}國小</th>
        <th>${item["num"]}</th></tr>`;
  });
}

const select = document.querySelector("select");
function renderOption(data) {
  data.forEach((item) => {
    select.innerHTML += `<option value="${item["school"]}">${item["school"]}國小</option>`;
  });
}
