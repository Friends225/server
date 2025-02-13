const { supabase } = require("../../DB/SupabaseClient");

const getCourses = async (req, res) => {
  return res.json({ message: "Working properly" });
};


const getUniversities = async (req, res) => {
  const { country } = req.query;
  try {
    const tableName = `courses_${country}`;

    const { data, error } = await supabase.rpc("get_universities", {
      tablename: tableName,
    });

    let universitiesName = [];
    data.map((university) => {
      universitiesName.push({label:university.universities, value:university.universities});
    });

   

    if (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Error executing query" });
    } else {
      res.json({ results: universitiesName });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Error executing query" });
  }
};

const searchCourse = async (req, res) => {
  try{

    let { course, country, pageNumber, type, university } = req.body;
    
    
    const limit = 40;
  const offset = (pageNumber - 1) * limit;
  
  try {
    const query = supabase
    .from(`courses_${country}`)
    .select("*", { count: "exact" })
    .range(offset, offset + limit - 1);
    
    if (course) {
      query.ilike("course_name", `%${course}%`);
    }
    if (type && type.length>0) {

      query.in("type", type);
    }
    if (country) {
      query.ilike("country", `%${country}%`);
    }
    if (university) {
      query.ilike("university", `%${university}%`);
    }

    const { data, error, count } = await query;
    
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Error executing query" });
    } else {
      const totalCount = count > 0 ? count : 0;
      res.json({ results: data, totalCount });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Error executing query" });
  }
}
catch(err)
{
console.log(err)
}
};

module.exports = { searchCourse, getCourses, getUniversities };
