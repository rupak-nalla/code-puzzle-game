document.addEventListener('DOMContentLoaded', () => {
  hljs.highlightAll()
})

const container = document.querySelector('.container')
const elements = [
  { text: '#include <stdio.h>' , place:"1" },
  { text: '#include <stdlib.h>',place:"2"},
  { text: '#include <math.h>',place:"3" },
  { text: 'typedef struct{' ,place:"4"},
  { text: 'int x;',place:"5" },
  { text: 'int y;' ,place:"6"},
  { text: '}Point;' ,place:"7"},
  { text: 'int main() {',place:"8" },
  { text: 'int n, i;',place:"9" },
  { text: 'Point *points;',place:"10" },
  { text: 'double total_distance = 0;',place:"11" },
  { text: 'printf("Enter the number of points: ");',place:"12" },
  { text: 'scanf("%d", &n);',place:"13" },
  { text: 'points = (Point *)malloc(n * sizeof(Point));',place:"14" },
  { text: 'printf("Enter the coordinates of the points:\n");',place:"15" },
  { text: 'for (i = 0; i < n; i++) {',place:"16" },
  { text: 'printf("Point %d: ", i + 1);',place:"16" },
  { text: 'scanf("%d %d", &points[i].x, &points[i].y); }',place:"16" },
  { text: 'for (i = 1; i < n; i++) {',place:"17" },
  { text: 'total_distance += sqrt(pow(points[i].x - points[i-1].x, 2) + pow(points[i].y - points[i-1].y, 2)); }',place:"18" },
  { text: 'printf("Average distance: %.2f\n", total_distance / (n - 1));',place:"19" },
  { text: 'free(points);',place:"20" },
  { text: 'return 0;}',place:"21" }
]

// shuffle the elements array
for (let i = elements.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1))
  ;[elements[i], elements[j]] = [elements[j], elements[i]]
}

// create and append elements to the container
elements.forEach(({ text,place }) => {
  const element = document.createElement('p')
  element.textContent = text
  element.setAttribute('id', place)
  element.className = 'draggable'
  element.draggable = true

  container.appendChild(element)
})

// add event listeners
container.addEventListener('dragover', (e) => {
  e.preventDefault()
  const dragAfterElement = document.elementFromPoint(e.clientX, e.clientY)
  const draggable = document.querySelector('.dragging')
  if (dragAfterElement === null) {
    container.appendChild(draggable)
  } else {
    container.insertBefore(draggable, dragAfterElement)
  }
})

document.querySelectorAll('.draggable').forEach((draggable) => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})


// evalutation
const submitBtn=document.getElementById('submit')
submitBtn.addEventListener('click',(e)=>{
  submitBtn.disabled=true
  evalutation();
  const Content =document.getElementById("content");
  Content.style.display="none";
})

async function evalutation(){

  const parent = document.getElementById('response');
  const childIDs = Array.from(parent.querySelectorAll('p'))
    .map(child => child.id);
  console.log(childIDs);
  let score=0
  for(let i=0;i<childIDs.length;i++){
    if(i+1==parseInt(childIDs[i])){
      score+=1
    }
    console.log(childIDs[i],i+1)
  }
  const options = { timeZone: 'Asia/Kolkata', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const isoDateTime = new Intl.DateTimeFormat('en-IN', options).format(new Date());
  const rollNo=prompt("rollNo:")
  const CandidateName=prompt("Candidate-Name:")
  console.log(isoDateTime);
  const formData = {
    "time":isoDateTime ,
    "rollNo":rollNo ,
    "CandidateName":CandidateName,
    "score":score,
    "filePath":"jumbledCode.xlsx"
  };
  
  b=JSON.stringify(formData)
  console.log(formData)
  const response = await fetch('https://rupaknalla.pythonanywhere.com/api/excel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:b
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  alert(`score: ${score}`)

}



const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');

let totalSeconds = 20*60; // 60 minutes
let timerInterval;

startTimer();

function startTimer() {
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  totalSeconds--;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  minutesDisplay.textContent = padZero(minutes);
  secondsDisplay.textContent = padZero(seconds);

  if (totalSeconds === 0) {
    clearInterval(timerInterval);
    examTimeUp();
  }
}

function examTimeUp() {
  evalutation();
  
  // Add any additional logic you want to execute when the exam time is up
  // For example, you can submit the exam form or perform other actions
}

function padZero(value) {
  return value.toString().padStart(2, '0');
}
