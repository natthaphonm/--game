const questions = [
  {
    question: "ขั้นตอนแรกของวัฏจักรของน้ำคืออะไร?",
    options: ["การระเหย", "การควบแน่น", "การตกลงมา", "การไหลของน้ำ"],
    answer: "การระเหย",
  },
  {
    question: "ในระหว่างที่เกิดหิมะ อุณหภูมิของอากาศจะเป็นอย่างไร?",
    options: ["ร้อน", "เย็น", "อบอุ่น", "ปานกลาง"],
    answer: "เย็น",
  },
  {
    question: "สิ่งที่ไม่เกี่ยวข้องกับวัฏจักรของน้ำคืออะไร?",
    options: ["การกลั่นตัว", "การระเหย", "การเผาไหม้", "การตกลงมา"],
    answer: "การเผาไหม้"
  },
  {
    question: "หยาดน้ำฟ้าประเภทใดที่มีลักษณะเป็นน้ำแข็งและตกจากฟ้าเป็นลูกกลม?",
    options: ["หิมะ", "ลูกเห็บ", "ฝน", "หมอก"],
    answer: "ลูกเห็บ"
  },
  {
    question: "การเกิดหยาดน้ำฟ้าประเภทไหนที่มีผลกระทบมากที่สุดต่อการเกษตร?",
    options: ["หิมะ", "ลูกเห็บ", "ฝน", "หมอก"],
    answer: "ลูกเห็บ"
  },
  {
    question: "หยาดน้ำฟ้าชนิดใดมีสถานะเป็นของเหลว?",
    options: ["หิมะ", "ลม", "ลูกเห็บ", "ฝน"],
    answer: "ฝน"
  }
];

let currentQuestion = 0;
let score = 0;

const startGame = document.getElementById('startGame');
const gameSection = document.getElementById('game');
const questionText = document.getElementById('question');
const optionsDiv = document.getElementById('options');
const nextButton = document.getElementById('next');
const resultSection = document.getElementById('result');
const scoreText = document.getElementById('score');
const restartButton = document.getElementById('restart');

startGame.addEventListener('click', () => {
  document.getElementById('instructions').style.display = 'none';
  gameSection.style.display = 'block';
  loadQuestion();
});

nextButton.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
      loadQuestion();
  } else {
      showResult();
  }
});

restartButton.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  resultSection.style.display = 'none';
  document.getElementById('instructions').style.display = 'block';
});

function loadQuestion() {
  const currentData = questions[currentQuestion];
  questionText.textContent = currentData.question;
  
  // ลบรูปภาพที่มีอยู่ก่อนหน้า (ถ้ามี)
  const existingImage = document.getElementById('image');
  if (existingImage) {
      existingImage.remove();
  }

  // เพิ่มรูปภาพใหม่ ถ้ามี
  if (currentData.image) {
      const image = document.createElement('img');
      image.src = currentData.image; // ใช้ลิงค์ของรูปภาพจากข้อมูลคำถาม
      image.alt = 'คำอธิบาย';
      image.id = 'image';
      image.style.maxWidth = '100%'; // ปรับขนาดรูปภาพตามที่ต้องการ
      document.getElementById('game').appendChild(image);
  }

  optionsDiv.innerHTML = '';
  currentData.options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.addEventListener('click', () => checkAnswer(option));
      optionsDiv.appendChild(button);
  });
  nextButton.style.display = 'none';
}

function checkAnswer(selected) {
  const correct = questions[currentQuestion].answer;
  if (selected === correct) {
      score++;
  }
  nextButton.style.display = 'block';
}

function showResult() {
  gameSection.style.display = 'none';
  resultSection.style.display = 'block';
  scoreText.textContent = `คุณตอบถูก ${score} ข้อจากทั้งหมด ${questions.length}`;
}
