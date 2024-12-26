const express = require("express");
require("./db/config");
const cors = require("cors");
const User = require("./db/users");
const Emp = require("./db/emp");
const jwt = require("jsonwebtoken");
const jwtKey = "e-comm";
const Questions = require("./db/question");
const Result = require("./db/result");
const Contact = require("./db/contact");

const questionsSet = () => {
  const fs = require("fs");
  const data = fs.readFileSync("./Json/questions.json", "utf8");
  const questions = JSON.parse(data);

  if (questions) return questions;
};
const app = express();
app.use(express.json());
app.use(cors());

app.post("/sign_up_user", async (req, resp) => {
  try {
    const user = new User(req.body);
    let result = await user.save();

    let modifyRes = {
      name: result.name,
      email: result.email,
      password: result.password,
      reg_time: result.reg_time,
    };

    jwt.sign({ modifyRes }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        resp.status(501).send({
          success: false,
          message: "Token generation failed.",
          error: err.message,
        });
      }
      resp.status(200).send({
        success: true,
        message: "User Signed up successfully",
        data: modifyRes,
        token: token,
      });
    });
  } catch (error) {
    resp.status(400).send({
      success: false,
      message: "Error signing up user",
      data: error.message,
    });
  }
});

app.post("/login_user", async (req, resp) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password }).select(
      "-password -_id"
    );

    if (!user) {
      resp.status(404).send({
        success: false,
        message: "Invalid email or password!!",
      });
    }

    jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        resp.status(500).send({
          success: false,
          message: "Token generation failed.",
          error: err.message,
        });
      }
      resp.status(200).send({
        success: true,
        message: "Login successful",
        data: user,
        token: token,
      });
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Server error.",
      error: err.message,
    });
  }
});

app.post("/add_emp", verifyToken, async (req, resp) => {
  const data = new Emp(req.body);
  const result = await data.save();

  resp.status(201).send({
    success: true,
    data: result,
    message: "Successfully added!",
  });
});

app.post("/save_questions", async (req, resp) => {
  try {
    if (!Array.isArray(req.body)) {
      return resp
        .status(400)
        .send({ error: "Payload must be an array of questions" });
    }
    const result = await Questions.insertMany(req.body);
    resp.status(201).send(result);
  } catch (error) {
    console.error(error);
    resp.status(500).send({ error: "Failed to save question" });
  }
});

const shuffleAndGetSubset = (array, count) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.slice(0, count);
};

const decodeHtmlEntities = (text) => {
  return text.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
};

const decodeQuestions = (questions) => {
  return questions.map((q) => {
    return {
      ...q,
      question: decodeHtmlEntities(q.question),
      correct_answer: decodeHtmlEntities(q.correct_answer),
      incorrect_answers: q.incorrect_answers.map(decodeHtmlEntities),
    };
  });
};

app.get("/question-fun", async (req, resp) => {
  const ques = await Questions.find();
  let shuffleArry = shuffleAndGetSubset(ques, 20);
  shuffleArry = decodeQuestions(shuffleArry);

  if (shuffleArry.length > 0) {
    resp.status(201).send({
      success: true,
      data: shuffleArry,
      message: "Fetched data !!",
    });
  }
});

app.post("/final_result", async (req, resp) => {
  const res = new Result(req.body);
  const fRes = await res.save();
  resp.send(fRes);
});

app.put("/update_result/:id", async (req, resp) => {
  try {
    const result = req.params.id;
    const resultToUpdate = await result.findById(resultId);
    if (!resultToUpdate) {
      resp.status(404).send({
        success: false,
        message: "Result not found",
      });
    }
    const updatedResult = await Result.findByIdAndUpdate(resultId, req.body, {
      new: true,
    });
    return resp.status(200).send({
      success: true,
      data: updatedResult,
      message: "Result updated successfully",
    });
  } catch (error) {
    console.error("Error updating result:", error);
    return resp.status(500).send({
      success: false,
      message: "An error occurred while updating the result",
    });
  }
});

app.get("/get_user_result/:id", async (req, resp) => {
  const res = await Result.findOne({ _id: req.params.id });

  if (res) {
    resp.status(201).send({
      data: res,
      message: "fetch Result !",
      success: true,
    });
  } else {
    resp.status(401).send({
      data: res,
      message: "Not Found !!",
      success: false,
    });
  }
});

app.post("/save_contact", async (req, resp) => {
  try {
    const data = new Contact(req.body);
    const result = await data.save();
    const modifyRes = {
      name: result.name,
      email: result.email,
      phoneNumbers: result.phoneNumbers,
      addresses: result.addresses,
      skillArray: result.skillArray.map((skill) => ({
        skill: skill.skill,
        experience: skill.experience,
        proficiency: skill.proficiency,
      })),
    };
    resp.status(201).send({
      success: true,
      message: "Contact save succesully",
      data: modifyRes,
    });
  } catch (error) {
    resp.status(400).send({
      success: false,
      message: "Not save contact details !",
    });
  }
});

function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (!token) {
    return resp.status(501).send("Please add token with headers");
  }

  token = token.split(" ")[1];
  jwt.verify(token, jwtKey, (err, success) => {
    if (err) {
      resp.status(401).send("Token is not valid!!");
    } else {
      next();
    }
  });
}

app.listen(1414);
