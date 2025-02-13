const express = require("express");
const xlsx = require("xlsx");
const bodyParser = require("body-parser");
const pool = require("./DB/db");
const CouseAPIs = require("./routes/CourseAPIs");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      "https://universities.friends-consultant.com",
      "https://university.aiec.pk",
    ],
  })
);

function loadExcelData(filename) {
  // Load Excel file
  const workbook = xlsx.readFile(filename);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);

  const mappedData = data.map((row) => ({
    university: row["University"],
    course_name: row["Course Name"],
    type: row["Type"],
    country: row["Country"],
    img_path: row["Img path"],
  }));

  const fields = Object.keys(mappedData[0]).join(", ");

  const values = mappedData.map(
    (row) =>
      `(${Object.values(row)
        .map((val) => pool.escape(val))
        .join(", ")})`
  );
  const query = `INSERT INTO courses_usa (${fields}) VALUES ${values.join(
    ", "
  )}`;

  pool.query(query, (error, results) => {
    if (error) {
      console.error("Error inserting data into MySQL table:", error);
    } else {
      console.log("Data inserted successfully");
    }
  });
}

pool.connect();
app.use("/course", CouseAPIs);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
