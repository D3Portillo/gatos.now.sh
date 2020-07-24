const fs = require("fs")
const zlib = require("zlib")
module.exports = (req, res) => {
  const cats = [...fs.readdirSync("./encoded/")]
  const rindex = Math.floor(Math.random() * cats.length)
  if (cats[rindex]) {
    const compressedCat = fs.readFileSync(`./encoded/${cats[rindex]}`)
    const cat = zlib.inflateSync(compressedCat)
    res.writeHead(200, {
      "Content-Type": "image/gif",
      "Content-Length": cat.length,
    })
    res.end(cat)
  } else res.send({ error: "Oh, no. There are no cats :(" })
}
