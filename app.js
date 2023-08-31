const openai = require("./config");

const express = require("express");

const app = express();

// Serve static files from the "public" directory
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.set("view engine", "ejs");

//Parse JSON request bodies
app.use(express.json());

async function main(title) {
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",

        content: `Provide a Description for a youtube Title  ${title}`,
      },
    ],
  });

  return chatCompletion.choices[0];
}

app.post("/api/description", async (req, res) => {
  try {
    const { title } = req.body;
    const result = await main(title);

    res.json({ message: "Generation successful", result });
  } catch (error) {
    console.error("Error generating", error);
    res.status(500).json({ message: "Generation has Failed!" });
  }
});

app.listen(3000, () => {
  console.log("Server is at port 3000");
});
