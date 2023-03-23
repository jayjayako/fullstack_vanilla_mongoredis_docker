async function includehtml(params1, params2) {
  try {
    var html = document.getElementById(params1);
    let res = await fetch(params2, {
      method: "GET",
    });
    let data = await res.text();
    html.innerHTML = data;
    let parser = new DOMParser();
    let doc = parser.parseFromString(data, "text/html");
    eval(doc.querySelector("script").textContent);
  } catch (error) {}
}
