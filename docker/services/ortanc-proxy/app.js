const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.ORTANC_PROXY_PORT || 3333;

const ortancApiURL =
  process.env.APP_ORTANC_API_URI || "http://vinlab-orthanc:8042";

app.get("/dicom-web/studies/*", (req, res) => {
  const fullPathOrtanc =
    `${ortancApiURL}/dicom-web/studies` +
    req.originalUrl.replace("/dicom-web/studies", "");

  console.log(`Forwarding request to ${fullPathOrtanc}`)

  axios({
    method: req.method,
    url: fullPathOrtanc,
    responseType: "arraybuffer",
    headers: req.headers,
  })
    .then((response) => {
      Object.keys(response.headers).forEach((key) => {
        res.setHeader(key, response.headers[key]);
      });

      if (response.data.pipe) {
        return response.data.pipe(res);
      }

      return res.send(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error while forwarding the request");
    });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
