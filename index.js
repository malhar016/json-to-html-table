const convertJsonToTable = () => {
  const table = document.querySelector("#dataTable");
  table.innerHTML = "";
  const data = JSON5.parse(document.querySelector("#jsonData").value);
  console.log(data);
  const htmlData = createHtmlTree(data, 0);
  console.log(htmlData);
  table.insertAdjacentHTML("afterbegin", htmlData);
};

const resetJsonData = () => {
  document.querySelector("#dataTable").innerHTML = "";
  const jsonData = document.querySelector("#jsonData");
  jsonData.value = "";
  jsonData.style.height = "";
};

const getHtmlTree = (data) => {
  console.log(data);
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
            console.log(ele, typeof ele);
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
