// Example Json Data
const input = {
  name: "malhar",
  age: 34,
  address: {
    street: "Kharadi",
    city: "Pune",
  },
  marks: [
    { maths: 60, practical: [4, 5, 6] },
    { physics: 70, practical: [7, 5, 43] },
    { chemistry: 80, practical: [4.33] },
  ],
};

const convertJsonToTable = () => {
  const table = document.querySelector("#dataTable");
  table.innerHTML = "";
  const jsonData = document.querySelector("#jsonData");
  if (!jsonData.value) {
    alert("Kindly enter valid json data or use 'Example Json.'");
    return false;
  }
  const data = JSON5.parse(jsonData.value);
  const htmlData = createHtmlTree(data, 0);
  table.insertAdjacentHTML("afterbegin", htmlData);
};

const resetJsonData = () => {
  document.querySelector("#dataTable").innerHTML = "";
  const jsonData = document.querySelector("#jsonData");
  jsonData.value = "";
  jsonData.style.height = "";
};

const setExampleJsonData = () => {
  const jsonData = document.querySelector("#jsonData");
  jsonData.value = JSON5.stringify(input, null, 2);
  jsonData.style.height = jsonData.scrollHeight + "px";
};

//TODO: remove old simplified method...
const getHtmlTree = (data) => {
  if (data === null) {
    return;
  }

  if (typeof data !== "object") {
    return "<td>" + data + "</td>";
  } else {
    return Object.entries(data)
      .map(
        ([key, value]) =>
          "<tr><th>" + key + "</th>" + getHtmlTree(value) + "</tr>"
      )
      .join("");
  }
};

const createHtmlTree = (data, level) => {
  let result = "<td>";

  if (data === null) {
    return result + "</td>";
  }

  if (typeof data === "object") {
    if (Array.isArray(data)) {
      result =
        result +
        "<table class='dataTable'>" +
        data
          .map((ele, idx) => {
            return (
              "<tr><th id='rowNumber'>" +
              (idx + 1) +
              "</th><td>" +
              (typeof ele === "object"
                ? "<table class='dataTable'>" +
                  createNode(ele, level, true) +
                  "</table>"
                : ele.toString()) +
              "</td></tr>"
            );
          })
          .join("") +
        "</table>";
      return result + "</td>";
    }

    if (level > 0) {
      return (
        result +
        "<table class='dataTable'>" +
        createNode(data, level) +
        "</table>" +
        "</td>"
      );
    } else {
      return result + createNode(data, level) + "</td>";
    }
  } else {
    result = result + data;
  }

  return result + "</td>";
};

const createNode = (node, level, isArray = false) => {
  const tableNode = Object.entries(node)
    .map(
      ([key, value]) =>
        "<tr><th>" + key + "</th>" + createHtmlTree(value, level++) + "</tr>"
    )
    .join("");

  return tableNode;
};
