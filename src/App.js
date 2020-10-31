import React, { Component, useLayoutEffect, useEffect, useRef, useState } from 'react'

// export default class App extends Component {
//   componentDidMount(){
//     const bird = document.querySelector(".bird");
//     const gameDisplay = document.querySelector(".game-container");
//     const ground = document.querySelector(".ground-moving");
  
//     let birdLeft = 220;
//     let birdBottom = 100;
//     let gravity = 3;
//     let isGameOver = false;
//     let gap = 430;
    
  
//     function startGame() {
//       console.log('check')
//       birdBottom -= gravity;
//       bird.style.bottom = birdBottom + "px";
//       bird.style.left = birdLeft + "px";
//     }
//     // this.gameTimerId = setInterval(startGame, 40);
  
//     function control(e) {
//       console.log('hhaha')
//       if (e.keyCode === 32) {
//         jump();
//       }
//     }
  
//     function jump() {
//       console.log(birdBottom)
//       if (birdBottom < 500) birdBottom += 60;
//       bird.style.bottom = birdBottom + "px";
//       console.log(birdBottom);
//     }

//     document.addEventListener("keyup", control);
//     // document.getElementById("tap").addEventListener("click", function() {
//     //   jump();
//     // });
    //     function generateObstacle() {
    //   let obstacleLeft = 500;
    //   let randomHeight = Math.random() * 60;
    //    let obstacleBottom = randomHeight;
    //    const obstacle = document.createElement("div");
    //   const topObstacle = document.createElement("div");
    //   if (!isGameOver) {
    //     obstacle.classList.add("obstacle");
    //     topObstacle.classList.add("topObstacle");
    //   }
    //   gameDisplay.appendChild(obstacle);
    //   gameDisplay.appendChild(topObstacle);
    //   obstacle.style.left = obstacleLeft + "px";
    //   topObstacle.style.left = obstacleLeft + "px";
    //   obstacle.style.bottom = obstacleBottom + "px";
    //   topObstacle.style.bottom = obstacleBottom + gap + "px";
  
    //   function moveObstacle() {
    //     obstacleLeft -= 2;
    //     obstacle.style.left = obstacleLeft + "px";
    //     topObstacle.style.left = obstacleLeft + "px";
  
    //     if (obstacleLeft === -60) {
    //       clearInterval(timerId);
    //       gameDisplay.removeChild(obstacle);
    //       gameDisplay.removeChild(topObstacle);
    //     }
    //     if (
    //       (obstacleLeft > 200 &&
    //         obstacleLeft < 280 &&
    //         birdLeft === 220 &&
    //         (birdBottom < obstacleBottom + 153 ||
    //           birdBottom > obstacleBottom + gap - 200)) ||
    //       birdBottom === 1
    //     ) {
    //       gameOver();
    //       clearInterval(timerId);
    //     }
    //   }
    //   let timerId = setInterval(moveObstacle, 20);
    //   if (!isGameOver) setTimeout(generateObstacle, 3000);
    // }
//     //  generateObstacle();
  
//     function gameOver() {
//       // clearInterval(this.gameTimerId);
//       console.log("game over");
//       isGameOver = true;
//       document.removeEventListener("keyup", control);
//       ground.classList.add("ground");
//       ground.classList.remove("ground-moving");
//     }
//   }

//   componentWillUnmount() {
//     // document.removeEventListener("keyup", control);
//     clearInterval(this.gameTimerId);
//   }
//   render() {
//     return <>
//         {/* <div className="border-left"></div> */}
//       <div className="game-container">
//           {/* <div className="border-top"></div> */}
//           <div className="sky">
//               <div className="bird"></div>
//           </div>
//       </div>
//   {/* <div className="ground-container">
//     <div className="ground-moving"></div>
//   </div> */}
//   {/* <div className="border-right"></div> */}
// {/*   
//         <p 
//   style={{borderRadius: '100%', fontSize: '20px', backgroundColor: 'gray', color: 'black', 
//   padding: '30px', marginLeft: '40px'}} id="tap">Tap</p> */}
       
        
//     </>
//   }
// }

const App = () => {
  const [birdLeft, setBirdLeft] = useState(220);
  // const [birdBottom, setBirdBottom] = useState(220);
  // const [gravity, setGravity] = useState(220);
  // const [isGameOver, setIsGameOver] = useState(220);
  let gravity = 3;
  const isMobile = () => {
    return global.innerWidth <= 840;
  };
  const birdBottomRef = useRef(100);
  const birdLeftRef = useRef(isMobile() ? 50 : 220);
  let isGameOver = false;
  let gap = 430;
  let gameTimerId;
  let timeOutId;
  let timerId;
  // const gameValues = useRef({
  //   birdLeft: 220,
  //   birdBottom: 100,
  //   gravity: 3,
  //   isGameOver: false,
  //   gap: 430
  // })
  // let birdLeft = 220;
  // let birdBottom = 100;
  // let gravity = 3;
  // let isGameOver = false;
  // let gap = 430;
  const startGame = () => {
    console.log('check', birdBottomRef);
    // setBirdBottom(birdBottom => birdBottom - gravity);
    birdBottomRef.current = birdBottomRef.current + gravity;
    const bird = document.querySelector(".bird");
    if(birdBottomRef.current < 400) {
      bird.style.transform = `translate(${birdLeftRef.current}px,${birdBottomRef.current}px)`;
      gameTimerId = requestAnimationFrame(startGame);
    } else {
      cancelAnimationFrame(gameTimerId);
    }
    // bird.style.bottom = birdBottomRef.current + "px";
    // bird.style.left = birdLeftRef.current + "px";
    console.log(birdBottomRef)
  }
  useEffect(() => {
    // gameTimerId = setInterval(startGame, 10);
    // setTimeout(() => { generateObstacle() }, 1000);
    gameTimerId = requestAnimationFrame(startGame);
    return ()=> {
      cancelAnimationFrame(gameTimerId);
      };
}, []);

  useEffect(() => {
    window.addEventListener('keyup', control);
    window.addEventListener('click', jump);
    return () => {
      window.removeEventListener('keyup', control);
      window.removeEventListener('click', jump);
    };
  }, []);

  const control2 = (e) => {
    if (e.keyCode === 83) {
      clearInterval(gameTimerId);
      clearTimeout(timeOutId);   
      clearInterval(timerId); 
    }
  };
  const control = (e) => {
    console.log('hhaha')
    if (e.keyCode === 32) {
      jump();
    }
  };

  const generateObstacle = () => {
    let obstacleLeft =  500;
    const gameDisplay = document.querySelector(".game-container");
    const ground = document.querySelector(".ground-moving");
    const sky = document.querySelector(".sky");

    console.log(ground);
    let randomHeight = Math.random() * 60;
    let obstacleHeight = Math.random()*(100-20)+20;
    let topObstacleHeight = Math.random()*(200-30)+30;
    let obstacleBottom = randomHeight;
    const obstacle = document.createElement("div");
    const topObstacle = document.createElement("div");
    if (!isGameOver) {
      obstacle.classList.add("obstacle");
      topObstacle.classList.add("topObstacle");
    }
    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(topObstacle);
    obstacle.style.left = obstacleLeft + "px";
    topObstacle.style.left = obstacleLeft + "px";
    // obstacle.style.bottom = obstacleBottom + "px";
    obstacle.style.height = obstacleHeight + "px";
    // topObstacle.style.bottom = obstacleBottom + gap + "px";
    topObstacle.style.height = topObstacleHeight + "px";


    function moveObstacle() {
      obstacleLeft -= 3;
      obstacle.style.left = obstacleLeft + "px";
      topObstacle.style.left = obstacleLeft + "px";

      if (obstacleLeft < 0) {
        console.log('leftt')
        clearInterval(timerId);
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(topObstacle);
        generateObstacle()
      }
      console.log(obstacleLeft, obstacleHeight, topObstacleHeight, obstacleBottom, 400-birdBottomRef.current, birdBottomRef.current, 'hhaha')
      if (
        (obstacleLeft < 110 &&
          obstacleLeft > 50 &&
          birdLeft === 220 &&
          (birdBottomRef.current <= obstacleHeight ||
            (380 - birdBottomRef.current) <= topObstacleHeight)) ||
            birdBottomRef.current === 1
      ) {
        cancelAnimationFrame(gameTimerId);
        clearTimeout(timeOutId);
        isGameOver = true;
        console.log('yes')
        window.removeEventListener('keyup', control);
        if(ground) {
          console.log('ground')
          ground.classList.add("ground");
          ground.classList.remove("ground-moving");
          sky.classList.remove("sky");
          sky.classList.add("sky-stop");
        }
        clearInterval(timerId);
      }
    }
   timerId = setInterval(moveObstacle, 20);
  //  if (!isGameOver) {
  //    console.log('test')
  //    timeOutId = setTimeout(() => { 
  //     generateObstacle();         
  //     clearInterval(timerId);
  //   }, 1000);
  //  }
  };

  const jump = () => {
    console.log(birdBottomRef.current)
    if (birdBottomRef.current < 500) birdBottomRef.current -= 100;
    const bird = document.querySelector(".bird");
    bird.style.transform = `translateY(${birdBottomRef.current}px)`;
    // bird.style.bottom = birdBottomRef.current + "px";
    console.log(birdBottomRef.current);
  };
  return (
    <>      
    <div className="game-container">
      <div className="sky">
        <div className="bird"></div>
      </div>
    </div>
      <div className="ground-container">
        <div className="ground-moving"></div>
      </div>
    </>  
  );
}

export default App;
